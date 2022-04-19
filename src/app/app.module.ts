import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CalcInputComponent } from './calc-input/calc-input.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CalcInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    InputSwitchModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
