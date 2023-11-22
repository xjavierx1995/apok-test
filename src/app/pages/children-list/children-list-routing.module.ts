import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildrenListPage } from './children-list.page';

const routes: Routes = [
  {
    path: '',
    component: ChildrenListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenListPageRoutingModule {}
