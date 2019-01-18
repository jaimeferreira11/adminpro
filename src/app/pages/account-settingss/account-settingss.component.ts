import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SettingsService } from '../../services/services.index';


@Component({
  selector: 'app-account-settingss',
  templateUrl: './account-settingss.component.html',
  styles: []
})
export class AccountSettingssComponent implements OnInit {

  constructor(public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }


  cambiarColor(tema: string, link: any) {

    this.aplicarCheck( link );
    this._ajustes.aplicarTema(tema);

  }

  aplicarCheck(link: any) {


    let selectores: any = document.getElementsByClassName('selector');

    for (let element of selectores) {
      element.classList.remove('working');

    }
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');

    let tema  = this._ajustes.ajustes.tema;
    for (let element of selectores) {
      if ( element.getAttribute('data-theme') === tema) {
        element.classList.add('working');
        break;
      }

    }
  }

}
