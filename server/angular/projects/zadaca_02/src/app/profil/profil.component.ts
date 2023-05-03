import { Component, OnInit } from '@angular/core';
import { environment } from '../../enviroments/environment';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit{
  constructor(){}

  async ngOnInit(): Promise<void> {
    let imeHtml: HTMLElement = document.getElementById("ime") as HTMLElement;
    let prezimeHtml: HTMLElement = document.getElementById("prezime") as HTMLElement;
    let korimeHtml: HTMLElement = document.getElementById("korime") as HTMLElement;
    let emailHtml: HTMLElement = document.getElementById("email") as HTMLElement;
    let poruka:HTMLElement = document.querySelector('.poruka') as HTMLElement;

    let prijavljen = await this.provjeriPrijavu();
    console.log('iz funkcije dobijveno', prijavljen);
    
    if (!prijavljen) {
      poruka.innerHTML = 'Niste prijavljeni'
      console.log('nisi prijavljen');
      
    } else {
      console.log('priajvljen');
      let korisnik = await this.dohvatiKorisnika();
      console.log('funkc vratila ', korisnik);

      imeHtml.innerHTML = korisnik.ime;
      prezimeHtml.innerHTML = korisnik.prezime;
      emailHtml.innerHTML= korisnik.email;
      korimeHtml.innerHTML = korisnik.korime;
      
    }
  }

  async provjeriPrijavu() {
    let odgovor = await fetch(`${environment.URL}/prijavljen`, {method:'GET'});
    let podaci = await odgovor.text();
    let odg = JSON.parse(podaci);
    console.log(odg);
    

    if (odg.prijavljen) {
      return true;
    }
    else return false
  }

  async dohvatiKorisnika() {
    let odgovor = await fetch(`${environment.URL}/uzmiKorisnika`, {
      method:'GET',
    });
    
    let podaci = await odgovor.text();
    
    console.log('podaci o korisniku', podaci);
    return JSON.parse(podaci)
  }

}
