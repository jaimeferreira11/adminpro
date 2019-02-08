import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SettingsService, SharedService, SidebarService, HospitalService, ModalUploadService,
    UsuarioService, LoginGuardGuard, SubirArchivoService, AdminGuard, SessionGuard, MedicoService
  } from './services.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule
  ],
   providers: [
     SettingsService,
     SidebarService,
     SharedService,
     UsuarioService,
     LoginGuardGuard,
     AdminGuard,
     SessionGuard,
     SubirArchivoService,
     ModalUploadService,
     HospitalService,
     MedicoService
   ],

})
export class ServiceModule { }
