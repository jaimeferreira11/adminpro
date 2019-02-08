import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/config/config';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  total: number = 0;

  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) { }


  cargarMedicos(desde: number = 0 ) {

    let url = URL + '/medico?desde=' + desde;

    return this.http.get( url )
                .pipe(map ((resp: any ) =>  {
                  this.total = resp.total;

                  return resp.medicos;
                }
              ));
  }

  obtenerMedico ( id: string ) {

    let url = URL + '/medico/' + id;

    return this.http.get( url )
                .pipe(map ((resp: any ) =>  resp.medico ));

  }


  borrarMedico( id: string ) {

    let url = URL + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete( url )
                .pipe(map ((resp: any ) =>  swal('Medico Borrado', 'Eliminado correctamente', 'success') ));

  }


  agregarMedico( medico: Medico) {

    let url = URL + '/medico/';
    url += '?token=' + this.usuarioService.token;

    return this.http.post(url , medico )
                    .pipe(map ((resp: any ) =>  {
                      swal('Hospital creado', medico.nombre, 'success');
                      return resp.medico;
                    }));

  }


  buscarMedico( termino: string ) {

    let url = URL + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
    .pipe(map ((resp: any ) => resp.medicos ));

  }


  actualizarMedico( medico: Medico) {

    let url = URL + '/medico/' + medico._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url , medico )
                    .pipe(map ((resp: any ) => {
                      swal('Hospital Actualizado', medico.nombre, 'success');
                      return resp.medico;
                      }));

  }
}
