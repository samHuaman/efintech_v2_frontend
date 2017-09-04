import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from 'app/services/http-request.service';
import { FormGroup } from '@angular/forms';
import { Input, Output } from '@angular/core';

@Component({
    selector: 'cliente-detalle',
    templateUrl: 'cliente-detalle.component.html'
})

export class ClienteDetalleComponent implements OnInit{

    @Input() clienteDocumento:any;

    ngOnInit(){
        console.log(this.clienteDocumento);
    }
}