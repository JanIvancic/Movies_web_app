import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PocetnaComponent } from './src/app/pocetna/pocetna.component';
import { RegistracijaComponent } from './src/app/registracija/registracija.component';
import { PrijavaComponent } from './src/app/prijava/prijava.component';
import { ProfilComponent } from './src/app/profil/profil.component';
import { DokumentacijaComponent } from './src/app/dokumentacija/dokumentacija.component';

const routes: Routes = [
    { path: '', redirectTo: 'pocetna', pathMatch: 'full' },
    { path: 'pocetna', component: PocetnaComponent },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'registracija', component: RegistracijaComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'dokumentacija', component: DokumentacijaComponent },
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
