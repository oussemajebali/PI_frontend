import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { UsersViewComponent } from "./users-view/users-view.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersEditComponent } from "./users-edit/users-edit.component";
import { SwiperModule } from "ngx-swiper-wrapper";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
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
        UsersListComponent,
        UsersViewComponent,
        UsersEditComponent
    ],
    providers: [
        UserService,
    ]
})
export class UsersModule { }
