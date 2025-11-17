// src/app/lista-paesi/lista-paesi.ts
import { Component, OnInit } from '@angular/core';
import { PaesiService } from '../services/paesi-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-paesi',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-paesi.html',
  styleUrls: ['./lista-paesi.css']
})
export class ListaPaesi implements OnInit {
  paesi: any[] = [];
  filtrati: any[] = [];
  query = '';
  regione = '';
  pagina = 1;
  perPagina = 24;
  Math = Math; // Expose Math to template

  constructor(private paesiService: PaesiService) { }

  ngOnInit(): void {
    this.caricaTutti();
  }

  caricaTutti() {
    this.paesiService.getAll().subscribe(res => {
      this.paesi = res.sort((a: any,b: any) => (a.name.common > b.name.common ? 1 : -1));
      this.applicaFiltri();
    });
  }

  onCerca() {
    if (!this.query) { this.applicaFiltri(); return; }
    this.paesiService.searchByName(this.query).subscribe(res => {
      this.filtrati = res;
      this.pagina = 1;
    }, err => {
      this.filtrati = [];
    });
  }

  onSelezionaRegione(r: string) {
    this.regione = r;
    if (!r) { this.caricaTutti(); return; }
    this.paesiService.getByRegion(r).subscribe(res => {
      this.paesi = res.sort((a: any,b: any) => (a.name.common > b.name.common ? 1 : -1));
      this.applicaFiltri();
    }, err => {
      this.paesi = [];
      this.filtrati = [];
    });
  }

  applicaFiltri() {
    this.filtrati = this.paesi;
    this.pagina = 1;
  }

  getPaginaCorrente(): any[] {
    const start = (this.pagina - 1) * this.perPagina;
    return this.filtrati.slice(start, start + this.perPagina);
  }
}