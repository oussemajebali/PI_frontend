import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../space.service';


@Component({
  selector: 'app-spacelist',
  templateUrl: './spacelist.component.html',
  styleUrls: ['./spacelist.component.scss']
})
export class SpacelistComponent implements OnInit {

  spaces: any[];

  constructor(private spaceService: SpaceService) { }

  ngOnInit() {
    this.spaceService.getAllSpaces().subscribe(data => {
      this.spaces = data;
    });
  }

  reserveSpace(space: any) {
    // Logic to reserve space
    console.log('Reserving space:', space);
  }

}
