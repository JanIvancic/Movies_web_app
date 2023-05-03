import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class OdjavaService {

  constructor() { }

  async odjaviSe() {
    let odgovor = await fetch(`${environment.URL}/odjava`, {method:'GET'});
    let podaci = await odgovor.text();
    let odg = JSON.parse(podaci);
  }
}
