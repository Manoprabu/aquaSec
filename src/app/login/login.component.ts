import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import loginData from './../login-credentials.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup = new FormGroup({
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        "email": ['', [Validators.required, Validators.email]],
        "password": ['', [Validators.required]]
    });
  }

  onSubmit() {
    if(this.loginForm.value.email == loginData.email && this.loginForm.value.password == loginData.password) { 
      this.router.navigate(['/address']);
    }
  }

}
