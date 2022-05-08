export interface OperationResponseModel{
    success: boolean,
    message: string
}

export interface CustomOperationResponseModel<T> extends OperationResponseModel{
    data: T
}