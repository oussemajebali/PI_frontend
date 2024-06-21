import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { EventsRoutingModule } from "./event-routing.module";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { EventListComponent } from "./eventlist/eventlist.component";
import { CreateEventComponent } from "./createevent/createevent.component";

@NgModule({
    imports: [
        CommonModule,
        EventsRoutingModule,
        NgxChartsModule,
        NgbModule,
        MatchHeightModule
    ],
    declarations: [
        CreateEventComponent,
        EventListComponent
    ]
})
export class EventsModule { }
