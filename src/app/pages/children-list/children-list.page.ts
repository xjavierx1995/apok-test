import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NodeService } from 'src/app/services/node.service';
import { AppState } from 'src/app/store/app.state';
import { setNodesList } from 'src/app/store/node/node.action';
import { Node } from 'src/app/store/node/node.state';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.page.html',
  styleUrls: ['./children-list.page.scss'],
})
export class ChildrenListPage {

  public nodeList: Node[];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private nodeService: NodeService,
    private store: Store<AppState>,
  ) { }

  ionViewWillEnter(){
    this.getChildrenNodes();

    this.store.subscribe( ({ node }) => {
      this.nodeList = node.nodesList;
    });
  }

  async getChildrenNodes() {
    const parentId = this.activeRoute.snapshot.paramMap.get('parentId');
    console.log(parentId);
    
    this.nodeService.getChildrenNodes(parentId).subscribe(nodes => {
      this.store.dispatch(setNodesList({ nodes }));
    });
  }

  async showChildren(parentNodeId: number) {
    await this.router.navigate(['/children-list', parentNodeId]);
  }
}
