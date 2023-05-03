let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('baza.sqlite');

exports.izvrsiUpit = function(sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (greska, rezultat) => {
            if (greska) {
                reject(greska);
            } else {
                resolve(rezultat);
            }
        });
    });
}