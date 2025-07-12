import { Component } from '@angular/core';
import { BarraLateralComponent } from '../../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {
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
