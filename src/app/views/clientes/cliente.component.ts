import { Component, OnInit, OnChanges, AfterViewInit, AfterViewChecked, ChangeDetectorRef, EventEmitter } from "@angular/core";
import { HttpRequestService } from 'app/services/http-request.service';
import { FormGroup } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { Input, Output } from '@angular/core';

@Component({
    selector: 'cliente',
    templateUrl: 'cliente.component.html'
})

export class ClienteComponent implements OnInit,OnChanges,AfterViewChecked{

    Persona:any={};
    public tipoDocumento:string;
    public clienteDocumento: string;
    public clienteURL:string;
    public cliente:any={};
    detalle: boolean = true;

    //TipoDocumento
    tipoD: Array<Select2OptionData> = [];
    tipoDOptions: Select2Options;
    tipoSelected: any;

    constructor(private httpRequestService: HttpRequestService,
    private changeRef: ChangeDetectorRef){}

    ngOnInit(){
        this.getTipoDData()
    }

    getCliente(){
        this.clienteURL = 'http://localhost:8080/personas/getPersonaByDocumento?tipoDocumento=' + this.tipoDocumento + '&cliente_id=' + this.clienteDocumento;
        if(this.clienteDocumento!= null){
            this.httpRequestService.getWithCredentials(this.clienteURL)
            .subscribe(data =>{
                if(data._body.toString().length>0){
                   this.Persona = JSON.parse(data._body);
                   this.detalle=true;
                }else{
                    console.log('No hay información');
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

    onTipoDChange(event:any){
       this.tipoSelected=event.value;
       this.tipoDocumento =this.tipoSelected;
    }

    ngAfterViewChecked(){
        this.changeRef.detectChanges();
    }

    ngOnChanges(){

    }
}