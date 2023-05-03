const konst = require("../konstante.js");
const express = require(konst.dirModula + 'express');
const sesija = require(konst.dirModula + 'express-session')
const kolacici = require(konst.dirModula + 'cookie-parser')
const Konfiguracija = require("../konfiguracija.js");
const filmoviZanroviPretrazivanje = require("./filmoviPretrazivanje.js");
const autententifikacija=require("./autentifikacija.js");
const htmlUpravitelj=require("./htmlUpravitelj.js");
const server = express();
server.use("/", express.static("../server/aplikacija/angular"));


function pokreniServer() {
  let konf = new Konfiguracija();
  konf.ucitajKonfiguraciju().then(() => {
    let app = konf.dohvatiAPP();
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(kolacici())
    server.use(sesija({
      secret: konst.tajniKljucSesija,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 3 },
      resave: false
    }));

    pripremiPutanjePocetna();

    server.use("/js", express.static(__dirname + "/js"));
    server.use((zahtjev, odgovor) => {
      odgovor.status(404);
      var poruka = { greska: "Stranica nije pronadena!" };
      odgovor.send(JSON.stringify(poruka));
    });

    server.listen(app, () => {
      console.log(`Server pokrenut na portu: ${app}`);
    });
  });
}


let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguce otvoriti datoteku: " + greska.path);
    process.exit()
});

function pripremiPutanjePocetna() {
    server.get('/dohvatiSveZanrove', filmoviZanroviPretrazivanje.dohvatiSveZanrove);
    server.get('/dohvatiSveFilmove', filmoviZanroviPretrazivanje.dohvatiSveFilmove);
    server.get('/dohvatiSveFilmZanrove', filmoviZanroviPretrazivanje.dohvatiSveFilmZanrove);

    server.post("/registracija", htmlUpravitelj.registracija);
    server.post("/prijava", htmlUpravitelj.prijava);
    server.get("/prijavljen",htmlUpravitelj.prijavljen);
    server.get('/uzmiKorisnika', htmlUpravitelj.uzmiKorisnika)
    server.get('/odjava', htmlUpravitelj.odjava)
}
