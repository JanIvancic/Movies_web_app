const konst = require("../konstante.js");
const url = "http://localhost:";
const kodovi = require("./moduli/kodovi.js");
const Konfiguracija = require("../konfiguracija.js");
const jwt = require("./moduli/jwt.js");

exports.dohvatiSveZanrove = async function (zahtjev,odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    let konfig = konfiguracija.dajKonf();
    let restPort=konfiguracija.dohvatiREST();

    let token = jwt.kreirajToken("korime");
    let data = await fetch(`${url}${restPort}/api/zanr`, {
        headers: {
            'Authorization': token
        }
    });
    let podaci = await data.text();
    let zanrovi = JSON.parse(podaci);
    odgovor.send(zanrovi);
    odgovor.end();
}


exports.dohvatiSveFilmZanrove = async function (zahtjev,odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    let konfig = konfiguracija.dajKonf();
    let restPort=konfiguracija.dohvatiREST();

    let token = jwt.kreirajToken("korime");
    let data = await fetch(`${url}${restPort}/api/dohvatiSveFilmZanrove`, {
        headers: {
            'Authorization': token
        }
    });
    let podaci = await data.text();
    let filmZanrovi = JSON.parse(podaci);
    odgovor.send(filmZanrovi);
    odgovor.end();
}

exports.dohvatiSveFilmove = async function (zahtjev,odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    let konfig = konfiguracija.dajKonf();
    let restPort=konfiguracija.dohvatiREST();

    let token = jwt.kreirajToken("korime");
    let data = await fetch(`${url}${restPort}/api/sviFilmovi`, {
        headers: {
            'Authorization': token
        }
    });
    let podaci = await data.text();
    let zanrovi = JSON.parse(podaci);
    odgovor.send(zanrovi);
    odgovor.end();
}



