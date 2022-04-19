import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CalcInputComponent } from './calc-input/calc-input.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NumWordPipe } from './shared/pipes/num-word.pipe';
import { LocalePipe } from './shared/pipes/locale.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalcInputComponent,
    NumWordPipe,
    LocalePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    InputSwitchModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
