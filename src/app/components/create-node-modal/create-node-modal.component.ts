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
  styleUrls: ['./create-node-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  template: `
    <ion-button (click)="openModal = true" color="primary">Crear nodo hijo</ion-button>
    <ion-modal [isOpen]="openModal">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button (click)="cancel()">
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title>Crear nodo hijo</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
              label="Nodo padre"
              labelPlacement="stacked"
              type="text"
              [value]="selectedNode.translation[0]?.title ?? selectedNode.title"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-select [multiple]="true" label="Idioma" label-placement="stacked" [(ngModel)]="selectedLocale">
              <ion-select-option *ngFor="let item of localeList" [value]="item.locale">
                {{ item.label }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-button (click)="confirm()" color="primary" expand="block" [strong]="true">Guardar</ion-button>
        </ion-content>
      </ng-template>
    </ion-modal>
  `
})
export class CreateNodeModalComponent  implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  public localeList: Ilocale[];
  public selectedNode: Node;
  public selectedLocale: string[] = ['en_US'];
  public openModal = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( ({ locale, node }) => {
      this.selectedNode = node.selectedNode;
      this.localeList = locale.localeList;
      this.selectedLocale = [locale.selectedLocale.locale];
    });
  }

  cancel() {
    this.openModal = false;
  }

  confirm() {
    this.store.dispatch(createNode({ locales: this.selectedLocale }));
    this.openModal = false;
  }
}
