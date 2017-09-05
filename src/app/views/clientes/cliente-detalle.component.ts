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

    ngOnInit(){
        console.log(this.Persona);
    }
    ngOnChanges(){
        console.log(this.Persona);
    }
}