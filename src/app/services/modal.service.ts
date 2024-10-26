import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _dialog = inject(MatDialog);
  constructor() { }
  
  openModal<CT, T>(componentRef: ComponentType<CT>, data?: T, isEditing = false): void {
    const config = { data, isEditing };

    this._dialog.open(componentRef, {
      data: config,
      width: '600px'
    });
  }

  closeModal(): void {
    this._dialog.closeAll();
  }
}