import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NodeService } from 'src/app/services/node.service';
import { AppState } from 'src/app/store/app.state';
import { setParentNodes } from 'src/app/store/node/node.action';
import { Node } from 'src/app/store/node/node.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public parentNodes: Node[];

  constructor(
    private store: Store<AppState>,
    private nodeService: NodeService
  ) { }

  ngOnInit(): void {
    this.getParentNodes();

    this.store.subscribe( ({ node }) => {
      this.parentNodes = node.parentNodes;
    });
  }

  async getParentNodes() {
    this.nodeService.getParentNodes().subscribe(nodes => {
      this.store.dispatch(setParentNodes({ nodes }));
    });
  }

}
