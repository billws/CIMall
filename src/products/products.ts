import PubSubService from "../pubsub";
import TokenService from "../token";

export class Product implements IProduct {
    static ProductType: string = "";
    productId: number = 0;
    constructor(productId: number) {
        this.productId = productId;
    }

    buy(purchaser: Purchaser): boolean {
        throw new Error("Incorrect Product Type.");
    }
}
export class Token extends Product implements IProduct {
    static ProductType: string = "Token";
    static ProductEvent: string = "TokenEvent";

    private productCategory: Record<string, number> = {
        "1": 1,
        "2": 50,
        "3": 100
    };

    constructor(productId: number) {
        super(productId);
    }

    buy(purchaser: Purchaser): boolean {
        TokenService.getInstance().AddToken(purchaser.userId, this.productCategory[this.productId.toString()]);
        PubSubService.getInstance().publish(Token.ProductEvent);
        return true;
    }
};

export class Subscription extends Product implements IProduct {
    static ProductType: string = "Subscription";
    static ProductEvent: string = "SubscriptionEvent";
    private productCategory: Record<string, boolean> = {
        "1": true,
        "2": false
    };

    constructor(productId: number) {
        super(productId);
    }

    buy(purchaser: Purchaser): boolean {
        TokenService.getInstance().UpdateSubscription(purchaser.userId, this.productCategory[this.productId.toString()]);
        PubSubService.getInstance().publish(Subscription.ProductEvent);
        return true;
    }
}; 