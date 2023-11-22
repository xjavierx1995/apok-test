import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, from, lastValueFrom, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { NodeService } from 'src/app/services/node.service';
import * as NodeActions from './node.action'; 
import * as LocaleActions from '../locale/locale.action'; 
import { Node } from './node.state';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { getSelectedLocale } from '../locale/locale.selector';
import { getSelectedParentId } from './node.selector';

@Injectable()
export class NodeEffects {

  loadParentNodes$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.loadParentNodesList),
    exhaustMap((g) => this.nodeService.getParentNodes().pipe(
      map((nodes: Node[]) => NodeActions.setNodesList({ nodes })),
      catchError((error) => of(NodeActions.loadNodesListError({ error }))),
    )),
  ));

  loadChlidrenNodes$ = createEffect(() => this.actions$.pipe(
    ofType(
      NodeActions.loadNodesList,
      LocaleActions.setSelectedLocale
    ),
    withLatestFrom(
      this.store.select(getSelectedLocale), 
      this.store.select(getSelectedParentId)
    ),
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
  

  getPrivateGroupDetailOk$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.loadNodesListError),
    map(async (e) => {
      let message = 'Ha ocurrido un error';
      if (e.error.status === 404) {
        message = 'El nodo no posee hijos';
      }
      if (e.error.status === 429) {
        message = 'Ha ocurrido un error al consultar las traducciones';
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

  constructor(
    private store: Store,
    private actions$: Actions,
    private nodeService: NodeService,
    private toastController: ToastController,
  ) {
  }
}
