import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService, ModalUploadService } from '../../services/services.index';

declare var swal: any;
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalResgistros: number = 0;
  cargando: boolean = true;
  next: boolean = true;
  previus: boolean = false;
  desde: number = 0;

  constructor (public _medicoService: MedicoService,
                public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion.subscribe( () => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde)
            .subscribe( medicos => this.medicos = medicos);
    this.cargando = false;
  }

  borrarMedico( medico: Medico ) {

    this._medicoService.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());

  }

  buscarMedico( termino: string ) {
    console.log(termino);

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this._medicoService.buscarMedico(termino)
    .subscribe( (medicos: Medico[]) => {
      this.medicos = medicos;
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
    this.cargarMedicos();
  }


}
