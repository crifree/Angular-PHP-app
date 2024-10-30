import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  tasks: { text: string, checked: boolean }[] = [];
  doneTasks: { text: string, checked: boolean }[] = [];
  toastDone = [
    "Great!",
    "Good job =)",
    "Teach me to be so good plsss!!"
  ];
  toastTodo = [
    "Don't give up!",
    "Try it later :-)",
    "no worries!"
  ];
  index = 0;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    this.loadTasksFromLocalStorage(); 
  }

  ngOnInit(): void {

    //check if user is logged in
    this.isLoggedIn = this.authService.isLoggedIn(); 
    if (!this.isLoggedIn) {
      //this.router.navigate(['/login']);
    } else {
      console.log('benvenuto!');
      setTimeout(() => {
        let t = document.getElementById('toast');
        t!.style.backgroundColor = 'blueviolet';
        t!.style.color = 'white';
        this.showToast('Welcome inside :-)', 3500); 
      }, 1000);
    }
  }

  addTask() {
    const newTask = {
      text: '', 
      checked: false
    };
    
    this.tasks.push(newTask);
    this.saveTasksToLocalStorage();
  }
  

  //when a task is checked it moves to donetasks array or todo array
  onCheck(task: { text: string, checked: boolean }, index: number) {
    if (task.checked) {
      console.log(`Task completed: ${task.text}`);
      this.tasks.splice(index, 1);
      this.doneTasks.push(task); 
      this.toastDoneAnimation();
    } else {
      console.log(`Task incompleted: ${task.text}`);
      this.doneTasks.splice(index, 1);
      this.tasks.push(task); 
      this.toastTodoAnimation();
    }
    this.saveTasksToLocalStorage(); 
  }

  clearDoneTasks() {
    this.doneTasks = [];
    console.log("all tasks have been deleted");
    this.saveTasksToLocalStorage(); 
  }


  //move more than 1 task to donetask array
  moveAllToDone() {
    if(this.tasks.length > 1) {
      this.tasks.forEach(task => task.checked = true);
      this.doneTasks.push(...this.tasks);
      this.tasks = [];
      this.saveTasksToLocalStorage();

      setTimeout(() => {
        let t = document.getElementById('toast');
        t!.style.backgroundColor = 'greenyellow';
        this.showToast('HUUUUUUUGEEEEEE!!!', 3000); 
      }, 1000);
    }
  }

  //move more than 1 task to todo array
  moveAllToTasks() {
    if(this.doneTasks.length > 1) {
      const uncompletedTasks = this.doneTasks.map(task => ({
        ...task,
        checked: false
      }));
      this.tasks.push(...uncompletedTasks);
      this.doneTasks = [];
      this.saveTasksToLocalStorage();
  
      setTimeout(() => {
        let t = document.getElementById('toast');
        t!.style.backgroundColor = ' rgb(255, 166, 0)';
        this.showToast('IMPROOOOVE!!!', 3000); 
      }, 1000);
    }
  }

  //save all tasks and done tasks to localStorage
  saveTasksToLocalStorage() {
    const userId = localStorage.getItem('userId'); 
    console.log(userId);
    
    if (!userId) {
      console.error('Error: no logged user. Impossible to save tasks.');
      return; 
    }
    
   const validDoneTasks = this.doneTasks.filter(task => task.text.trim() !== '');
    
    const data = {
      tasks: this.tasks,
      doneTasks: validDoneTasks
    };
    
    localStorage.setItem(`taskData_${userId}`, JSON.stringify(data));
  }

  //load tasks and donetasks from localstorage
  loadTasksFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const userId = localStorage.getItem('userId'); 
      if (userId) {
        const savedData = localStorage.getItem(`taskData_${userId}`); 
        
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          this.tasks = parsedData.tasks || [];
          this.doneTasks = parsedData.doneTasks || [];
        }
      }
    }
  }
  
  //show a toast message
  showToast(message: string, duration: number) {
    let toast = document.getElementById('toast');
    
    if (toast) {
      toast.textContent = message;
      toast.style.display = 'block';
      
      setTimeout(() => {
        toast!.style.display = 'none';
      }, duration);
    }
  }

  toastDoneAnimation() {
    setTimeout(() => {
      this.showToast(this.toastDone[this.index], 3000);
      let t = document.getElementById('toast');
      t!.style.backgroundColor = 'greenyellow';
      
      this.index++;
      if (this.index >= this.toastDone.length) {
        this.index = 0;
      }
    }, 500);
  }

  toastTodoAnimation() {
    setTimeout(() => {
      this.showToast(this.toastTodo[this.index], 3000);
      let t = document.getElementById('toast');
      t!.style.backgroundColor = ' rgb(255, 166, 0)';
      
      this.index++;
      if (this.index >= this.toastTodo.length) {
        this.index = 0;
      }
    }, 500);
  }
}
