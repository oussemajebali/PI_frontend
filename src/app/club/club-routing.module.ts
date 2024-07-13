import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateClubComponent } from "./createclub/createclub.component";
import { ClubListComponent } from "./clublist/clubtlist.component";

const routes: Routes = [
    { path: 'create-club', component: CreateClubComponent },
    { path: 'club-list', component: ClubListComponent },
    { path: '', redirectTo: 'club-list', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClubsRoutingModule { }
