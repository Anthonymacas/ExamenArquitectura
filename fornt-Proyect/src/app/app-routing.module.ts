import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { TareaComponent } from './componentes/tarea/tarea.component';
import { EmpleadoComponent } from './componentes/empleado/empleado.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'proyectos', component: ProyectoComponent, canActivate: [AuthGuard] },
  { path: 'tareas', component: TareaComponent, canActivate: [AuthGuard] },
  { path: 'empleados', component: EmpleadoComponent, canActivate: [AuthGuard] },
  {
    path: 'notfound',
    component: NoEncontradoComponent,
  },
  {
    path: '**',
    redirectTo: '/notfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
