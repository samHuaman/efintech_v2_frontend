import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { MyDataTablesModule } from '../../components/common/datatables/datatables.module';
import { MyDropdownModule } from '../../components/common/dropdowns/dropdowns.module';

import { SolicitudesComponent } from './solicitud.component';

@NgModule({
    declarations: [ 
        SolicitudesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MyDropdownModule,
        IboxtoolsModule,
        MyDataTablesModule
    ],
    exports: [
        SolicitudesComponent
    ]
})

export class SolicitudesModule {

}