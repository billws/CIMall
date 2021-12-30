type AccountToken = {
    id: number;
    username: string;
    hasSubscription: boolean;
    token: number;
    balances: number;
};


interface ITokenService {
    Transfer(source: number, destination: number, amount: number): boolean;
    Get(account: number): AccountToken;
    GetAll(): Record<string, AccountToken>;
    GetBalances(account: number): number;
    GetAllBalances(): number;
    AddToken(source: number, amount: number): boolean;
    UpdateSubscription(source: number, hasSubscription: boolean): boolean;
}; 