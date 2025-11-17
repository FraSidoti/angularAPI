// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ListaPaesi } from './lista-paesi/lista-paesi';
import { DettaglioPaese } from './dettaglio-paese/dettaglio-paese';

export const routes: Routes = [
  { path: '', redirectTo: 'lista-paesi', pathMatch: 'full' },
  { path: 'lista-paesi', component: ListaPaesi },
  { path: 'dettaglio-paese/:code', component: DettaglioPaese },
  { path: '**', redirectTo: 'lista-paesi' }
];