import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { ClubComponent } from './components/club/club.component';
import { TeamBuildingComponent } from './components/team-building/team-building.component';
import { EventComponent } from './components/event/event.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SpaceComponent } from './components/space/space.component';
import { CarpoolComponent } from './components/carpool/carpool.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ClubComponent,
    TeamBuildingComponent,
    EventComponent,
    FeedbackComponent,
    ReservationsComponent,
    SpaceComponent,
    CarpoolComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
