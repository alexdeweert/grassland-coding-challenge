import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMessageComponent } from './text-message.component';
import { ProfilePictureModule } from '../profile-picture/profile-picture.module';

@NgModule({
  declarations: [
    TextMessageComponent
  ],
  imports: [
    CommonModule,
    ProfilePictureModule
  ],
  exports: [
    TextMessageComponent
  ],
})
export class TextMessageModule { }