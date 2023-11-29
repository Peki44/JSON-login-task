import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'HERE_GOES_CLIENT_ID.apps.googleusercontent.com'
      });
    });
  }

  login() {
    // const hardcodedUsername = 'user';
    // const hardcodedPassword = 'pass';

    // const enteredUsername = this.username;
    // const enteredPassword = this.password;

    if (this.username.trim() !== '' && this.password.trim() !== '') {
      this.router.navigate(['/data-table']);
    }else {
      alert('Invalid username or password. Please try again.');
    }
  }
  loginWithGoogle() {
    const auth2 = gapi.auth2.getAuthInstance();

    auth2.signIn().then((user: { getBasicProfile: () => any; }) => {
      const profile = user.getBasicProfile();
      console.log('ID: ' + profile.getId()); 
      console.log('Name: ' + profile.getName()); 
      console.log('Email: ' + profile.getEmail()); 

      this.router.navigate(['/data-table']);
    });
  }
}
