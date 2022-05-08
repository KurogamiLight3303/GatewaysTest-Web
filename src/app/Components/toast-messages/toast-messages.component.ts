import { Component, Inject, OnInit } from '@angular/core';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit {
  public Service : ToastMessagesService;

  constructor(@Inject(ToastMessagesService) toastMessagesService: ToastMessagesService) {
    this.Service = toastMessagesService;
   }

  ngOnInit(): void {
  }
}
