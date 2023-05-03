let { Database} = require('/usr/lib/node_modules/sqlite3');

const db = new Database('baza.sqlite');

db.get("SELECT time('now') as vrijeme", (greska, rez) => {
    console.log(rez);
    console.log(greska);
})

function ispis(){
    db.all("SELECT * FROM korisnik", (greska, rez) => {
        console.log(rez);
        console.log(greska);
    })
}

ispis();