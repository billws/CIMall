type AccountToken = {
    id: number;
    username: string;
    hasSubscription: boolean;
    token: number;
};


interface ITokenService {
    Transfer(source: number, destination: number, amount: number): boolean;
    Get(account: number): AccountToken;
    GetAll(): Record<string, AccountToken>;
    AddToken(source: number, amount: number): boolean;
    UpdateSubscription(source: number, hasSubscription: boolean): boolean;
}