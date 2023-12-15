import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signupForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  signup() {
    this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password);
  }

}
