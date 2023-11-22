import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NodeService } from 'src/app/services/node.service';
import { AppState } from 'src/app/store/app.state';
import { loadNodesList, setNodesList } from 'src/app/store/node/node.action';
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
  private unsubscribe$ = new Subject<void>();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.pipe(takeUntil(this.unsubscribe$)).subscribe( ({ node }) => {
      this.nodeList = node.nodesList;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ionViewWillEnter(){
    const parentId = this.activeRoute.snapshot.paramMap.get('parentId');
    this.getChildrenNodes(parentId);
  }

  async getChildrenNodes(parentNodeId: string) {
    this.store.dispatch(loadNodesList({ parentId: parentNodeId }));
  }

  async showChildren(parentNodeId: string) {
    this.router.navigate(['/children-list', parentNodeId]);
  }
}
