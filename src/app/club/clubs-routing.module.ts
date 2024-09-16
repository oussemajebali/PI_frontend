import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth-guard.service'; // Import AuthGuard
import { ClubsViewComponent } from "./clubs-view/clubs-view.component";
import { ClubsListComponent } from "./clubs-list/clubs-list.component";
import { ClubsEditComponent } from "./clubs-edit/clubs-edit.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'create',
                component: ClubsViewComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'list',
                component: ClubsListComponent,
                canActivate: [AuthGuard] // Use AuthGuard here
            },
            {
                path: 'edit/:id',
                component: ClubsEditComponent,
                canActivate: [AuthGuard] // Use AuthGuard here
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClubsRoutingModule { }
