const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js")
const Autentifikacija = require("./autentifikacija.js");
const { log } = require("console");
const url = "http://localhost:";
const Konfiguracija = require("../konfiguracija.js");
let auth = new Autentifikacija();

exports.pocetna = async function (zahtjev, odgovor) {
    let pocetna = await ucitajStranicu("pocetna")
    odgovor.send(pocetna);
}

exports.registracija = async function (zahtjev, odgovor) {
    console.log(zahtjev.body)
    let greska = "";
    if (zahtjev.method == "POST") {
        let uspjeh = await auth.dodajKorisnika(zahtjev.body);
        if (uspjeh) {
            odgovor.send({
                uspjesno: true,
            })
            return;
        } else {
            greska = "Dodavanje nije uspjelo provjerite podatke!";
            odgovor.send({
                uspjesno: false,
                greska: greska,
            })
        }
    }
}


exports.odjava = async function (zahtjev, odgovor) {
    zahtjev.session.korisnik = null;
    odgovor.redirect("/");
};

exports.prijava = async function (zahtjev, odgovor) {
    let greska = ""
    if (zahtjev.method == "POST") {
        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;
        var korisnik = await auth.prijaviKorisnika(korime, lozinka);

        if (korisnik) {
            zahtjev.session.jwt = jwt.kreirajToken(korisnik)
            zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
            console.log('prije setanja', korime);
            zahtjev.session.korime = korime
            console.log('nakon prijave', zahtjev.session.korime);

            odgovor.send({
                uspjesno: true,
            })
            return;
        } else {
            greska = "pogresni podaci!";
            odgovor.send({
                uspjesno: false,
                greska: greska,
            })
        }
    }
}

exports.prijavljen = async function (zahtjev, odgovor) {
    console.log('provjera prijave', zahtjev.session.korime);
    if (zahtjev.session.korime) {
        odgovor.send({ prijavljen: true });
    }
    else {
        odgovor.send({ prijavljen: false });
    }
}

exports.uzmiKorisnika = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    let konfig = konfiguracija.dajKonf();
    let restPort = konfiguracija.dohvatiREST();

    console.log('uzmi korisnika pozvan');
    let korime = zahtjev.session.korime
    let odg = await fetch(`${url}${restPort}/api/korisnici/${korime}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt.kreirajToken(korime)
        }
    });
    let podaci = await odg.text();
    console.log('podaci iz resta dobiveni o korisniku', podaci);
    odgovor.send(podaci);

}

exports.odjava = async function (zahtjev, odgovor) {
    console.log('odjava pozvana');
    zahtjev.session.korime = undefined;
    odgovor.send(true);
}


exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_pretrazivanje");
    odgovor.send(stranica);
}

async function ucitajStranicu(nazivStranice, poruka = "") {
    let stranice = [ucitajHTML(nazivStranice),
    ucitajHTML("navigacija")];
    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", poruka)
    return stranica;
}

function ucitajHTML(htmlStranica) {
    return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}

