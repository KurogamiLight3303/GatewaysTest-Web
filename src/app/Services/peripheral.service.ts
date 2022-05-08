import { Injectable, Inject } from '@angular/core';
import { PeriferalModel } from '../models/peripheral.model';
import { CustomCollectionService } from './custom-collection.service';
import { EndpointService } from './endpoint.service';

export class PeripheralService extends CustomCollectionService<PeriferalModel> {
  constructor(endpoint: EndpointService, serialNo: string) {
    super(endpoint);
    this.API_URL = `Gateway\\${serialNo}\\Peripheral`;
  }
}
