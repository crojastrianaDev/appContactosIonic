import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { FiltrosService } from '../services/filtros.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  termino: string = '';
  contactoItems: any;
  searchControl: FormControl;

  constructor(
    private nacController: NavController,
    public filtroService: FiltrosService,
    private router: ActivatedRoute
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      //console.info(params['termino']);
      this.filtroService.buscarContacto(params['termino']);
    });
  }
}
