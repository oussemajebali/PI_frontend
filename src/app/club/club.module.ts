import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateClubComponent } from './createclub/createclub.component';
import { ClubService } from './club.service';
import { HttpClientModule } from '@angular/common/http';
import { ClubListComponent } from './clublist/clubtlist.component';
import { ClubsRoutingModule } from './club-routing.module';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    ClubsRoutingModule,
    NgxChartsModule,
    NgbModule,
    MatchHeightModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CreateClubComponent,
    ClubListComponent
  ],
  providers: [ClubService]
})
export class ClubModule { }
