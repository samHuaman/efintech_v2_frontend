import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms'
import { Select2Module } from 'ng2-select2';
import { RouterModule } from '@angular/router';

import { CuentaComponent } from './cuenta.component';
import { ClienteComponent } from './cliente.component';
import {ClienteDetalleComponent } from './cliente-detalle.component';

@NgModule({
    declarations: [
        CuentaComponent,
        ClienteComponent,
        ClienteDetalleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        Select2Module,
        RouterModule
        
    ],
    exports: [
        CuentaComponent,
        ClienteComponent,
        ClienteDetalleComponent
    ]
})

export class ClientesModule {

}