import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePictureModule } from '../profile-picture/profile-picture.module';
import { ImageMessageComponent } from './image-message.component';

@NgModule({
  declarations: [
    ImageMessageComponent
  ],
  imports: [
    CommonModule,
    ProfilePictureModule
  ],
  exports: [
    ImageMessageComponent
  ],
})
export class ImageMessageModule { }