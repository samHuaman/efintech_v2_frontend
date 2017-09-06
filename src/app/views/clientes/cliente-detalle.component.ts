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

    ShowDropdown: boolean = false;

    ngOnInit(){
        this.documento = this.Persona.numeroDocumentoIdentidad;
        this.fullName = this.Persona.primerNombre + ' ' + this.Persona.segundoNombre + ' ' + this.Persona.apellidoPaterno + ' ' + this.Persona.apellidoMaterno;

        this.url = 'http://localhost:8080/cuentas/getCuentaDataTableByClienteId?cliente_id=' + this.Persona.personaId;
        this.columns = [
            {
                title: 'Nor Cuenta',
                data: 'numeroCuenta',
                name: 'numeroCuenta',
                responsivePriority: 0
            },
            {
                title: 'Tipo de Produto',
                data: 'segmento.subProducto.producto.nombre',
                name: 'segmento.subProducto.producto.nombre',
                responsivePriority: 1
            },
            {
                title: 'SubProducto',
                data: 'segmento.subProducto.nombre',
                name: 'segmento.subProducto.nombre',
                responsivePriority: 2
            },
            {
                title: 'Moneda',
                data: 'segmento.subProducto.nombre',
                name: 'segmento.subProducto.nombre',
                responsivePriority: 3
            },
            {
                title: 'Saldo',
                data: 'segmento.subProducto.nombre',
                name: 'segmento.subProducto.nombre',
                responsivePriority: 4
            }
        ];
    }

    onShowDropdown(event: any) {
        if (event) {
            this.cuentaSelected = event;
            this.ShowDropdown = true;
        }
        else {
            this.cuentaSelected = { };
            this.ShowDropdown = false;
        }
    }

    ngOnChanges(){

    }
}