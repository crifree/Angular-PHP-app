import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms'; // Aggiungi questo import

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  // Necessario per Angular Material
    MatFormFieldModule,       // Importa il modulo per usare mat-form-field e mat-error
    MatInputModule,           // Importa il modulo per usare matInput
    MatButtonModule,
    RouterModule,
    AppRoutingModule,         // Per i pulsanti Material
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch()),  // Configura HttpClient usando il nuovo metodo
    { provide: LocationStrategy, useClass: HashLocationStrategy }  // Imposta HashLocationStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
