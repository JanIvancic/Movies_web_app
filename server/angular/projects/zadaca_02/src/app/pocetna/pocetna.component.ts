import { Component, OnInit } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { OdjavaService } from '../odjava.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit {
  genres: any[] = [];
  filmsByGenre: any[] = [];

  constructor(private odjavaServis: OdjavaService) { }

  async displayFilmsByGenre(): Promise<void> {
    const genresResponse = await fetch(`${environment.URL}/dohvatiSveZanrove`);
    const genresData = await genresResponse.text();
    this.genres = JSON.parse(genresData);

    const filmGenresResponse = await fetch(`${environment.URL}/dohvatiSveFilmZanrove`);
    const filmGenresData = await filmGenresResponse.text();
    const filmGenres = JSON.parse(filmGenresData);

    const filmsResponse = await fetch(`${environment.URL}/dohvatiSveFilmove`);
    const filmsData = await filmsResponse.text();
    const films = JSON.parse(filmsData);

    for (const genre of this.genres) {
      const genreFilmGenres = filmGenres.filter(fg => fg.zanr_id_zanr === genre.id_zanr);
      const randomFilmGenres = this.getRandomElements(genreFilmGenres, 2);

      this.filmsByGenre.push({
        genre: genre.ime,
        films: randomFilmGenres.map(gfg => films.find(f => f.id_movie === gfg.film_id_film))
      });
    }
  }

  getRandomElements(arr: any[], n: number) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  ngOnInit() {
    this.displayFilmsByGenre();
  }

  public odjava() {
    this.odjavaServis.odjaviSe();
  }
}
