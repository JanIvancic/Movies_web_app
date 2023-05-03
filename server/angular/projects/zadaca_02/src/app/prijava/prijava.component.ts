import { Component, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment';


@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent {
  korimeHtml: HTMLInputElement = document.getElementById("korime") as HTMLInputElement;
  lozinkaHtml: HTMLInputElement = document.getElementById("lozinka") as HTMLInputElement;
  privGumbHtml: HTMLInputElement = document.getElementById("privGumb") as HTMLInputElement;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.privGumbHtml.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("PRIJAVA GUMB")
      let korimeUnos = this.korimeHtml.value;
      let lozinkaUnos = this.lozinkaHtml.value;
      
      let rezultat = await fetch(`${environment.URL}/prijava`, {
        method: 'POST',
        body: JSON.stringify({
          korime: korimeUnos,
          lozinka: lozinkaUnos,
        })
      });
      let odg = await rezultat.text();
      console.log(odg);
      
      this.router.navigate(['/pocetna']);
    })
  }
}