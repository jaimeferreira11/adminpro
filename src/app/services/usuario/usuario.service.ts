import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }


  estaLogueado() {

    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  login ( usuario: Usuario, recordar: boolean = false ) {

    let url = URL + '/login';

    return this.http.post(url, usuario)
      .pipe(map ((resp: any ) => {

        if ( recordar ) {
          localStorage.setItem('email', usuario.email );
        } else {
          localStorage.removeItem('email');
        }

        this.guardarStorage( resp.id, resp.token, resp.usuario );

        return true;

      }));


  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }


  crearUsuario( usuario: Usuario ) {


    let url = URL + '/usuario';

    return this.http.post( url , usuario)
      .pipe(map ((resp: any ) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));



  }


  actualizarUsuario( usuario: Usuario) {
    let url = URL + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
    .pipe(map ((resp: any ) => {

      if ( usuario._id === this.usuario._id) {

        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        if ( localStorage.getItem('email').length > 0 ) {
          localStorage.setItem('email', resp.usuario.email );
        }
      }

      swal('Usuario modificado', usuario.nombre, 'success');

      return true;
    }));
  }

  cambiarImagen( file: File, id: string ) {

    this._subirArchivoService.subirArchivo(file, 'usuarios', id)
    .then( (resp: any) => {

      this.usuario.img = resp.usuario.img;

      swal('Imagen actualizada', this.usuario.nombre, 'success');

      this.guardarStorage(id, this.token, this.usuario);

    })
    .catch(err => {
      console.log(err);

    });
  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL + '/usuario?desde=' + desde;

    return this.http.get(url);
  }


  buscarUsuarios( termino: string ) {

    let url = URL + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
    .pipe(map ((resp: any ) => resp.usuarios ));

  }


  borrarUsuario( id: string ) {

    let url = URL + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
    .pipe(map ((resp: any ) => {
      swal('Usuario Borrado', 'El usuario ha sido eliminado', 'success');
      return true;
      }));

  }


}
