// src/app/dettaglio-paese/dettaglio-paese.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaesiService } from '../services/paesi-service';

@Component({
  selector: 'app-dettaglio-paese',
  standalone: true,
  templateUrl: './dettaglio-paese.html',
  styleUrls: ['./dettaglio-paese.css'],
  imports: [CommonModule, RouterModule]
})
export class DettaglioPaese implements OnInit {

  paese: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paesiService: PaesiService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');

    if (!code) {
      this.router.navigate(['/lista-paesi']);
      return;
    }

    this.paesiService.getPaeseByCode(code).subscribe({
      next: (res: any) => {
        this.paese = Array.isArray(res) ? res[0] : res;
      },
      error: (err: any) => {
        console.error('Errore caricamento paese:', err);
        this.router.navigate(['/lista-paesi']);
      }
    });
  }

  // 👉 Lingue come lista leggibile
  get lingue(): string[] {
    if (!this.paese?.languages) return [];
    return Object.values(this.paese.languages) as string[];
  }

  // 👉 Valute come "Euro (EUR, €)"
  get valute(): string[] {
    if (!this.paese?.currencies) return [];
    const entries = Object.entries(this.paese.currencies) as [string, any][];
    return entries.map(([code, info]) => {
      const name = info?.name || code;
      const symbol = info?.symbol ? ` ${info.symbol}` : '';
      return `${name} (${code}${symbol})`;
    });
  }

  // 👉 Fusi orari
  get timezones(): string[] {
    return this.paese?.timezones || [];
  }

  vaiAlConfine(code: string) {
    this.router.navigate(['/dettaglio-paese', code]);
  }
}
