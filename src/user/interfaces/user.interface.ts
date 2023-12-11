export default interface IUser{
    readonly fistName: string;
    readonly latsName: string;
    readonly email: string;
    readonly createdAt: Date
    readonly updateAt?: Date
}