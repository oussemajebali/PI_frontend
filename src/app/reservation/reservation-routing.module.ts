import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatereservationComponent } from './createreservation/createreservation.component';
import { ReservationlistComponent } from './reservationlist/reservationlist.component';

const routes: Routes = [

  { path: '',
  children: [{
  path: 'Create',
  component: CreatereservationComponent
}, {
  path: 'ReservationList',
  component: ReservationlistComponent
}
] },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
