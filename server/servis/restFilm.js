const Konfiguracija = require("../konfiguracija.js");
const jwt = require("../aplikacija/moduli/jwt.js");
const FilmoviDAO = require("./filmoviDAO.js");


exports.getFilm = async function (zahtjev, odgovor) {
  let konfiguracija = new Konfiguracija();
  await konfiguracija.ucitajKonfiguraciju();
  if (!provjeriJWT(zahtjev, odgovor)) return;
  odgovor.type("application/json");
  let fdao = new filmoviDAO();
  let title = zahtjev.params.title;
  fdao.daj(title)
    .then((film) => {
      console.log(film);
      odgovor.send(JSON.stringify(film));
    })
    .catch((error) => {
      odgovor.send(
        JSON.stringify({
          greska: "Stranica nije pronadena!",
        })
      );
    });
};


exports.getFilmZanrove = async function (zahtjev, odgovor) {
  let konfiguracija = new Konfiguracija();
  await konfiguracija.ucitajKonfiguraciju();
  if (!provjeriJWT(zahtjev, odgovor)) return;
  odgovor.type("application/json")
  let fdao = new FilmoviDAO();
  fdao.dajSveFZ().then((filmZ) => {
    console.log(filmZ);
    odgovor.send(JSON.stringify(filmZ));
  });
}


exports.getFilmovi = async function (zahtjev, odgovor) {
  let konfiguracija = new Konfiguracija();
  await konfiguracija.ucitajKonfiguraciju();
  if (!provjeriJWT(zahtjev, odgovor)) return;
  odgovor.type("application/json")
  let fdao = new FilmoviDAO();
  fdao.dajSve().then((film) => {
    console.log(film);
    odgovor.send(JSON.stringify(film));
  });
}


exports.deleteFilm = async function (zahtjev, odgovor) {
  let konfiguracija = new Konfiguracija();
  await konfiguracija.ucitajKonfiguraciju();
  if (!provjeriJWT(zahtjev, odgovor)) return;
  odgovor.type("application/json")
  let fdao = new filmoviDAO();
  let title = zahtjev.params.title;
  fdao.obrisi(title).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
}

exports.putFilm = async function (zahtjev, odgovor) {
  let konfiguracija = new Konfiguracija();
  await konfiguracija.ucitajKonfiguraciju();
  if (!provjeriJWT(zahtjev, odgovor)) return;
  odgovor.type("application/json")
  let fdao = new filmoviDAO();
  let podaci = zahtjev.body;
  let title = zahtjev.params.title;
  fdao.azuriraj(title, podaci).then((poruka) => {
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