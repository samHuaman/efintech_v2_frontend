import { Component, OnInit } from "@angular/core";
import { Input, Output } from '@angular/core';
import { HttpRequestService } from '../../services/http-request.service';

@Component({
    selector: 'cuenta',
    templateUrl: 'cuenta.component.html'
})

export class CuentaComponent implements OnInit {

    @Input() cliente_id:any;

    public cuentaURL: string;
    public cuentaColumns:any[] = [];
    public cuentaSelected:any;

    public cuentaDetailURL:string;
    public cuenta_id:any;
    public cuentaDetail: any = {};

    constructor(private http: HttpRequestService) {

    }

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

    getCuentaByCuentaId(){
        this.cuentaDetailURL = 'http://localhost:8080/cuentas/getCuentaByCuentaId?cuenta_id=' + this.cuenta_id;
        if(this.cuenta_id > 0 && this.cuenta_id != null){
            this.http.getWithCredentials(this.cuentaDetailURL)
            .subscribe(
                data => {
                    this.cuentaDetail = JSON.parse(data._body);
                }
            );
        }
    }
}