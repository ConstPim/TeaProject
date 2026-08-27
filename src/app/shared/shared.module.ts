import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {RouterModule} from "@angular/router";
import { ShortWordsPipe } from './pipes/short-words.pipe';



@NgModule({
  declarations: [
    ProductCardComponent,
    ShortWordsPipe

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    // TruncateWordsPipe
  ]
})
export class SharedModule { }
