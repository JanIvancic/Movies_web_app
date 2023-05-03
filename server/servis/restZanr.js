const Konfiguracija = require("../konfiguracija.js");
const jwt = require("../aplikacija/moduli/jwt.js");
const ZanrDAO = require("./zanrDAO.js");


exports.getZanrovi = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();
    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    zdao.dajSve().then((zanr) => {
        console.log(zanr);
        odgovor.send(JSON.stringify(zanr));
    });
}


exports.getZanr = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();

    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    let ime = zahtjev.params.ime;
    zdao.daj(ime).then((zanr) => {
        console.log(zanr);
        odgovor.send(JSON.stringify(zanr));
    });
}

exports.postZanr = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();

    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let zdao = new ZanrDAO();
    zdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.putZanr = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();

    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    let podaci = zahtjev.body;
    let id_zanr = zahtjev.params.id_zanr;
    zdao.azuriraj(id_zanr, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.deleteZanr = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();

    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    let ime = zahtjev.params.ime;
    zdao.obrisi(ime).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
exports.deleteZanrSami = async function (zahtjev, odgovor) {
    let konfiguracija = new Konfiguracija();
    await konfiguracija.ucitajKonfiguraciju();

    if (!provjeriJWT(zahtjev, odgovor)) return;
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    let id_zanr = zahtjev.params.id_zanr;
    zdao.obrisiNepostojece(id_zanr).then((poruka) => {
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
