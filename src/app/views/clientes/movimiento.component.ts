import { Component, OnInit } from "@angular/core";
import { Select2OptionData } from 'ng2-select2';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'app/services/http-request.service';

@Component({
    selector: 'movimiento',
    templateUrl: 'movimiento.component.html'
})

export class MovimientoComponent implements OnInit {

    //Persona
    public PersonaURL: string;
    public Persona: any = {};
    public cuentaId: number;
    private sub: any;
    public persona_id: string;
    public fullName:string;

    public personaId: number;
    private sub2: any;

    //Cuenta
    public CuentaURL: string;
    public Cuenta: any = {};
    public cuenta_id: string;

    //Transacciones
    public TransaccionURL: string;
    public Transacciones: Array<Select2OptionData> = [];
    public TransaccionOptions: Select2Options;

    //Cuenta - Element
    public producto: string;
    public subProducto: string;
    public segmento: string;
    public numeroCuenta: string;
    public cuentaEstado: String;
    public Moneda: String;
    public MonedaPS: String;
    public simbolo: string;
    public diasAtraso: string;
    public fechaAlta: string;
    public saldoUtilizado: string;
    public productoMonedas: any[];
    public saldoDisponible: string;

    constructor(private httpRequestService: HttpRequestService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {

        this.producto = '';
        this.subProducto = '';
        this.segmento = '';
        this.numeroCuenta = '';
        this.cuentaEstado = '';
        this.Moneda = '';
        this.MonedaPS = '';
        this.simbolo = '';
        this.diasAtraso = '';
        this.fechaAlta = '';
        this.saldoUtilizado = '';
        this.productoMonedas = [];
        this.saldoDisponible = '';

        this.getCuentaData();
        this.getCliente();
        this.getAllTransacciones();
    }

    getCuentaData() {

        this.sub = this.activatedRoute.params.subscribe(params => {
            this.cuentaId = +params['cuentaId'];
            this.cuenta_id = this.cuentaId.toString();
        });

        this.CuentaURL = 'http://localhost:8080/cuentas/getCuentaByCuentaId?cuenta_id=' + this.cuenta_id;
        if (this.cuenta_id != null) {
            this.httpRequestService.getWithCredentials(this.CuentaURL)
                .subscribe(data => {
                    this.Cuenta = JSON.parse(data._body);
                    this.producto = this.Cuenta.segmento.subProducto.producto.nombre;
                    this.subProducto = this.Cuenta.segmento.subProducto.nombre;
                    this.segmento = this.Cuenta.segmento.nombre;
                    this.numeroCuenta = this.Cuenta.numeroCuenta;
                    this.diasAtraso = this.Cuenta.diasAtraso;
                    this.fechaAlta = this.Cuenta.fechaAlta;
                    this.saldoUtilizado = this.Cuenta.saldoUtilizado;
                    this.saldoDisponible = this.Cuenta.saldoDisponible;
                    this.productoMonedas = this.Cuenta.segmento.subProducto.producto.productoMonedas;
                    if (this.Cuenta.activo = 'true') {
                        this.cuentaEstado = 'Activa';
                    } else {
                        this.cuentaEstado = 'Inactiva';
                    }
                    let productoMonedas: any[] = [] = this.productoMonedas;//this.Cuenta.segmento.subProducto.producto.productoMonedas;
                    productoMonedas.forEach(obj => {
                        let tipo: string
                        if (obj.principal = 'true') {
                            tipo = 'Moneda Principal';
                        } else {
                            tipo = 'Moneda Secundaria';
                        }
                        this.Moneda = obj.moneda.nombre;
                        this.MonedaPS = tipo;
                        this.simbolo = obj.moneda.simbolo + '.';
                    })
                })
        }
    }

    getCliente() {
         
        this.sub2 = this.activatedRoute.params.subscribe(params => {
            this.personaId = +params['personaId'];
            this.persona_id = this.personaId.toString();
        })

        this.PersonaURL = 'http://localhost:8080/personas/getPersonaByPersonaId?persona_id=' + this.persona_id;
        if (this.persona_id != null) {
            this.httpRequestService.getWithCredentials(this.PersonaURL)
                .subscribe(data => {
                    this.Persona = JSON.parse(data._body);
                    this.fullName = this.Persona.primerNombre + ' ' + this.Persona.segundoNombre + ' ' + this.Persona.apellidoPaterno + ' ' + this.Persona.apellidoMaterno;
                })
        }
    }

    getAllTransacciones(){
        this.TransaccionOptions = {
            dropdownAutoWidth: false,
            width:'100%',
            allowClear:true,
            placeholder:{
                id:-1,
                text: 'Movimiento'
            }
        };

        this.TransaccionURL = 'http://localhost:8080/transacciones/getAllTransacciones';
        this.httpRequestService.getWithCredentials(this.TransaccionURL)
        .subscribe(data =>{
            let transacciones = JSON.parse(data._body);
            let transaccionesArray:any[]=[];
            transacciones.forEach(e => {
                let obj = {
                    id: e.transaccionId,
                    text: e.nombre
                };
                transaccionesArray.push(obj);
            });
            this.Transacciones = transaccionesArray;
        })


    }

}