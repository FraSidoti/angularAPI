import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaesiService } from '../services/paesi-service';

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

  filtroNome: string = '';
  filtroRegione: string = '';

  regioni: string[] = [
    "Africa", "Americas", "Asia", "Europe", "Oceania"
  ];

  constructor(private service: PaesiService) {}

  ngOnInit(): void {
    this.service.getPaesi().subscribe((data: any[]) => {
      this.paesi = data;
      this.paesiFiltrati = data;
    });
  }

  applicaFiltri() {
    this.paesiFiltrati = this.paesi.filter(p => {

      const matchNome = this.filtroNome.trim().length === 0 ||
        p.name.common.toLowerCase().includes(this.filtroNome.toLowerCase());

      const matchRegione = this.filtroRegione.trim().length === 0 ||
        p.region === this.filtroRegione;

      return matchNome && matchRegione;
    });
  }

  resetFiltri() {
    this.filtroNome = '';
    this.filtroRegione = '';
    this.paesiFiltrati = [...this.paesi];
  }
}
