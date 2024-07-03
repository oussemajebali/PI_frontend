import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersViewComponent } from "./users-view/users-view.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersEditComponent } from "./users-edit/users-edit.component";

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'create',
            component: UsersViewComponent
        }, {
            path: 'list',
            component: UsersListComponent
        }
        , {
            path: 'edit/:id',
            component: UsersEditComponent
        }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }
