import { Component, OnInit, Input  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PeripheralService } from 'src/app/Services/peripheral.service';
import { EndpointService } from '../../Services/endpoint.service';
import {TranslateService} from "@ngx-translate/core";
import { EditPeripheralComponent } from '../edit-peripheral/edit-peripheral.component';

@Component({
  selector: 'app-peripherals',
  templateUrl: './peripherals.component.html',
  styleUrls: ['./peripherals.component.scss']
})
export class PeripheralsComponent implements OnInit {
  @Input() serialNo: string = "";
  public peripheralService : PeripheralService;

  constructor(private endpointService: EndpointService, private modalService: NgbModal, public translate: TranslateService) {
    this.peripheralService = new PeripheralService(endpointService, this.serialNo);
   }

  ngOnInit(): void {
    this.peripheralService = new PeripheralService(this.endpointService, this.serialNo);
    this.search();
  }

  public search(){
    this.peripheralService.fetch();
  }

  public delete(uid: number){
    this.peripheralService.remove(uid.toString());
  }

  public add(){
    const modalRef = this.modalService.open(EditPeripheralComponent);
    modalRef.componentInstance.setSerialNo(this.serialNo);
    modalRef.result.then((res) => {
      if(res != undefined && res == true)
        this.peripheralService.fetch()
    }).catch((res) => {});
  }
}
