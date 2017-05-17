import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RedactorComponent } from './redactor/redactor.component';
import { RedactorService } from './redactor/redactor.service';
import { RedactorEditorComponent } from './redactor-editor/redactor-editor.component';
@NgModule({
  declarations: [
    AppComponent,
    RedactorComponent,
    RedactorEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RedactorService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
