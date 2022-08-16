/**
 * Modify this file to fetch and display the login details
 */
 import { Component, OnInit } from '@angular/core'
 import { Router } from '@angular/router';
 import { AuthenticationService } from '../services/authentication.service';
 import { UserService } from '../services/user.service';
 
 @Component({
   selector: 'app-welcome',
   templateUrl: './welcome.component.html',
   styleUrls: ['./welcome.component.css'],
 })
 export class WelcomeComponent implements OnInit {
   user; // type this variable using user.type.ts file
   LoadingData = 'Load...';
   constructor(private userService: UserService, private router: Router,private authenticationService: AuthenticationService) {}
 
   ngOnInit() {
     this.userService.getUser().subscribe(
       (data) => {
         this.LoadingData = '';
         this.user = data;
       },
       (err: Error) => {
         this.LoadingData = err.message;
       }
     );
   }
 
   logout() {
     this.authenticationService.clearAuthData();
     this.router.navigate(['']);
   }
 
   ngOnDestroy() {}
 }
 