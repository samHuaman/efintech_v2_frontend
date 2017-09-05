import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SecurityContext, ChangeDetectorRef } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { Select2OptionData } from 'ng2-select2';

import { HttpRequestService } from '../../services/http-request.service';

@Component({
    selector: 'carga-masiva-detalle',
    templateUrl: 'carga-masiva-detalle.component.html',
    styleUrls: ['flat-file.component.css']
})

export class CargaMasivaDetalleComponent implements OnInit {

    private supportedFileTypes: string[] = ['text/plain'];

    private fileReader = new FileReader();
    private file: any[];
    private imageShown: boolean = false;
    private currentImage: string = 'assets/images/profile_small.jpeg';
    private fileName: string = '';

    public alerts: any[] = [];

    public TiposArchivo: Array<Select2OptionData> = [];
    public TiposArchivoOptions: Select2Options;
    public TipoArchivoSelected: any;

    Progress: boolean | number = false;

    constructor(private _http: HttpRequestService,
                private sanitizer: DomSanitizer) {
        this._http.progress$.subscribe(
            data => {
                console.log('progress = ' + data);
            }
        );

        this.alerts = this.alerts.map((alert: any) => ({
            type: alert.type,
            msg: this.sanitizer.sanitize(SecurityContext.HTML, alert.msg),
            timeout: 3000
        }));
    }

    ngOnInit() {
        this.getTiposArchivo();
    }

    public getTiposArchivo() {        
        this.TiposArchivoOptions = {
            dropdownAutoWidth: false,
            width: '100%',
            allowClear: false,
            placeholder: {
                id: -1,
                text: 'Tipo de Archivo'
            }
        };

        let url: string = 'http://localhost:8080/carga-masiva/getTiposArchivo'
        this._http.getWithCredentials(url)
            .subscribe(
                data => {
                    let _data = JSON.parse(data._body);
                    let array: any[] = [];
                    
                    _data.forEach(obj => {
                        let _obj = {
                            id: obj.tipoArchivoId,
                            text: obj.nombre
                        };

                        array.push(_obj);
                    });

                    this.TiposArchivo = array;
                },
                error => console.log(error),
                () => console.log('Request Finished')
            );
    }

    private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
        this.file = [];

        this.fileReader.onload = (event) => {
            this.currentImage = 'assets/images/flat-text-icon.png';
            this.imageShown = true;  
            this.fileName = acceptedFile.file.name;
            this.file.push(acceptedFile.file);
        };

        this.fileReader.readAsDataURL(acceptedFile.file);
    }

    private onRefresh() {
        this.fileReader.abort();
        this.currentImage = 'assets/images/profile_small.jpeg';
        this.imageShown = false;  
        this.fileName = '';
    }

    private post() {
        if (this.fileReader.result) {
            this.alerts.push({
                type: 'info',
                msg:`<strong>Eviado!</strong> El archivo se ha enviado exitosamente. Vaya a la ventana "Solicitudes" para ver el estado de la solicitud de proceso.`,
                timeout: 10000
            });

            this._http.postFileWithCredentials('http://localhost:8080/carga-masiva/saveFile',
                    ['tipo_archivo', this.TipoArchivoSelected], this.file)
                .subscribe(
                    data => {
                        let res = JSON.parse(data);

                        this.alerts = [];

                        setTimeout(() => {
                            if (res.statusCode == 200) {
                                this.alerts.push({
                                    type: 'success',
                                    msg:`<strong>Procesado!</strong> El archivo se ha procesado exitosamente.`,
                                    timeout: 6000
                                });
                            }
                            else if (res.statusCode == 400) {
                                this.alerts.push({
                                    type: 'warning',
                                    msg:`<strong>Proceso con errores!</strong> La estructura del archivo enviado no coincide con la del tipo seleccionado.`,
                                    timeout: 6000
                                });
                            }
                            else {
                                this.alerts.push({
                                    type: 'danger',
                                    msg:`<strong>Error!</strong> Hubo un error en el servidor. Por favor, comuníquese con el Administrador del Sistema.`,
                                    timeout: 6000
                                });
                            }

                            setTimeout(() => {
                                this.onRefresh();
                            }, 500);
                        }, 750);                        

                        console.log(res);
                    },
                    error => console.log(error),
                    () => console.log('Request Finished')
                );
        }
    }

    onTipoArchivoChange(event: any) {
        this.TipoArchivoSelected = event.value;
    }
    
    startLoading(): void {
        this.Progress = 0; 
 
        setTimeout(() => {
            this.Progress = 0.5; 
 
            setTimeout(() => {
                this.Progress = 1; 
 
                setTimeout(() => {
                    this.Progress = false; 
                }, 500);
            }, 500);
        }, 400);
    }
}