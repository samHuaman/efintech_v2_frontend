import { Component, OnInit } from "@angular/core";
import { Input, Output } from '@angular/core';

@Component({
    selector: 'cuenta',
    templateUrl: 'cuenta.component.html'
})

export class CuentaComponent implements OnInit {

    @Input() cliente_id:any;

    public cuentaURL: string;
    public cuentaColumns:any[] = [];
    public cuentaSelected:any;

    ngOnInit(){

    }

    getCuentaDataTable(){
        this.cuentaURL = 'http://localhost:8080/cuentas/getCuentaDataTableByClienteId?cliente_id=' + this.cliente_id;
        this.cuentaColumns = [
            {
                title: 'Nro Cuenta',
                data: 'numero_cuenta',
                name: 'numero_cuenta',
                responsivePriority: 0
            },
            {
                title: 'Tipo de Producto',
                data: 'numero_cuenta',
                name: 'numero_cuenta',
                responsivePriority: 1
            },
            {
                title: 'Sub Producto',
                data: 'numero_cuenta',
                name: 'numero_cuenta',
                responsivePriority: 2
            },
            {
                title: 'Moneda',
                data: 'numero_cuenta',
                name: 'numero_cuenta',
                responsivePriority: 3
            },
            {
                title: 'Saldo',
                data: 'numero_cuenta',
                name: 'numero_cuenta',
                responsivePriority: 4
            },
            {
                title: 'Nro Cuenta',
                data: 'numero_cuenta',
                name: 'numero_cuenta',
                responsivePriority: 5
            },
        ]
    }
}