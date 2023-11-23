import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, from, lastValueFrom, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { NodeService } from 'src/app/services/node.service';
import * as NodeActions from './node.action';
import * as LocaleActions from '../locale/locale.action';
import { Node } from './node.state';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { getSelectedLocale } from '../locale/locale.selector';
import { getSelectedParentId } from './node.selector';
import { Router } from '@angular/router';

@Injectable()
export class NodeEffects {

  loadParentNodes$ = createEffect((): any => this.actions$.pipe(
    ofType(
      NodeActions.loadParentNodesList,
      LocaleActions.setSelectedLocale
    ),
    withLatestFrom(this.store.select(getSelectedLocale)),
    switchMap(([g, locale]) =>
      this.nodeService.getParentNodes().pipe(
        mergeMap((nodes: Node[]) =>
          from(Promise.all(nodes.slice(0, 15).map(async (node) => {
            const res = await lastValueFrom(this.nodeService.getNode(node.id, locale.locale));
            return {
              id: res.id,
              parent: res.parent,
              title: res.translation.find(t => t.locale === locale.locale)?.title ?? res.title
            };
          })
          )
          )
        ),
        map((translatedNodes) => NodeActions.setNodesList({ nodes: translatedNodes })),
        catchError((error) => of(NodeActions.loadNodesListError({ error })))
      )
    )
  ));

  loadNode$ = createEffect((): any => this.actions$.pipe(
    ofType(
      NodeActions.setSelectedParentId,
      LocaleActions.setSelectedLocale
    ),
    withLatestFrom(
      this.store.select(getSelectedLocale),
      this.store.select(getSelectedParentId)
    ),
    filter(([action, locale, parentId]) => !!parentId),
    exhaustMap(([g, locale, parentId]) => this.nodeService.getNode(parentId, locale.locale).pipe(
      map((node: Node) => NodeActions.setSelectedNode({ node })),
      catchError((error) => of(NodeActions.loadNodesListError({ error }))),
    )),
  ));

  loadChlidrenNodes$ = createEffect(() => this.actions$.pipe(
    ofType(
      NodeActions.loadNodesList,
      NodeActions.createNodeResult,
      LocaleActions.setSelectedLocale,
    ),
    withLatestFrom(
      this.store.select(getSelectedLocale),
      this.store.select(getSelectedParentId)
    ),
    filter(([action, locale, parentId]) => {
      if (action.type === NodeActions.createNodeResult.type) {
        return !!parentId && action.success;
      }
      return !!parentId;
    }),
    switchMap(([action, locale, parentId]) =>
      this.nodeService.getChildrenNodes(parentId).pipe(
        mergeMap((nodes: Node[]) =>
          from(Promise.all(nodes.slice(0, 15).map(async (node) => {
            const res = await lastValueFrom(this.nodeService.getNode(node.id, locale.locale));
            return {
              id: res.id,
              parent: res.parent,
              title: res.translation.find(t => t.locale === locale.locale)?.title ?? res.title
            };
          })
          )
          )
        ),
        map((translatedNodes) => NodeActions.setNodesList({ nodes: translatedNodes })),
        catchError((error) => of(NodeActions.loadNodesListError({ error })))
      )
    )
  ));


  loadNodesListError$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.loadNodesListError),
    map(async (e) => {
      let message = 'Ha ocurrido un error';
      if (e.error.status === 404) {
        message = 'El nodo no posee hijos';
      }
      if (e.error.status === 429) {
        await this.router.navigate(['/home']);
        message = 'Ha ocurrido un error, se ha excedido el limite de peticiones.';
      }
      const toast = await this.toastController.create({
        message: message,
        duration: 5000,
        position: 'bottom',
        color: 'danger',
        buttons: [{ role: 'close', icon: 'close' }]
      });
      await toast.present();
    }),
  ), { dispatch: false });

  createNode$ = createEffect((): any => this.actions$.pipe(
    ofType(
      NodeActions.createNode
    ),
    withLatestFrom(this.store.select(getSelectedParentId)),
    filter(([action, parentId]) => !!parentId),
    exhaustMap(([g, parentId]) => this.nodeService.createNode(parentId, g.locales).pipe(
      map((node: Node) => NodeActions.createNodeResult({ success: true })),
      catchError((error) => of(NodeActions.createNodeResult({ success: false }))),
    )),
  ));

  createNodeResult$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.createNodeResult),
    map(async (g) => {
      let message = 'El nodo hijo ha sido creado satisfactoriamente';
      let color = 'success';
      if (!g.success) {
        message = 'Ha ocurrido un error al creal el nodo';
        color = 'danger';
      }
      const toast = await this.toastController.create({
        message: message,
        duration: 5000,
        position: 'bottom',
        color: color,
        buttons: [{ role: 'close', icon: 'close' }]
      });
      await toast.present();
    }),
  ), { dispatch: false });

  deleteNode$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.deleteNode),
    exhaustMap((g) => this.nodeService.deleteNode(g.nodeId).pipe(
      map((node: Node) => NodeActions.deleteNodeResult({ success: true, nodeId: g.nodeId })),
      catchError((error) => of(NodeActions.deleteNodeResult({ success: false, error }))),
    )),
  ));

  deleteNodeResult$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.deleteNodeResult),
    map(async (g) => {
      let message = 'Se ha eliminado el nodo satisfactoriamente';
      let color = 'success';
      if (!g.success) {
        message = 'No se puede eliminar un nodo que contenga hijos';
        color = 'danger';
      }
      const toast = await this.toastController.create({
        message: message,
        duration: 5000,
        position: 'bottom',
        color: color,
        buttons: [{ role: 'close', icon: 'close' }]
      });
      await toast.present();
    }),
  ), { dispatch: false });

  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions,
    private nodeService: NodeService,
    private toastController: ToastController,
  ) {
  }
}
