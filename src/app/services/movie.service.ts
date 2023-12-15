import {Injectable} from '@angular/core';
import {Movie} from "../interfaces/movie";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesList: Movie[];
  private defaultMovieList: Movie[] = [
    {
      id: 1,
      title: 'Iron Man',
      description: 'Tony Stark es un inventor de armamento brillante que es secuestrado en el extranjero. Sus captores son unos terroristas que le obligan a construir una máquina destructiva pero Tony se construirá una armadura para poder enfrentarse a ellos y escapar.',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg',
      rating: 4
    }
  ];
  readonly movieListStorageKey = 'MovieList';


  constructor(
    private storageService: StorageService
  ) {
    this.moviesList = storageService.getData(this.movieListStorageKey) || this.defaultMovieList;
  }

  getMovies() {
    return this.moviesList;
  }

  getMovie(id: number) {
    return this.moviesList.find((element) => element.id === id);
  }

  addMovie(movie: Movie) {
    this.setMovieId(movie);
    this.moviesList.push(movie);
    this.saveList();
  }

  setMovieId(movie: Movie) {
    const moviesList = this.storageService.getData(this.movieListStorageKey);
    const lastMovie = moviesList.slice(-1);
    if (lastMovie.length === 0) {
      movie.id = 1
    } else {
      movie.id = lastMovie[0].id + 1
    }
  }

  updateMovie(movie: Movie, changes: any) {
    const index = this.moviesList.indexOf(movie);
    this.moviesList[index] = {...movie, ...changes};
    this.saveList();
  }

  deleteMovie(movie: Movie) {
    const index = this.moviesList.indexOf(movie);
    this.moviesList.splice(index, 1);
    this.saveList();
  }

  saveList() {
    this.storageService.setData(this.movieListStorageKey, this.moviesList);
  }
}
