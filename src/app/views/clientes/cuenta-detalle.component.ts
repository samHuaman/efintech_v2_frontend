import { Component, OnInit, OnChanges } from "@angular/core";
import { Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'app/services/http-request.service';

@Component({
    selector: 'cuenta-detalle',
    templateUrl: 'cuenta-detalle.component.html'
})

export class CuentaDetalleComponent implements OnInit{
    
    public cuentaId: number;
    private sub: any;

    //Cuenta
    public CuentaURL: string;
    public Cuenta:any={};
    public cuenta_id: string;
    public cuentaEstado:String;
    public Moneda: String;
    public MonedaPS: String;

    constructor(private httpRequestService: HttpRequestService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        
    }

    ngOnInit(){
        this.getCuentaData();
    }

    getCuentaData(){

        this.sub = this.activatedRoute.params.subscribe(params => {
            this.cuentaId = +params['cuentaId'];
            this.cuenta_id = this.cuentaId.toString();
        });

        this.CuentaURL = 'http://localhost:8080/cuentas/getCuentaByCuentaId?cuenta_id=' + this.cuenta_id;
        if (this.cuenta_id != null){
            this.httpRequestService.getWithCredentials(this.CuentaURL)
            .subscribe(data =>{
                this.Cuenta = JSON.parse(data._body);
                if(this.Cuenta.activo = 'true'){
                    this.cuentaEstado = 'Activa';
                }else{
                    this.cuentaEstado = 'Inactiva';
                }
                let productoMonedas: any[] = [] = this.Cuenta.segmento.subProducto.producto.productoMonedas;
                productoMonedas.forEach(obj=>{
                    let tipo:string
                    if(obj.principal = 'true'){
                       tipo = 'Moneda Principal';
                    }else{
                        tipo = 'Moneda Secundaria';
                    }
                    this.Moneda = obj.moneda.nombre;
                    this.MonedaPS = tipo;
                })
            })
        }

    }
}