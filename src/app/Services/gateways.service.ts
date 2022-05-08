import { Inject, Injectable } from '@angular/core';
import { CustomTableService } from './custom-table.service';
import { GatewayModel} from '../models/gateway.model';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class GatewaysService extends CustomTableService<GatewayModel> {
  API_URL = "Gateway";
  constructor(@Inject(EndpointService) endpoint: EndpointService) {
    super(endpoint);
  }
}
