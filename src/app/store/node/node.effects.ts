import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { NodeService } from 'src/app/services/node.service';
import * as NodeActions from './node.action'; 
import { Node } from './node.state';
import { ToastController } from '@ionic/angular';

@Injectable()
export class NodeEffects {

  loadParentNodes$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.loadParentNodesList),
    exhaustMap((g) => this.nodeService.getParentNodes().pipe(
      map((nodes: Node[]) => NodeActions.setNodesList({ nodes })),
      catchError((error) => of(NodeActions.loadNodesListError({ error }))),
    )),
  ));

  loadChlidrenNodes$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.loadNodesList),
    exhaustMap((g) => this.nodeService.getChildrenNodes(g.parentId).pipe(
      map((nodes: Node[]) => NodeActions.setNodesList({ nodes })),
      catchError((error) => of(NodeActions.loadNodesListError({ error }))),
    )),
  ));

  getPrivateGroupDetailOk$ = createEffect((): any => this.actions$.pipe(
    ofType(NodeActions.loadNodesListError),
    map(async (e) => {
      const toast = await this.toastController.create({
        message: 'El nodo no posee hijos',
        duration: 5000,
        position: 'bottom',
        color: 'danger',
        buttons: [{ role: 'close', icon: 'close' }]
      });
      await toast.present();
      window.history.back();
    }),
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private nodeService: NodeService,
    private toastController: ToastController,
  ) {
  }
}
