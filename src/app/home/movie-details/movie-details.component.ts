import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {Movie} from "../../interfaces/movie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OverlayEventDetail} from "@ionic/core/components";
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  private id!: number;
  public movie!: Movie;
  public movieForm!: FormGroup;
  public movieRating!: number;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => this.deleteMovie()
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel'
      }
    }
  ];

  pinFormatter(value: number) {
    return `${value}⭐️`;
  }

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.movie = this.movieService.getMovie(this.id)!;
      if (this.movie === null) {
        this.router.navigate(['home']);
      }
      this.movieRating = this.movie.rating;
      this.buildMovieForm();
    })
  }

  buildMovieForm() {
    this.movieForm = this.fb.group({
      title: [this.movie.title, Validators.required],
      description: [this.movie.description, Validators.required],
      thumbnailUrl: [this.movie.thumbnailUrl, Validators.required],
      rating: [this.movie.rating, Validators.required],
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  submitMovieChanges() {
    this.movieService.updateMovie(this.movie, this.movieForm.value);
    this.modal.dismiss(null, 'cancel');
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.movie)
    this.router.navigate(['home']);
  }


}
