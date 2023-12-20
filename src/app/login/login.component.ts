import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  public loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {}

  login() {
    this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        this.router.navigate(['home'])
      })
      .catch((error) =>{
        window.alert(error.message)
      })
  }

}
