import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ClubComponent } from './components/club/club.component';
import { TeamBuildingComponent } from './components/team-building/team-building.component';
import { EventComponent } from './components/event/event.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SpaceComponent } from './components/space/space.component';
import { CarpoolComponent } from './components/carpool/carpool.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'clubs', component: ClubComponent },
  { path: 'team-building', component: TeamBuildingComponent },
  { path: 'events', component: EventComponent },
  { path: 'feedbacks', component: FeedbackComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'spaces', component: SpaceComponent },
  { path: 'carpools', component: CarpoolComponent },
  { path: 'notifications', component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
