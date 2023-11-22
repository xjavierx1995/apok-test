import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildrenListPageRoutingModule } from './children-list-routing.module';

import { ChildrenListPage } from './children-list.page';
import { SelectLocaleComponent } from 'src/app/components/select-locale/select-locale.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildrenListPageRoutingModule,
    SelectLocaleComponent
  ],
  declarations: [ChildrenListPage]
})
export class ChildrenListPageModule {}
