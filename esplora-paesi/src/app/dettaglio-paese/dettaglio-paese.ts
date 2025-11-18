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

    console.log("CODICE RICEVUTO:", code); // <--- DEBUG IMPORTANTE

    if (!code) {
      console.error("NESSUN CODICE TROVATO");
      this.router.navigate(['/paesi']);
      return;
    }

    this.paesiService.getPaeseByCode(code).subscribe({
      next: (res: any) => {
        console.log("RISPOSTA API:", res);
        this.paese = Array.isArray(res) ? res[0] : res;
      },
      error: (err: any) => {
        console.error("ERRORE API:", err);
      }
    });
  }

  vaiAlConfine(code: string) {
    this.router.navigate(['/paese', code]);
  }
}
