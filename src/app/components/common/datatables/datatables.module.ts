import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDataTablesAjaxComponent } from './datatables-ajax.component';

@NgModule({
    declarations: [
        MyDataTablesAjaxComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        MyDataTablesAjaxComponent
    ]
})

export class MyDataTablesModule {
    
}