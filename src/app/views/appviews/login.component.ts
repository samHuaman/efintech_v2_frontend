import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})

export class LoginComponent implements OnInit {

  Username: string;
  Password: string;

  LoginForm: FormGroup;
  LoginError: string;

  private sub: any;

  constructor(private router: Router,
              private http: Http,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    this.LoginForm = formBuilder.group({
      'Username': [null, Validators.required],
      'Password': [null, Validators.required]
    });
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    /* let returnUrl: string;
    
    this.sub = this.activatedRoute.params.subscribe(params => {
      returnUrl = params['returnUrl'];
    }); */

    if (currentUser) {
      /* if (returnUrl || returnUrl != '') {
        this.router.navigate([returnUrl]);
      } */
      this.router.navigate(['/']);
    }
  }

  postLogin() {
    if (this.Username != null && this.Password != null) {
      let data = new URLSearchParams();
      data.append('username', this.Username);
      data.append('password', this.Password);

      return this.http.post('http://localhost:8080/login', data, { withCredentials: true })
                 .catch(error => {
                  if (error.status === 401 || error.status === 503) {
                    this.LoginError = 'Contraseña incorrecta';
                    console.log('Failed attempt. ' + error.status);

                    this.Password = '';

                    return Observable.throw(error);
                  }
                  else if (error.status === 400) {
                    this.LoginError = 'Usuario no encontrado';
                    console.log('Failed attempt. ' + error.status);

                    this.Password = '';

                    return Observable.throw(error);
                  }
                  else if (error.status === 412) {
                    this.LoginError = 'El usuario está bloqueado por 30 minutos. Comuníquese con el Administrador';
                    console.log('Failed attempt. ' + error.status);

                    this.Password = '';

                    return Observable.throw(error);
                  }
                  else if (error.status === 302) {
                    this.LoginError = 'La contraseña ha expirado. Cambie su contraseña';
                    console.log('Failed attempt. ' + error.status);

                    this.Password = '';

                    return Observable.throw(error);
                  }
                  else if (error.status === 410) {
                    this.LoginError = 'Su cuenta ha expirado. Comuníquese con el Administrador';
                    console.log('Failed attempt. ' + error.status);

                    this.Password = '';

                    return Observable.throw(error);
                  }
                  else if (error.status === 301) {
                    this.LoginError = 'Su usuario está deshabilitado';
                    console.log('Failed attempt. ' + error.status);

                    this.Password = '';

                    return Observable.throw(error);
                  }
                  else {
                    this.Password = '';
                    return Observable.throw(error);
                  }
                })
                .subscribe(data => {
                  localStorage.setItem('currentUser', JSON.stringify({ name: this.Username }));
                  this.router.navigate(['/']);
                });
    }
  }

}
