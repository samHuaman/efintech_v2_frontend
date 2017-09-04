import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { smoothlyMenu } from '../../../app.helpers';
import { HttpRequestService } from '../../../services/http-request.service';

declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})

export class TopNavbarComponent {

  constructor(private http: HttpRequestService,
              private router: Router) {

  }

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  logout() {
    console.log('Logout...........................');
    return this.http.get('http://localhost:8080/logout')
            .subscribe(
              data => {
                console.log(data);
                
                localStorage.removeItem('currentUser');
                this.router.navigate(['/login']);
              },
              error => console.log(error)
            );
  }

}
