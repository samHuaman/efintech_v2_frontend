import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {OnInit} from '@angular/core';

import 'jquery-slimscroll';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements OnInit {

  Username: string;

  constructor(private router: Router) {

  }

  ngOnInit() {
    let currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
      this.Username = JSON.parse(currentUser).name;
      this.Username = this.Username.toUpperCase();
    }
  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }


}
