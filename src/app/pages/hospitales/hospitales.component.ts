import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from 'src/app/services/services.index';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;

  constructor (public _hospitalService: HospitalService,
                public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
            .subscribe( hospitales => this.hospitales = hospitales);
    this.cargando = false;
  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital( hospital: Hospital ) {

    this._hospitalService.borrarHospital(hospital._id).subscribe(() => this.cargarHospitales());

  }

  buscarHospitales( termino: string ) {
    console.log(termino);

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospitales(termino)
    .subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });

    this.cargando = false;

  }

  crearHospital() {

    swal ({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,

    }).then( (valor: string) => {

      if (!valor || valor.length ===  0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
                      .subscribe( () => this.cargarHospitales());
    });
  }

  actualizarImagen(id: string) {

    this._modalUploadService.mostrarModal('hospitales', id );
  }

}
