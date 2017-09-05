import { Component, OnInit, OnChanges } from "@angular/core";
import { HttpRequestService } from 'app/services/http-request.service';
import { FormGroup } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
    selector: 'cliente-detalle',
    templateUrl: 'cliente-detalle.component.html'
})

export class ClienteDetalleComponent implements OnInit{

    @Input() Persona:any={};
    documento:string;
    fullName:string;

    public url: string;
    public columns: any[];
    public filter: Object;
    cuentaSelected: any = {};

    ngOnInit(){
        this.documento = this.Persona.numeroDocumentoIdentidad;
        this.fullName = this.Persona.primerNombre + ' ' + this.Persona.segundoNombre + ' ' + this.Persona.apellidoPaterno + ' ' + this.Persona.apellidoMaterno;

        this.url = 'http://localhost:8080/cuentas/getCuentaDataTableByClienteId?cliente_id=' + this.Persona.personaId;
        this.columns = [
            {
                title: 'Nor Cuenta',
                data: 'nrocuenta',
                name: 'nrocuenta',
                responsivePriority: 0
            },
            {
                title: 'Tipo de Produto',
                data: 'producto',
                name: 'producto',
                responsivePriority: 3
            },
            {
                title: 'SubProducto',
                data: '',
                name: '',
                responsivePriority: 4
            },
            {
                title: 'Moneda',
                data: '',
                name: ''
            },
            {
                title: 'Saldo',
                data: '',
                name: ''
            }
        ];
    }

    onShowDropdown(event: any) {
        if (event) {
            this.cuentaSelected = event;
            //this.ShowDropdown = true;
        }
        else {
            this.cuentaSelected = { };
            //this.ShowDropdown = false;
        }
    }

    ngOnChanges(){
        console.log(this.Persona);
    }
}