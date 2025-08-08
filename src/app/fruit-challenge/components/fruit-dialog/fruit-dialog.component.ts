import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { Fruit } from '../../models/fruit';

@Component({
  selector: 'app-fruit-dialog',
  templateUrl: './fruit-dialog.component.html',
  styleUrls: ['./fruit-dialog.component.scss']
})
export class FruitDialogComponent {
  readonly data = inject<Fruit>(MAT_DIALOG_DATA);
  mouseX = 0;
  mouseY = 0;
  backgroundPos = 'center center';

  @ViewChild('dialogbox') dialogBoxRef!: ElementRef;
  
  constructor(public dialogRef: MatDialogRef<FruitDialogComponent>) { }

  onCloseClick() {
    this.dialogRef.close();
  }

  onMouseMove(event: MouseEvent) {
    const rect = this.dialogBoxRef.nativeElement.getBoundingClientRect();
    const xPercent = 50 + ((event.clientX - rect.left) / rect.width - 0.5) * 20;
    const yPercent = 50 + ((event.clientY - rect.top) / rect.height - 0.5) * 20;
    this.mouseX = xPercent;
    this.mouseY = yPercent;
    this.backgroundPos = `${xPercent}% ${yPercent}%`;
  }
}
