import { OperationResponseModel } from "./operation-response.model";

export interface CollectionResponseModel<T> extends OperationResponseModel {
    items: T[]
}