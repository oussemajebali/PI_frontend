import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SpaceRoutingModule } from './space-routing.module';
import { CreatespaceComponent } from './createspace/createspace.component';
import { SpacelistComponent } from './spacelist/spacelist.component';
import { SpaceService } from './space.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpaceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CreatespaceComponent,
    SpacelistComponent,
  ],
  providers : [
      SpaceService,
  ]
})
export class SpaceModule { }
