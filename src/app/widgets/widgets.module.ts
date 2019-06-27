import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceCardComponent } from './place-card/place-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlaceCardComponent
  ],
  exports: [
    PlaceCardComponent
  ]
})
export class WidgetsModule { }
