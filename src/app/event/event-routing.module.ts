import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from "./createevent/createevent.component";
import { EventListComponent } from "./eventlist/eventlist.component";
import { ParticipationComponent } from "./participation/participation.component";
import { RatingComponent } from 'app/components/bootstrap/rating/rating.component';

const routes: Routes = [
    { path: 'create-event', component: CreateEventComponent },
    { path: 'event-list', component: EventListComponent },
    { path: 'rating', component: RatingComponent},
    { path: '', redirectTo: 'event-list', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventsRoutingModule { }
