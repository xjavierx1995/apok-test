import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Ilocale } from 'src/app/store/locale/locale.state';
import { createNode } from 'src/app/store/node/node.action';
import { Node } from 'src/app/store/node/node.state';

@Component({
  selector: 'app-create-node-modal',
  templateUrl: './create-node-modal.component.html',
  styleUrls: ['./create-node-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
})
export class CreateNodeModalComponent  implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  public localeList: Ilocale[];
  public selectedNode: Node;
  public selectedLocale: string[] = ['en_US'];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( ({ locale, node }) => {
      this.selectedNode = node.selectedNode;
      this.localeList = locale.localeList;
      this.selectedLocale = [locale.selectedLocale.locale];
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.store.dispatch(createNode({ locales: this.selectedLocale }));
    this.modal.dismiss(null, 'confirm');
  }
}
