import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateClubComponent } from './createclub/createclub.component';
import { ClubService } from './club.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CreateClubComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ClubService]
})
export class ClubModule { }
