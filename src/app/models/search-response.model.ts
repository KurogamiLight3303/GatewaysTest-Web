import { CollectionResponseModel } from "./collection-response.model";

export interface SearchResponseModel<T> extends CollectionResponseModel<T> {
    pageSize: number,
    pageNo: number,
    total: number
}