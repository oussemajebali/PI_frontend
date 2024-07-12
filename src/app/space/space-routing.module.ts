import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatespaceComponent } from './createspace/createspace.component';
import { SpacelistComponent } from './spacelist/spacelist.component';

const routes: Routes = [
  { path: '',
    children: [{
    path: 'Create',
    component: CreatespaceComponent
}, {
    path: 'SpaceList',
    component: SpacelistComponent
}
] },
  // { path: 'list', component: SpacelistComponent },
  // { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaceRoutingModule { }
