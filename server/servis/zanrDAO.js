const baza = require("./baza.js");

class ZanrDAO {
    constructor() {
        this.baza = require("./baza.js");
    }

    dajSve = async function () {
        let sql = "SELECT * FROM zanr;"
        var podaci = await this.baza.izvrsiUpit(sql, []);
        return podaci;
    }

    daj = async function (ime) {
        let sql = "SELECT * FROM zanr WHERE ime=?;"
        var podaci = await this.baza.izvrsiUpit(sql, [ime]);
        if (podaci.length == 1)
            return podaci[0];
        else
            return null;
    }

    dodaj = async function (zanr) {
        console.log(zanr)
        let sql = `INSERT INTO zanr (id_zanr, ime) VALUES (?,?)`;
        let podaci = [zanr.id, zanr.ime];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    }

    azuriraj = async function (id_zanr, zanr) {
        let sql = `UPDATE zanr SET ime=? WHERE id_zanr=?`;
        let podaci = [zanr.ime, id_zanr];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    }

    obrisi = async function (ime) {
        let sql = "DELETE FROM zanr WHERE ime=?";
        await this.baza.izvrsiUpit(sql, [ime]);
        return true;
    }

    obrisiNepostojece = async function (ime) {
        let sql = "DELETE FROM zanr WHERE id_zanr NOT IN(SELECT zanr_id_zanr FROM film_zanr)";
        await this.baza.izvrsiUpit(sql, [ime]);
        return true;
    }
}

module.exports = ZanrDAO;