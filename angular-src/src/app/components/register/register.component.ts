import { Component } from '@angular/core';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    username: String;
    email: String;
    password: String;

    constructor(
        private flashMessages: FlashMessagesService,
        private authService: AuthenticationService,
        private router: Router
    ) { }

    onRegisterSubmit(data: User) {
        const user = {
            username: data.username,
            email: data.email,
            password: data.password
        };

        // Register User
        this.authService.registerUser(user).subscribe(data => {
            if (data.success) {
                this.flashMessages.show(data.msg, {classes: ['alert-success'], timeout: 3000});
                this.router.navigate(['/login']);
            } else {
                this.flashMessages.show(data.msg, {classes: ['alert-danger'], timeout: 3000});
                this.router.navigate(['/register']);
            }
        });
    }

}
