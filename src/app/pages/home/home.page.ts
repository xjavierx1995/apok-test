import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { NodeService } from 'src/app/services/node.service';
import { AppState } from 'src/app/store/app.state';
import { loadNodesList, loadParentNodesList, setNodesList } from 'src/app/store/node/node.action';
import { Node } from 'src/app/store/node/node.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public parentNodes: Node[];
  private refreshEvent: any;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ionViewWillEnter(){
    this.store.dispatch(loadParentNodesList());
    this.store.select('node').pipe(takeUntil(this.unsubscribe$)).subscribe( node => {
      this.parentNodes = node.nodesList;
    });
  }

  async showChildren(parentNodeId: string) {
    this.router.navigate(['/children-list', parentNodeId]);
  }

  handleRefresh(event: any) {
    this.store.dispatch(loadParentNodesList());
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
