import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { CreatereservationComponent } from './createreservation/createreservation.component';
import { ReservationlistComponent } from './reservationlist/reservationlist.component';
import { ReservationService } from './reservation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReservationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CreatereservationComponent,
    ReservationlistComponent
  ],
  providers : [
    ReservationService,
]
})
export class ReservationModule { }
