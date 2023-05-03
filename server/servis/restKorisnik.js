const KorisnikDAO = require("./korisnikDAO.js");
const Konfiguracija = require("../konfiguracija.js");
const jwt = require("../aplikacija/moduli/jwt.js");


exports.getKorisnici = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    kdao.dajSve().then((korisnici) => {
        console.log(korisnici);
        odgovor.send(JSON.stringify(korisnici));
    });
}

exports.postKorisnici = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.getKorisnik = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    let korime = zahtjev.params.korime;
    kdao.daj(korime).then((korisnik) => {
        console.log(korisnik);
        odgovor.send(JSON.stringify(korisnik));
    });
}

exports.getKorisnikPrijava = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    let korime = zahtjev.params.korime;
    kdao.daj(korime).then((korisnik) => {
        console.log(korisnik)
        console.log(zahtjev.params)
        if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka)
            odgovor.send(JSON.stringify(korisnik));
        else {
            odgovor.status(401)
            odgovor.send(JSON.stringify({ greska: "Krivi podaci!" }))
        }
    });
}

exports.deleteKorisnik = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnik = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let korime = zahtjev.params.korime;
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.azuriraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.aktivirajKorisnik = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let korime = zahtjev.params.korime;
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.aktiviraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.greska = async function (zahtjev,odgovor){
    odgovor.type("application/json")
    odgovor.status(405);
    let odg={greska:"Metoda nije dopustena!"}
    odgovor.send(JSON.stringify(poruka));
}

exports.greska501 = async function (zahtjev,odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let odg={greska:"Metoda nije dopustena!"}
    odgovor.send(JSON.stringify(poruka));
}

provjeriJWT = function (zahtjev, odgovor) {
    if (!jwt.provjeriToken(zahtjev)) {
        odgovor.status(401);
        return false;
    }
    return true;
}