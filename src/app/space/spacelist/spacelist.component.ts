import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../space.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-spacelist',
  templateUrl: './spacelist.component.html',
  styleUrls: ['./spacelist.component.scss']
})
export class SpacelistComponent implements OnInit {

  spaces: any[];

  constructor(private spaceService: SpaceService , private router: Router) { }

  ngOnInit() {
    this.spaceService.getAllSpaces().subscribe(data => {
      this.spaces = data;
    });
  }

  reserveSpace(space: any): void {
    console.log('Reserving space:', space);
    this.router.navigate(['/reservations/Create']);
  }
}
