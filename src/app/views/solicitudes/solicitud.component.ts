import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

 @Component({
     selector: 'solicitudes',
    templateUrl: 'solicitud.component.html'
 })

export class SolicitudesComponent implements OnInit {

    public url: string;
    public columns: any[];
    public filter: Object;

    ShowDropdown: boolean = false;

    SelectedRequest: any = {};

    constructor() {

    }

    ngOnInit() {
        this.url = 'http://localhost:8080/solicitud/getDataTable';
        this.columns = [
            {
                title: 'ID',
                data: 'solicidutId',
                name: 'solicidutId',
                responsivePriority: 0
            },
            {
                title: 'Tipo de Proceso',
                data: 'tipoProceso.nombre',
                name: 'tipoProceso',
                responsivePriority: 3
            },
            {
                title: 'Tipo de Archivo',
                data: 'tipoArchivo.nombre',
                name: 'tipoArchivo',
                responsivePriority: 4
            },
            {
                title: 'Fecha y Hora Inicio',
                data: 'fechaInicio',
                name: 'fechaInicio',
                responsivePriority: 6,
                render: function (data, tye, full, meta) {
                    let _date = new Date(data).toLocaleDateString();
                    let _time = new Date(data).toLocaleTimeString();
                    return _date + ' ' + _time;
                }
            },
            {
                title: 'Fecha y Hora Fin',
                data: 'fechaFin',
                name: 'fechaFin',
                responsivePriority: 7,
                render: function (data, tye, full, meta) {
                    let _date = new Date(data).toLocaleDateString();
                    let _time = new Date(data).toLocaleTimeString();
                    return _date + ' ' + _time;
                }
            },
            {
                title: 'Usuario',
                data: 'usuario.nombreUsuario',
                name: 'usuario',
                responsivePriority: 5
            },
            {
                title: 'Fase',
                data: 'solicitudFase.nombre',
                name: 'solicitudFase',
                responsivePriority: 1
            },
            {
                title: 'Estado',
                data: 'solicitudEstado',
                name: 'solicitudEstado',
                responsivePriority: 2,
                render: function (data, tye, full, meta) {
                    return data ? data.nombre : '-';
                }
            }
        ];
    }

    onShowDropdown(event: any) {
        if (event) {
            this.SelectedRequest = event;
            this.ShowDropdown = true;
        }
        else {
            this.SelectedRequest = { };
            this.ShowDropdown = false;
        }
    }
}