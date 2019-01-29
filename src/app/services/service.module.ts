import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SettingsService, SharedService, SidebarService,
    UsuarioService, LoginGuardGuard, SubirArchivoService, AdminGuard
  } from './services.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


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
     SubirArchivoService,
     ModalUploadService
   ],

})
export class ServiceModule { }
