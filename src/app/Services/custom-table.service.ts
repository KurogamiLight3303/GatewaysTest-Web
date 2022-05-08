import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import { OperationResponseModel } from '../models/operation-response.model';
import { SearchRequestModel } from '../models/search-request.model';
import { SearchResponseModel } from '../models/search-response.model';
import { TableResponseModel } from '../models/table-response.model';
import { CustomCollectionService } from './custom-collection.service';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class CustomTableService<T> extends CustomCollectionService<T>{
  protected PageIndex: number = 0;
  protected PageSize: number = 10;
  protected _total$ = new BehaviorSubject<number>(0);
  get Total$() {
    return this._total$.asObservable();
  }
    constructor(endpoint: EndpointService) {
        super(endpoint);
    }
    private findPaged(): Observable<TableResponseModel<T>> {
        this._isLoading$.next(true);
        const url = `${this.API_URL}/search`;
        var request = new SearchRequestModel(this.PageIndex, this.PageSize);
        return this._endpoint.post<SearchResponseModel<T>>(url, request).pipe(
            map((answer: SearchResponseModel<T>) => {
                if (!answer.success)
                    this._errorMessage.next(answer.message);
                return {
                    total: answer.total,
                    items: answer.items
                };
            }),
            catchError(err => {
                this._errorMessage.next(err);
                console.error('FIND ITEMS', err);
                return of({items: [], total: 0});
            }),
            finalize(() => this._isLoading$.next(false))
        );
    }

    public UpdatePaging(pageIndex: number, pageSize: number){
        this.PageIndex = pageIndex;
        this.PageSize = pageSize;
    }

    public fetch(){
        this._isLoading$.next(true);
        this._errorMessage.next('');
        
        const request = this.findPaged()
            .pipe(
                tap((res: TableResponseModel<T>) => {
                    this._total$.next(res.total);
                    this._items$.next(res.items);
                }),
                catchError((err) => {
                    this._errorMessage.next(err);
                    return of({
                        items: [],
                        total: 0
                    });
                }),
                finalize(() => {
                    this._isLoading$.next(false);
                })
            )
            .subscribe();
        this._subscriptions.push(request);
    }
}
