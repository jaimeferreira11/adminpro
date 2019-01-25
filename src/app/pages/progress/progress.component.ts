import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  porcentaje: number = 50;
  leyenda: string = 'Progress 1';

  porcentaje2: number = 30;
  leyenda2: string = 'Progress 2';

  constructor() { }

  ngOnInit() {
  }


}
