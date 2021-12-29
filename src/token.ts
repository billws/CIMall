const AllAccountTokens: Record<string, AccountToken> = {
    "1": {
        id: 1,
        username: "one",
        hasSubscription: false,
        token: 111
    },
    "2": {
        id: 2,
        username: "two",
        hasSubscription: false,
        token: 222
    },
    "3": {
        id: 3,
        username: "three",
        hasSubscription: false,
        token: 333
    },
};

export default class TokenService implements ITokenService {
    constructor() {

    }
    AddToken(source: number, amount: number): boolean {
        if (AllAccountTokens[source] !== undefined &&
            amount > 0) {
            AllAccountTokens[source].token += amount;
            return true;
        } else {
            return false;
        }
    }
    UpdateSubscription(source: number, hasSubscription: boolean): boolean {
        if (AllAccountTokens[source] !== undefined) {
            AllAccountTokens[source].hasSubscription = hasSubscription;
            return true;
        } else {
            return false;
        }
    }
    
    GetAll(): Record<string, AccountToken> {
        return AllAccountTokens;
    }
    Transfer(source: number, destination: number, amount: number): boolean {
        if (AllAccountTokens[source] !== undefined &&
            AllAccountTokens[destination] !== undefined &&
            amount > 0 &&
            AllAccountTokens[source].token >= amount) {
            AllAccountTokens[source].token -= amount;
            AllAccountTokens[destination].token += amount;
            return true;
        } else {
            return false;
        }
    }
    Get(account: number): AccountToken {
        return AllAccountTokens[account];
    }

}


