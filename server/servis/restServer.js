const konst = require("../konstante.js");
const express = require(konst.dirModula + 'express');
const Konfiguracija = require("../konfiguracija.js");
const restKorisnik = require("./restKorisnik.js");
const restFilm = require("./restFilm.js");
const restZanr = require("./restZanr.js");
const fsPromise = require("fs/promises");
const RestTMDB = require("./restTMDB.js");
const server = express();

function pokreniServer() {
    let konf = new Konfiguracija();
    let rest;
    konf.ucitajKonfiguraciju().then(() => {
        rest = konf.dohvatiREST();
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        postaviRestKorisnici();
        postaviRestKorisnici();
        postaviRestFilmovi();

        console.log(rest);
        server.use((zahtjev, odgovor) => {
            odgovor.status(404);
            var poruka = { greska: "Stranica nije pronadena!" };

            odgovor.send(JSON.stringify(poruka));
        });
        server.listen(rest, () => {
            console.log(`Server pokrenut na portu: ${rest}`);
        });
    });
}



let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    console.error(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()

});


function pripremiPutanjeResursTMDB() {
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
    server.post("/api/tmdb/zanr", restZanr.greska501);
    server.put("/api/tmdb/zanr", restZanr.greska501);
    server.delete("/api/tmdb/zanr", restZanr.greska501);

    server.get("/api/tmdb/filmovi", restTMDB.getFilmovi.bind(restTMDB));
    server.post("/api/tmdb/filmovi", restZanr.greska501);
    server.put("/api/tmdb/filmovi", restZanr.greska501);
    server.delete("/api/tmdb/filmovi", restZanr.greska501);
}

function postaviRestKorisnici() {
    server.get("/api/korisnici", restKorisnik.getKorisnici);
    server.post("/api/korisnici", restKorisnik.postKorisnici);
    server.put("/api/korisnici", restKorisnik.greska501);
    server.delete("/api/korisnici", restKorisnik.greska501);

    server.get("/api/korisnici/:korime", restKorisnik.getKorisnik);
    server.post("/api/korisnici/:korime", restKorisnik.greska);
    server.put("/api/korisnici/:korime", restKorisnik.putKorisnik);
    server.delete("/api/korisnici/:korime", restKorisnik.greska501);

    server.get("/api/korisnici/:korime/aktivacija", restKorisnik.greska501);
    server.put("/api/korisnici/:korime/aktiviraj", restKorisnik.aktivirajKorisnik);
    server.post("/api/korisnici/:korime/aktivacija", restKorisnik.greska);
    server.delete("/api/korisnici/:korime/aktivacija", restKorisnik.greska501);

    server.get("/api/korisnici/:korime/prijava", restKorisnik.greska501);
    server.post("/api/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava);
    server.put("/api/korisnici/:korime/prijava", restKorisnik.greska501);
    server.delete("/api/korisnici/:korime/prijava", restKorisnik.greska501);

    server.get("api/filmovi/?stranica=broj&brojFilmova=broj[&datum=datum][&zanr=idZanr][&naziv=dioNazivFilma][&sortiraj=[d | z | n]]", restKorisnik.greska501);
    server.post("api/filmovi/?stranica=broj&brojFilmova=broj[&datum=datum][&zanr=idZanr][&naziv=dioNazivFilma][&sortiraj=[d | z | n]]", restKorisnik.greska501);
    server.put("api/filmovi/?stranica=broj&brojFilmova=broj[&datum=datum][&zanr=idZanr][&naziv=dioNazivFilma][&sortiraj=[d | z | n]]", restKorisnik.greska501);
    server.delete("api/filmovi/?stranica=broj&brojFilmova=broj[&datum=datum][&zanr=idZanr][&naziv=dioNazivFilma][&sortiraj=[d | z | n]]", restKorisnik.greska501);
}

function postaviRestFilmovi() {
    server.get("/api/filmovi/:title", restFilm.getFilm);
    server.post("/api/filmovi/:title", restFilm.greska);
    server.put("/api/filmovi/:title", restFilm.putFilm);
    server.delete("/api/filmovi/:title", restFilm.deleteFilm);
    
    server.get("/api/sviFilmovi", restFilm.getFilmovi);
    server.get("/api/dohvatiSveFilmZanrove", restFilm.getFilmZanrove);

    server.get("/api/zanr", restZanr.getZanrovi);
    server.post("/api/zanr", restZanr.postZanr);
    server.put("/api/zanr", restZanr.greska501);
    server.delete("/api/zanr",restZanr.deleteZanrSami);

    server.get("/api/zanr/:ime", restZanr.getZanr);
    server.put("/api/zanr", restZanr.greska501);
    server.put("/api/zanr/:id_zanr", restZanr.putZanr);
    server.delete("/api/zanr/:ime", restZanr.deleteZanr);
}

