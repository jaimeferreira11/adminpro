import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate():  Promise<boolean> | boolean {

    console.log('Verificando sesion....');

    let token = this._usuarioService.token;

    let payload = JSON.parse( atob( token.split('.')[1]));

    let expirado = this.expirado( payload.exp);

    console.log(expirado);

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }


  expirado( fechaExpiracion: number ) {

    let ahora = new Date().getTime() / 1000;

    if ( fechaExpiracion < ahora ) {
        return true;
    } else {

      return false;
    }

  }

}
