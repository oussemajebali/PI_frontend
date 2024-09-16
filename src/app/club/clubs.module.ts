import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ClubsRoutingModule } from "./clubs-routing.module";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { ClubsViewComponent } from "./clubs-view/clubs-view.component";
import { ClubsListComponent } from "./clubs-list/clubs-list.component";
import { ClubsEditComponent } from "./clubs-edit/clubs-edit.component";
import { SwiperModule } from "ngx-swiper-wrapper";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClubService } from './clubs.service';
import { ConfirmationModalComponent } from './clubs-list/confirmation-modal.component';
@NgModule({
    imports: [
        CommonModule,
        ClubsRoutingModule,
        NgxChartsModule,
        NgbModule,
        MatchHeightModule,
        SwiperModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        ConfirmationModalComponent,  // Declare the modal component
        ClubsListComponent,
        ClubsViewComponent,
        ClubsEditComponent
    ],
    providers: [
        ClubService,
    ]
})
export class ClubsModule { }
