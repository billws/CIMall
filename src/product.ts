import { Product, Token, Subscription } from "./products/products";
export default class ProductService {
    productImp: IProduct;

    constructor(productType: string, productId: number){
        switch(productType){
            case Token.ProductType:
                this.productImp = new Token(productId);
                break;
            case Subscription.ProductType:
                this.productImp = new Subscription(productId);
                break;
            default:
                this.productImp = new Product(0);
                break;
        }
    }

    buy(userId: number): boolean {
        let purchaser: Purchaser = {
            userId: userId
        };
        return this.productImp.buy(purchaser);
    }
};
