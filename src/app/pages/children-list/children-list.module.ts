import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildrenListPageRoutingModule } from './children-list-routing.module';

import { ChildrenListPage } from './children-list.page';
import { SelectLocaleComponent } from 'src/app/components/select-locale/select-locale.component';
import { CreateNodeModalComponent } from 'src/app/components/create-node-modal/create-node-modal.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { NoDataComponent } from 'src/app/components/no-data/no-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildrenListPageRoutingModule,
    SelectLocaleComponent,
    CreateNodeModalComponent,
    LoadingComponent,
    NoDataComponent
  ],
  declarations: [ChildrenListPage]
})
export class ChildrenListPageModule {}
