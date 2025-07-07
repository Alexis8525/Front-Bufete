import { Component } from '@angular/core';
import { BarraLateralComponent } from '../../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bad-request',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './bad-request.component.html',
  styleUrl: './bad-request.component.css'
})
export class BadRequestComponent {
  returnUrl: string = '/principal';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  volver(): void {
    this.router.navigate([this.returnUrl]);
  }

}
