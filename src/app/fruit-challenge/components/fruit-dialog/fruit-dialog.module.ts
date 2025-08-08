import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FruitDialogComponent } from './fruit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FruitDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    FruitDialogComponent
  ],
})
export class FruitDialogModule { }