import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  datos = {
    nombre: 'C. Alejandro Rojas Triana',
    jornada: 'Diurna - Jueves 10:15-13:15',
    web: 'https://www.hornetestudio.tech',
  };

  constructor() {}

  ngOnInit() {}
}
