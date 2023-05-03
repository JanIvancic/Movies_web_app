import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {

  constructor(private router: Router) {

  }


  ngOnInit(): void {
    let router = this.router;
    let gumbRegHtml: HTMLInputElement = document.getElementById("regGumb") as HTMLInputElement;
    console.log(gumbRegHtml);
    let forma: HTMLFormElement = document.querySelector('form') as HTMLFormElement;
    forma.addEventListener('submit', function(e) {
      console.log('forma se isla submitat');
      
      e.preventDefault();
    })

    gumbRegHtml.addEventListener("click", async function (event) {
      console.log("TEST");


      let imeHtml: HTMLInputElement = document.getElementById("ime") as HTMLInputElement;
      let prezimeHtml: HTMLInputElement = document.getElementById("prezime") as HTMLInputElement;
      let korimeHtml: HTMLInputElement = document.getElementById("korime") as HTMLInputElement;
      let lozinkaHtml: HTMLInputElement = document.getElementById("lozinka") as HTMLInputElement;
      let emailHtml: HTMLInputElement = document.getElementById("email") as HTMLInputElement;

      let imeUnos: string = imeHtml.value;
      let prezimeUnos = prezimeHtml.value
      let korimeUnos = korimeHtml.value
      let lozinkaUnos = lozinkaHtml.value
      let emailUnos = emailHtml.value
      let unosIspravan = true;
      if (!/^[a-zA-Z0-9]{2,20}$/.test(imeUnos)) {
        imeHtml.style.outline = '2px solid red';
        unosIspravan = false;
      }
      if (!/^[a-zA-Z0-9]{3,20}$/.test(prezimeUnos)) {
        prezimeHtml.style.outline = '2px solid red';
        unosIspravan = false;
      }
      if (!/(?=(.*[0-9]){2})(?=(.*[a-zA-Z]){2}).{7,20}/.test(korimeUnos)) {
        korimeHtml.style.outline = '2px solid red';
        unosIspravan = false;
      }
      if (!/^[a-zA-Z0-9]{3,20}$/.test(lozinkaUnos)) {
        lozinkaHtml.style.outline = '2px solid red';
        unosIspravan = false;
      }
      ///(?=(.*[0-9]){3})(?=(.*[a-zA-Z]){3}(?=(.*[@#$%^&+=]){3})).{8,100}/
      if (!/^[a-zA-Z0-9]{3,20}$/.test(emailUnos)) {
        emailHtml.style.outline = '2px solid red';
        unosIspravan = false;
      }///^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@a-zA-Z0-9?(?:.a-zA-Z0-9?)*$/
      if (!unosIspravan) {
        return;
      }


      let rezultat = await fetch(`/registracija`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ime: imeUnos,
          prezime: prezimeUnos,
          korime: korimeUnos,
          lozinka: lozinkaUnos,
          email: emailUnos
        })
      });
      
      let odg = await rezultat.text();
      console.log(odg);
      let odgJson = JSON.parse(odg);
      console.log("PRIJEEE");
      if (odgJson.uspjesno) {
        console.log("SDDSD");
        router.navigate(['/pocetna']);
      }
    })
  }
}
