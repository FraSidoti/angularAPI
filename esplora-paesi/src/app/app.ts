import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive]   // ❗ computed NON va qui
})
export class App {

  // Titolo come Signal
  readonly title = signal('Esplora Paesi');

  // Filtri come Signal
  filtroNome = signal('');
  filtroRegione = signal('');

  // Computed Signal (dipende dai due filtri)
  readonly filtri = computed(() => ({
    nome: this.filtroNome(),
    regione: this.filtroRegione()
  }));

  applicaFiltri() {
    console.log('Filtri applicati:', this.filtri());
  }

  resetFiltri() {
    this.filtroNome.set('');
    this.filtroRegione.set('');
  }
}
