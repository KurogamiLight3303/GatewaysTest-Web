import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayModel } from 'src/app/models/gateway.model';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';
import { GatewaysService } from '../../Services/gateways.service';
import { EditGatewayComponent } from '../edit-gateway/edit-gateway.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {
  public PageIndex: number;
  public PageSize : number;  
  public MaxPage: number = 0;
  public Messages: any[] = [];

  get CurrentPage(){
    return this.PageIndex + 1;
  }

  set CurrentPage(value){
    if(this.PageIndex != value - 1)
    {
      this.PageIndex = value - 1;
      this.search();
    }
  }

  constructor(public gatewayService: GatewaysService, private modalService: NgbModal, private toasService: ToastMessagesService, public translate: TranslateService) 
  { 
    this.PageIndex = 0;
    this.PageSize = 10;
    this.gatewayService.errorMessage$.subscribe(textOrTpl => {
      toasService.showMessage(textOrTpl);
    });
  }

  ngOnInit(): void {
    this.search();
  }

  public search(): void{
    this.gatewayService.UpdatePaging(this.PageIndex, this.PageSize);
    this.gatewayService.fetch()
  }

  public delete(serialNo: string) : void{
    this.gatewayService.remove(serialNo);
  }

  public showDetails(gateway: GatewayModel){
    gateway.showDetails = !gateway.showDetails;
  }

  public edit(gateway: GatewayModel){
    const modalRef = this.modalService.open(EditGatewayComponent);
    modalRef.componentInstance.setSource(gateway);
    modalRef.result.then((res) => {
      if(res != undefined && res == true)
        this.gatewayService.fetch()
    }).catch((res) => {});
  }

  public add(){
    const modalRef = this.modalService.open(EditGatewayComponent);
    modalRef.result.then((res) => {
      if(res != undefined && res == true)
        this.gatewayService.fetch()
    }).catch((res) => {});
  }

}
