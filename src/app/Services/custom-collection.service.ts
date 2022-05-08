import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, Observable, of, Subscription} from 'rxjs';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import { CollectionResponseModel } from '../models/collection-response.model';
import { CustomOperationResponseModel, OperationResponseModel } from '../models/operation-response.model';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class CustomCollectionService<T> {
  protected _endpoint: EndpointService;
  protected _items$ = new BehaviorSubject<T[]>([]);
  protected _isLoading$ = new BehaviorSubject<boolean>(false);
  protected _isFirstLoading$ = new BehaviorSubject<boolean>(true);
  protected _errorMessage = new BehaviorSubject<string>('');
  protected _subscriptions: Subscription[] = [];

  API_URL = `/endpoint`; // API URL has to be overwritten
  constructor(endpoint: EndpointService) {
    this._endpoint = endpoint;
  }

  get items$() {
    return this._items$.asObservable();
  }
  get loadingSubject$() {
      return this._isLoading$;
  }
  get isLoading$() {
      return this._isLoading$.asObservable();
  }

  isLoading(value: boolean) {
      this._isLoading$.next(value);
  }

  get isFirstLoading$() {
      return this._isFirstLoading$.asObservable();
  }

  get errorMessage$() {
      return this._errorMessage.asObservable();
  }

  public add(body: any) : Observable<boolean>{
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this._endpoint.post<CustomOperationResponseModel<T>>(`${this.API_URL}`, body)
        .pipe(
            map((res: CustomOperationResponseModel<T>) => {
                if(res.success)
                    this.fetch();
                else
                    this._errorMessage.next(res.message);
                return res.success;
            }),
            catchError((err) => {
                this._errorMessage.next(err);
                return of(false);
            }),
            finalize(() => {
                this._isLoading$.next(false);
            })
        );
  }

  public update(id: string, body: any) : Observable<boolean>{
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this._endpoint.put<CustomOperationResponseModel<T>>(`${this.API_URL}/${id}`, body)
        .pipe(
            map((res: CustomOperationResponseModel<T>) => {
                if(res.success)
                    this.fetch();
                else
                    this._errorMessage.next(res.message);
                return res.success;
            }),
            catchError((err) => {
                this._errorMessage.next(err);
                return of(false);
            }),
            finalize(() => {
                this._isLoading$.next(false);
            })
        );
  }

  public remove(id: string ){
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this._endpoint.delete<OperationResponseModel>(`${this.API_URL}/${id}`)
        .pipe(
            tap((res: OperationResponseModel) => {
                if(res.success)
                    this.fetch();
                else
                    this._errorMessage.next(res.message);
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

  public fetch(){
    this._isLoading$.next(true);
        this._errorMessage.next('');
        
        const request = this.find()
            .pipe(
                tap((res: T[]) => {
                    this._items$.next(res);
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
  private find(): Observable<T[]> {
    this._isLoading$.next(true);
    const url = `${this.API_URL}`;
    return this._endpoint.get<CollectionResponseModel<T>>(url).pipe(
        map((answer: CollectionResponseModel<T>) => {
            if (!answer.success)
                this._errorMessage.next(answer.message);
            return answer.items;
        }),
        catchError(err => {
            this._errorMessage.next(err);
            console.error('FIND ITEMS', err);
            return of([]);
        }),
        finalize(() => this._isLoading$.next(false))
    );
}
}
