import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEventComponent } from "./createevent/createevent.component";
import { EventListComponent } from "./eventlist/eventlist.component";

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'Create',
            component: CreateEventComponent
        }, {
            path: 'EventList',
            component: EventListComponent
        }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventsRoutingModule { }
