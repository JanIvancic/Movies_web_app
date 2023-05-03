const baza = require("./baza.js");

class FilmoviDAO {
    constructor() {
        this.baza = require("./baza.js");
    }
    
    daj = async function (title) {
        let sql = "SELECT * FROM film WHERE genre=?;"
        var podaci = await this.baza.izvrsiUpit(sql, [title]);
        if (podaci.length == 1)
            return podaci[0];
        else
            return null;
    }

    obrisi = async function (title) {
        let sql = "DELETE FROM film WHERE title=?";
        await this.baza.izvrsiUpit(sql, [title]);
        return true;
    }

    azuriraj = async function (title, film) {
        let sql = `UPDATE film SET budget=? WHERE title=?`;
        let podaci = [film.budget, title];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    }


    dajSve = async function () {
        let sql = "SELECT * FROM film;"
        var podaci = await this.baza.izvrsiUpit(sql, []);
        return podaci;
    }

    dajSveFZ = async function () {
        let sql = "SELECT * FROM film_zanr;"
        var podaci = await this.baza.izvrsiUpit(sql, []);
        return podaci;
    }

}

module.exports = FilmoviDAO;