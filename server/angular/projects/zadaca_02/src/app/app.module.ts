import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { PrijavaComponent } from './prijava/prijava.component';

import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { enableProdMode } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    RegistracijaComponent,
    DokumentacijaComponent,
    PrijavaComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    RecaptchaModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    if (environment.production) {
      enableProdMode();
    }
  }
}

