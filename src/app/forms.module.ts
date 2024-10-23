import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule
  ],
  providers: [],
})
export class FormModule {}
