const konst = require("../konstante.js");
const kodovi = require("./moduli/kodovi.js");
const jwt = require("./moduli/jwt.js");
const Konfiguracija = require("../konfiguracija.js");
const url = "http://localhost:";
class Autentifikacija {

    async dodajKorisnika(korisnik) {
        let konfiguracija = new Konfiguracija();
        await konfiguracija.ucitajKonfiguraciju();
        let konfig = konfiguracija.dajKonf();
        let restPort=konfiguracija.dohvatiREST();
    
        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "moja sol"),
            email: korisnik.email,
            korime: korisnik.korime
        };

        let zaglavlje = new Headers();
        let token = jwt.kreirajToken(korisnik.korime);
        zaglavlje.set("Content-Type", "application/json");
        zaglavlje.set("Authorization", token);

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch(`${url}${restPort}` + "/api/korisnici", parametri)

        if (odgovor.status == 200) {
            console.log("Korisnik ubacen na servisu");
            return true;
        } else {
            console.log(odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }

    async aktivirajKorisnickiRacun(korime, kod) {
        let konfiguracija = new Konfiguracija();
        await konfiguracija.ucitajKonfiguraciju();
        let konfig = konfiguracija.dajKonf();
        let restPort=konfiguracija.dohvatiREST();
    
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ aktivacijskiKod: kod }),
            headers: zaglavlje
        }

        return await fetch(`${url}${restPort}` + "/api/korisnici" + korime + "/aktivacija", parametri)
    }

    async prijaviKorisnika(korime, lozinka) {
        let konfiguracija = new Konfiguracija();
        await konfiguracija.ucitajKonfiguraciju();
        let konfig = konfiguracija.dajKonf();
        let restPort=konfiguracija.dohvatiREST();
    
        lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
        let tijelo = {
            lozinka: lozinka,
        };
        let zaglavlje = new Headers();
        let token = jwt.kreirajToken(korime);
        zaglavlje.set("Content-Type", "application/json");
        zaglavlje.set("Authorization", token);

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch(`${url}${restPort}`+ "/api/korisnici/" + korime + "/prijava", parametri);
        
        console.log(odgovor.status);
        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }

}

module.exports = Autentifikacija;