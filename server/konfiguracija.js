const fsPromise = require("fs/promises");
const { exit } = require("process");

class Konfiguracija {
    constructor() {
        this.konf = {};
    }
    dajKonf() {
        return this.konf;
    }

    async ucitajKonfiguraciju() {
        console.log(this.konf)
        var podaci = await fsPromise.readFile(process.argv[2], "UTF-8");
        this.konf = this.pretvoriJSONkonfig(podaci);
    }
    pretvoriJSONkonfig(podaci) {
        let konf = {};
        var nizPodataka = podaci.split("\n");
        for (let podatak of nizPodataka) {
            var podatakNiz = podatak.split("=");
            var naziv = podatakNiz[0];
            var vrijednost = podatakNiz[1];
            konf[naziv] = vrijednost;
        }
        return konf;
    }
    testKorime(korime) {
        const re = new RegExp(/(?=(.*[0-9]){2})(?=(.*[a-zA-Z]){2}).{15,20}/)
        if (re.test(konf["rest.korime"]) == false) {
            console.error("Neispravno korisnicko ime");
            return false;
        }
        else {
            return true;
        }
    }

    testLozinka(lozinka) {
        const re = new RegExp(/(?=(.*[0-9]){3})(?=(.*[a-zA-Z]){3}(?=(.*[@#$%^&+=]){3})).{20,100}/)
        if (re.test(konf["rest.lozinka"]) == false) {
            console.error("Neispravna lozinka");
            return false;
        }
        else {
            return true;
        }
    }

    dohvatiREST(){
        return this.konf["rest.port"];
    }
    dohvatiAPP(){
        return this.konf["app.port"];
    }
}
module.exports = Konfiguracija;
