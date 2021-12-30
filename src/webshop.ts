import ProductService from "./product";
export default class WebShopService implements IWebShopService {
    buyProduct(userId: number, productType: string, productId: number): boolean {
        let productService = new ProductService(productType, productId);
        return productService.buy(userId);
    }
};