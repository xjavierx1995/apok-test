import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NodeService } from 'src/app/services/node.service';
import { AppState } from 'src/app/store/app.state';
import { setNodesList } from 'src/app/store/node/node.action';
import { Node } from 'src/app/store/node/node.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public parentNodes: Node[];

  constructor(
    private store: Store<AppState>,
    private nodeService: NodeService,
    private router: Router,
  ) { }

  ionViewWillEnter(){
    this.getParentNodes();

    this.store.subscribe( ({ node }) => {
      this.parentNodes = node.nodesList;
    });
  }

  getParentNodes(): void {
    this.nodeService.getParentNodes().subscribe(nodes => {
      this.store.dispatch(setNodesList({ nodes }));
    });
  }

  async showChildren(parentNodeId: number) {
    await this.router.navigate(['/children-list', parentNodeId]);
  }

}
