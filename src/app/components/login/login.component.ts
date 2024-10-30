import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  response = "";
  loginError: string | null = null; 

  constructor(private authService: AuthService) {}  

  //validators for requires data inside the form
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  //manage login script in authservice, check if it is succesfull or not and give a reponse back in page
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        res => {
          console.log(res);
          
          if (res.success) {
            this.response = res;
            this.loginError = null;  
          } else {
            this.loginError = "Email or password is incorrect.";  
          }
        },
        err => {
          console.log(err);
          this.loginError = "Something went wrong. Please try again.";  
        }
      );
    } else {
      this.loginError = "Please fill out the form correctly."; 
    }
  }
}
