import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  //termino: string =''
  searchTerm = '';

  constructor(private router: Router) {}

  buscar() {
    //console.log(this.searchTerm);
    this.buscarContacto(this.searchTerm);
  }

  buscarContacto(termino: string) {
    if (termino.length < 1) {
      return;
    }
    this.router.navigate(['tabs/tab2', termino]);
    // console.log('En navigate', termino);
  }
}
