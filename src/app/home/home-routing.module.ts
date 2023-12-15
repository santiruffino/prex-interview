import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    component: MovieDetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
}
