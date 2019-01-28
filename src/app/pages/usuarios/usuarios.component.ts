import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalResgistros: number = 0;
  cargando: boolean = true;
  next: boolean = true;
  previus: boolean = false;

  constructor(private _usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe( () => this.cargarUsuarios());
  }

  mostrarModal(  id: string) {

    this._modalUploadService.mostrarModal('usuarios', id );
  }


  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {

        this.totalResgistros = resp.total;
        this.usuarios = resp.usuarios;

    });

    this.cargando = false;
  }


  cambiarDesde(valor: number) {

    let desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalResgistros ) {
      this.previus = true;
      this.next = false;
      return;
    }

    if ( desde < 0) {
      this.previus = false;
      this.next = true;
      return;
    }
    this.previus = true;
    this.next = true;
    this.desde += valor;
    this.cargarUsuarios();
  }


  buscarUsuario( termino: string ) {
    console.log(termino);

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
    .subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });

    this.cargando = false;

  }


  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }


    swal({
      title: 'Estas seguro?',
      text: 'Estas a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( willDelete => {
      console.log(willDelete);

      if (willDelete) {

        this._usuarioService.borrarUsuario(usuario._id).subscribe(resp => {
          this.desde = 0;
          console.log(resp);
          this.cargarUsuarios();

        });

      }
    });
  }

  guardarUsuario( usuario: Usuario) {

    this._usuarioService.actualizarUsuario( usuario )
      .subscribe();

  }

}
