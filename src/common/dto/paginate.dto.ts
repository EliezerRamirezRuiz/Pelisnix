export class PaginatedOutputDto<Data> {
    readonly data: Data[];
    readonly meta: {
        readonly total: number;
        readonly lastPage: number;
        readonly currentPage: number;
        readonly perPage: number;
        readonly prev: number | null;
        readonly next: number | null;
    };
};