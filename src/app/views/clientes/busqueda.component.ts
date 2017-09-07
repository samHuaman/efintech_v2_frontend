import { Component, OnInit, OnChanges, AfterViewInit, AfterViewChecked, ChangeDetectorRef, EventEmitter } from "@angular/core";
import { HttpRequestService } from 'app/services/http-request.service';
import { FormGroup } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'busqueda',
    templateUrl: 'busqueda.component.html'
})

export class BusquedaComponent implements OnInit, OnChanges, AfterViewChecked{

    public tipoDocumento: string;
    public clienteDocumento: string;
    //TipoDocumento
    tipoD: Array<Select2OptionData> = [];
    tipoDOptions: Select2Options;
    tipoSelected: any;
    //Persona
    Persona: any = {};
    public PersonaURL: string;
    public cliente_id: string;

    constructor(private httpRequestService: HttpRequestService,
        private changeRef: ChangeDetectorRef,
    private router: Router){
    }

    ngOnInit(){

        this.getTipoDData();

    }

    getCliente() {
        this.PersonaURL = 'http://localhost:8080/personas/getPersonaByDocumento?tipoDocumento=' + this.tipoDocumento + '&documento=' + this.clienteDocumento;
        if (this.clienteDocumento != null) {
            this.httpRequestService.getWithCredentials(this.PersonaURL)
                .subscribe(data => {
                    let persona: any = {} = JSON.parse(data._body);
                    this.cliente_id = persona.cliente.clienteId;
                    let clienteURL = 'http://localhost:8080/personas/getClienteByClienteId?cliente_id=' + this.cliente_id;
                    if (this.cliente_id != null) {
                        this.httpRequestService.getWithCredentials(clienteURL)
                            .subscribe(data => {
                                if(data._body.toString()!=null){
                                    this.router.navigateByUrl("/cliente/cliente-detalle/" + persona.personaId);
                                }else{
                                    console.log("No existe Cliente");
                                }
                            })
                    }
                })
        }
    }

    getTipoDData() {
        this.tipoDOptions = {
            dropdownAutoWidth: false,
            width: '100%',
            allowClear: false,
            multiple: true,
            placeholder: {
                id: -1,
                text: 'Tipo Documento'
            }
        };

        let url: string = 'http://localhost:8080/tipoDocumento/getAllTipoDocumento'
        this.httpRequestService.getWithCredentials(url)
            .subscribe(
            data => {
                let _data = JSON.parse(data._body);
                let array: any[] = [];

                _data.forEach(obj => {
                    let _obj = {
                        id: obj.tipoDocumentoIdentidadId,
                        text: obj.nombre
                    };
                    array.push(_obj);
                });

                this.tipoD = array;
            },
            error => console.log(error),
            () => console.log('Request Finished')
            );
    }

    ngAfterViewChecked() {
        this.changeRef.detectChanges();
    }

     onTipoDChange(event: any) {
        this.tipoSelected = event.value;
        this.tipoDocumento = this.tipoSelected;
    }

    ngOnChanges() {

    }
}