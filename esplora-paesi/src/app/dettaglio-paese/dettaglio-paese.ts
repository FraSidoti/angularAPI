// src/app/dettaglio-paese/dettaglio-paese.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaesiService } from '../services/paesi-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dettaglio-paese',
  imports: [CommonModule, RouterModule],
  templateUrl: './dettaglio-paese.html',
  styleUrls: ['./dettaglio-paese.css']
})
export class DettaglioPaese implements OnInit {
  paese: any;
  Object = Object; // Expose Object to template

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paesiService: PaesiService
  ) { }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.paesiService.getByCode(code).subscribe(res => {
        this.paese = Array.isArray(res) ? res[0] : res;
      }, err => {
        this.router.navigate(['/lista-paesi']);
      });
    } else {
      this.router.navigate(['/lista-paesi']);
    }
  }

  vaiAlConfine(code: string) {
    this.router.navigate(['/dettaglio-paese', code]);
  }
}