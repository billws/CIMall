import PubSubService from "./pubsub";

const TRANSFER_DONE = "TRANSFER_DONE";

export default class TokenService implements ITokenService {
    private static instance?: TokenService = undefined;
    private allAccountTokens: Record<string, AccountToken>;

    private constructor() {
        this.allAccountTokens = {
            "1": {
                id: 1,
                username: "one",
                hasSubscription: false,
                token: 111,
                balances: 1111
            },
            "2": {
                id: 2,
                username: "two",
                hasSubscription: false,
                token: 222,
                balances: 2222
            },
            "3": {
                id: 3,
                username: "three",
                hasSubscription: false,
                token: 333,
                balances: 3333
            },
        };
    }

    public static getInstance(): TokenService {
        if (this.instance === undefined) {
            this.instance = new TokenService();
        }

        return this.instance;
    }

    public GetBalances(account: number): number {
        let accountDetail = this.Get(account);
        if (accountDetail !== undefined) {
            return accountDetail.balances;
        }
        throw new Error("Not exist.");
    }

    public GetAllBalances(): number {
        let totalBalances = 0;
        let allAccountDetail = this.GetAll();
        Object.keys(allAccountDetail).forEach((key) => totalBalances += allAccountDetail[key].balances);
        return totalBalances;
    }

    public AddToken(source: number, amount: number): boolean {
        if (this.allAccountTokens[source] !== undefined &&
            amount > 0) {
            this.allAccountTokens[source].token += amount;
            return true;
        } else {
            return false;
        }
    }

    public UpdateSubscription(source: number, hasSubscription: boolean): boolean {
        if (this.allAccountTokens[source] !== undefined) {
            this.allAccountTokens[source].hasSubscription = hasSubscription;
            return true;
        } else {
            return false;
        }
    }

    public GetAll(): Record<string, AccountToken> {
        return this.allAccountTokens;
    }

    public Transfer(source: number, destination: number, amount: number): boolean {
        if (this.allAccountTokens[source] !== undefined &&
            this.allAccountTokens[destination] !== undefined &&
            amount > 0 &&
            this.allAccountTokens[source].token >= amount) {
            this.allAccountTokens[source].token -= amount;
            this.allAccountTokens[destination].token += amount;
            PubSubService.getInstance().publish(TRANSFER_DONE, source);
            return true;
        } else {
            return false;
        }
    }

    public Get(account: number): AccountToken {
        return this.allAccountTokens[account];
    }

};


