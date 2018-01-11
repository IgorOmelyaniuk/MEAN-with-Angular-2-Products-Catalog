import { Component } from '@angular/core';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username: String;
    password: String;

    constructor(
      private flashMessagesService: FlashMessagesService,
      private authService: AuthenticationService,
      private router: Router
    ) { }

    onLoginSubmit(data: User) {
      const user = {
        username: data.username,
        password: data.password
      };
      this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.flashMessagesService.show('Вход выполнен', {
            classes: ['alert-success'],
            timeout: 3000});
            this.router.navigate(['']);
        } else {
          this.flashMessagesService.show(data.msg, {
            classes: ['alert-danger'],
            timeout: 3000});
          this.router.navigate(['/login']);
        }
      });
    }

}
