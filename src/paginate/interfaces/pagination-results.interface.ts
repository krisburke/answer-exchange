export interface PaginationResults<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    next?: string;
    previous?: string;
}
