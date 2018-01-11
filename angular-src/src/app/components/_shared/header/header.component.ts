import { Component, DoCheck } from '@angular/core';
import { User } from '../../../models/User';
import { AuthenticationService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {

    currentUser: Object = {
      username: ''
    };

    constructor(
      private authService: AuthenticationService,
      private router: Router
    ) {}

    ngDoCheck() {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    onLogoutClick() {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }

}
