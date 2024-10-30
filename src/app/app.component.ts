import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      console.log('Login status:', this.isLoggedIn);
    });


    if (typeof window !== 'undefined') {
      // Aggiungi un event listener per il resize dello schermo
      window.addEventListener('resize', this.handleResize.bind(this));
      this.handleResize(); // Controlla subito la dimensione al caricamento
    }
  }
  
  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userId');
      this.isLoggedIn = false; 
      this.router.navigate(['/login']); 
      console.log('Login status:', this.isLoggedIn); 

      setTimeout(() => {
        let t = document.getElementById('toast');
        if (t) {
          t.style.backgroundColor = 'blueviolet';
          t.style.color = 'white';
          this.showToast('See you later!', 3500); 
        }
      }, 500);
    }
  }
  
  //logout message
  showToast(message: string, duration: number) {
    let toast = document.getElementById('toast');
    
    if (toast) {
      toast.textContent = message;
      toast.style.display = 'flex';
      
      setTimeout(() => {
        toast!.style.display = 'none';
      }, duration);
    }
  }
  
  handleResize() {
    if (typeof window !== 'undefined') {
      const links = document.getElementsByClassName('links');
      if (window.innerWidth > 576) {
        (links[0] as HTMLElement).style.display = 'flex';
      } else {
        (links[0] as HTMLElement).style.display = 'none';
      }
    }
  }
  
  MouseLeave() {
    if (window.innerWidth < 576) {
      const links = document.getElementsByClassName('links');
      (links[0] as HTMLElement).style.display = 'none';
    }
  }
  
  MouseEnter() {
    if (window.innerWidth < 576) {
      const links = document.getElementsByClassName('links');
      (links[0] as HTMLElement).style.display = 'flex';
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize.bind(this));
    }
  }
}
