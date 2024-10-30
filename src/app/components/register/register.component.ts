import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  response = "";  
  error = "";    

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repass: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const regData = this.registerForm.value;
  
      this.authService.registerUser(regData).subscribe(
        res => {
          if (res.error) {
            this.error = res.error;  // Mostra l'errore restituito dal server
            this.response = "";
          } else {
            this.response = res.message || "Registration successful!"; 
            this.error = ""; 
          }
        },
        err => {
          this.error = "Error during registration. Please try again.";
          this.response = "";
      }
      );
    } else {
          this.error = "Please fill out the form correctly.";
          this.response = "";
    }
  }
      
}
