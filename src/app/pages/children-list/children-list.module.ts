import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildrenListPageRoutingModule } from './children-list-routing.module';

import { ChildrenListPage } from './children-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildrenListPageRoutingModule
  ],
  declarations: [ChildrenListPage]
})
export class ChildrenListPageModule {}
