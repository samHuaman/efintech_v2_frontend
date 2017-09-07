import { Component, OnInit } from "@angular/core";
import { Select2OptionData } from 'ng2-select2';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'app/services/http-request.service';

@Component({
    selector: 'movimiento',
    templateUrl: 'movimiento.component.html'
})

export class MovimientoComponent implements OnInit{

    public cuentaId: number;
    private sub: any;

    public personaId:number;
    private sub2:any;

    constructor(private httpRequestService: HttpRequestService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        
    }

    ngOnInit(){
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.cuentaId = +params['cuentaId'];
            //this.cuenta_id = this.cuentaId.toString();
        });

        this.sub2 = this.activatedRoute.params.subscribe(params => {
            this.personaId = +params['personaId'];
            //this.persona_id = this.personaId.toString();
        })
    }

}