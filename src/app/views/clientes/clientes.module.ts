import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms'
import { Select2Module } from 'ng2-select2';
import { RouterModule } from '@angular/router';
import { MyDataTablesModule } from '../../components/common/datatables/datatables.module';
import { MyDropdownModule } from '../../components/common/dropdowns/dropdowns.module';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { MyDatePickerModule } from 'mydatepicker';

import { ClienteComponent } from './cliente.component';
import { ClienteDetalleComponent } from './cliente-detalle.component';
import { CuentaDetalleComponent } from './cuenta-detalle.component';
import { BusquedaComponent } from './busqueda.component';
import { MovimientoComponent } from './movimiento.component';

@NgModule({
    declarations: [
        ClienteComponent,
        ClienteDetalleComponent,
        CuentaDetalleComponent,
        BusquedaComponent,
        MovimientoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        Select2Module,
        RouterModule,
        MyDataTablesModule,
        MyDropdownModule,
        IboxtoolsModule,
        MyDatePickerModule
        
    ],
    exports: [
        ClienteComponent,
        ClienteDetalleComponent,
        CuentaDetalleComponent,
        BusquedaComponent,
        MovimientoComponent
    ]
})

export class ClientesModule {

}