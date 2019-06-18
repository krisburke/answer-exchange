import { PaginationResults } from './interfaces/pagination-results.interface';
import { PaginationOptions } from './interfaces/pagination-options.interface';

export class Pagination<PaginationEntity> {
    public results: PaginationEntity[];
    public pageTotal: number;
    public total: number;

    constructor(
        paginationResults: PaginationResults<PaginationEntity>,
        paginationOptions: PaginationOptions,
    ) {
        const pageTotal = Math.ceil(
            paginationResults.total / paginationOptions.take,
        );

        this.results = paginationResults.results;
        this.pageTotal = pageTotal;
        this.total = paginationResults.total;
    }
}
