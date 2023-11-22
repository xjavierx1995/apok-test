import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NodeService } from 'src/app/services/node.service';
import { AppState } from 'src/app/store/app.state';
import { deleteNode, loadNodesList, setSelectedParentId } from 'src/app/store/node/node.action';
import { Node } from 'src/app/store/node/node.state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.page.html',
  styleUrls: ['./children-list.page.scss'],
})
export class ChildrenListPage implements OnInit, OnDestroy {

  public nodeList: Node[];
  public selectedParentNode: Node;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select('node').pipe(takeUntil(this.unsubscribe$)).subscribe( node => {
      this.nodeList = node.nodesList;
      this.selectedParentNode = node.selectedNode;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ionViewWillEnter(){
    const parentId = this.activeRoute.snapshot.paramMap.get('parentId');
    this.store.dispatch(setSelectedParentId({ id: parentId }));
    this.getChildrenNodes();
  }

  async getChildrenNodes() {
    this.store.dispatch(loadNodesList());
  }

  async showChildren(parentNodeId: string) {
    this.router.navigate(['/children-list', parentNodeId]);
  }

  startDelete(nodeId: string) {
    this.store.dispatch(deleteNode({ nodeId }));
  }
}
