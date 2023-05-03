let baza = require("./baza.js");

class KorisnikDAO {
    constructor() {
        this.baza = require("./baza.js");
    }

    dajSve = async function () {
        let sql = "SELECT * FROM korisnik;"
        var podaci = await this.baza.izvrsiUpit(sql, []);
        return podaci;
    }


	daj = async function (korime) {
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		if (podaci.length == 1)
			return podaci[0];
		else
			return null;
	}

	dodaj = async function (korisnik) {
		console.log(korisnik)
		let sql = `INSERT INTO korisnik (ime,prezime,korime,lozinka,email,tip_korisnika_id) VALUES (?,?,?,?,?,?)`;
		let podaci = [korisnik.ime, korisnik.prezime, korisnik.korime,
		korisnik.lozinka, korisnik.email, 2];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql, [korime]);
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET ime=?, prezime=?, lozinka=?, email=? WHERE korime=?`;
		let podaci = [korisnik.ime, korisnik.prezime,
		korisnik.lozinka, korisnik.email, korime];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	aktiviraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET status=? WHERE korime=?`;
		let podaci = [korisnik.status, korime];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}
}

module.exports = KorisnikDAO;