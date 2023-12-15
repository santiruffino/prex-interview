import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {VerifyEmailComponent} from "./verify-email/verify-email.component";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {environment} from "../environments/environment";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {WelcomeComponent} from "./welcome/welcome.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, VerifyEmailComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
