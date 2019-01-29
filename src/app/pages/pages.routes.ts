import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingssComponent } from './account-settingss/account-settingss.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { AdminGuard } from '../services/services.index';
import { SessionGuard } from '../services/services.index';


const pagesRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent, canActivate: [SessionGuard], data: { titulo: 'Dasboard'} },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
    { path: 'account-settings', canActivate: [SessionGuard], component: AccountSettingssComponent, data: { titulo: 'Ajustes del tema'} },
    { path: 'profile', component: ProfileComponent, canActivate: [SessionGuard], data: { titulo: 'Perfil del usuario'} },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
    { path: 'busqueda/:termino', component: BusquedaComponent, canActivate: [SessionGuard], data: { titulo: 'Buscador'} },
    // mantenimientos
    // ROLE_ADMIN
    { path: 'usuarios', canActivate: [AdminGuard, SessionGuard],
    component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'} },

    { path: '', redirectTo: '/dashboard', canActivate: [SessionGuard], pathMatch: 'full' }

];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
