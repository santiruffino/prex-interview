import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Movie} from "../interfaces/movie";
import {MovieService} from "../services/movie.service";
import {IonModal} from "@ionic/angular";
import {OverlayEventDetail} from '@ionic/core/components';
import {AuthenticationService} from "../services/authentication.service";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;
  public movieForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    thumbnailUrl: [null, Validators.required],
    rating: [null, Validators.required],
  });
  moviesList!: Movie[]

  public data: Movie[] = [];
  public actionSheetButtons = [
    {
      text: 'Sign Out',
      role: 'destructive',
      handler: () => this.signOut()
    },
    {
      text: 'Cancel',
      role: 'cancel',
    }
  ];

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.moviesList = this.data.filter((d: any) => d.title.toLowerCase().indexOf(query) > -1);
  }

  pinFormatter(value: number) {
    return `${value}⭐️`;
  }

  constructor(
    private fb: FormBuilder,
    public movieService: MovieService,
    private authService: AuthenticationService
  ) {
    this.moviesList = this.movieService.getMovies();
    this.data = this.moviesList;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  submitMovie() {
    this.movieService.addMovie(this.movieForm.value);
    this.modal.dismiss(null, 'cancel');
  }

  deleteMovie(movie: Movie) {
    this.movieService.deleteMovie(movie);
  }

  signOut() {
    this.authService.signOut();
  }


}
