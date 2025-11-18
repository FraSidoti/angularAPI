// src/app/lista-paesi/lista-paesi.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaesiService } from '../services/paesi-service';

type SortMode = 'nome-asc' | 'nome-desc' | 'pop-asc' | 'pop-desc';

@Component({
  selector: 'lista-paesi',
  standalone: true,
  templateUrl: './lista-paesi.html',
  styleUrls: ['./lista-paesi.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class ListaPaesi implements OnInit {

  paesi: any[] = [];
  paesiFiltrati: any[] = [];

  filtroNome = '';
  filtroRegione = '';
  soloPreferiti = false;

  sortMode: SortMode = 'nome-asc';

  regioni: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  preferiti: string[] = [];

  isLoading = false;

  constructor(private service: PaesiService) {}

  ngOnInit(): void {
    this.caricaPreferiti();
    this.isLoading = true;

    this.service.getPaesi().subscribe({
      next: (data: any[]) => {
        this.paesi = data;
        this.applicaFiltri();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Errore caricamento paesi:', err);
        this.isLoading = false;
      }
    });
  }

  // ---- FILTRI + ORDINAMENTO ----

  onFiltroChange() {
    this.applicaFiltri();
  }

  applicaFiltri() {
    const nome = this.filtroNome.trim().toLowerCase();
    const regione = this.filtroRegione.trim();

    let risultato = this.paesi.filter((p) => {
      const matchNome =
        nome.length === 0 ||
        p.name?.common?.toLowerCase().includes(nome);

      const matchRegione =
        regione.length === 0 || p.region === regione;

      const matchPreferito =
        !this.soloPreferiti || this.isPreferito(p.cca3);

      return matchNome && matchRegione && matchPreferito;
    });

    risultato = this.ordina(risultato);
    this.paesiFiltrati = risultato;
  }

  private ordina(lista: any[]): any[] {
    const arr = [...lista];

    switch (this.sortMode) {
      case 'nome-asc':
        arr.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        break;
      case 'nome-desc':
        arr.sort((a, b) =>
          b.name.common.localeCompare(a.name.common)
        );
        break;
      case 'pop-asc':
        arr.sort((a, b) =>
          (a.population || 0) - (b.population || 0)
        );
        break;
      case 'pop-desc':
        arr.sort((a, b) =>
          (b.population || 0) - (a.population || 0)
        );
        break;
    }
    return arr;
  }

  resetFiltri() {
    this.filtroNome = '';
    this.filtroRegione = '';
    this.soloPreferiti = false;
    this.sortMode = 'nome-asc';
    this.applicaFiltri();
  }

  // ---- PREFERITI (localStorage) ----

  private caricaPreferiti() {
    const saved = localStorage.getItem('preferiti-paesi');
    if (saved) {
      try {
        this.preferiti = JSON.parse(saved);
      } catch {
        this.preferiti = [];
      }
    }
  }

  private salvaPreferiti() {
    localStorage.setItem('preferiti-paesi', JSON.stringify(this.preferiti));
  }

  isPreferito(code: string): boolean {
    return this.preferiti.includes(code);
  }

  togglePreferito(event: MouseEvent, code: string) {
    event.stopPropagation(); // non far scattare il routerLink

    if (this.isPreferito(code)) {
      this.preferiti = this.preferiti.filter(c => c !== code);
    } else {
      this.preferiti = [...this.preferiti, code];
    }

    this.salvaPreferiti();

    // se stai filtrando solo preferiti, aggiorna lista
    this.applicaFiltri();
  }
}
