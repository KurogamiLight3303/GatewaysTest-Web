export class SearchRequestModel {
    pageNo: number;
    pageSize: number;

    constructor(index: number, size: number) {
        this.pageNo = index;
        this.pageSize = size;
    }
}