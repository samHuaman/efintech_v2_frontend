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

    ngOnInit(){
        this.documento = this.Persona.numeroDocumentoIdentidad;
        this.fullName = this.Persona.primerNombre + ' ' + this.Persona.segundoNombre + ' ' + this.Persona.apellidoPaterno + ' ' + this.Persona.apellidoMaterno;
    }
    ngOnChanges(){
        console.log(this.Persona);
    }
}