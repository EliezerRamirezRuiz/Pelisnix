
export interface IMovie {
    readonly id: number;
    readonly name: string;
    readonly duration: number;
    
    readonly authorId: number;
    readonly categoryId: number;
    readonly genderId: number;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}