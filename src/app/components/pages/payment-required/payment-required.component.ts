import { Component } from '@angular/core';
import { BarraLateralComponent } from '../../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-required',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './payment-required.component.html',
  styleUrl: './payment-required.component.css'
})
export class PaymentRequiredComponent {
  returnUrl: string = '/home';

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
