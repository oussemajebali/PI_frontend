import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
 
import { EventsRoutingModule } from "./event-routing.module";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventListComponent } from "./eventlist/eventlist.component";
import { CreateEventComponent } from "./createevent/createevent.component";
import { ParticipationComponent } from "./participation/participation.component";
import { EventService} from "./event.service";
import { ParticipationService } from './participation.service';
 
@NgModule({
    imports: [
        CommonModule,
        EventsRoutingModule,
        NgxChartsModule,
        NgbModule,
        MatchHeightModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        CreateEventComponent,
        EventListComponent,
        ParticipationComponent
    ],
    providers : [
        EventService,
        ParticipationService
    ]
})
export class EventsModule { }