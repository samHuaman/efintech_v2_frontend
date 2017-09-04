import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class BasicAuthGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        /* let returnUrl = route.url[0].path; */

        this.router.navigate(['/login']);
        return false;
    }
}