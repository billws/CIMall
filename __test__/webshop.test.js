import WebShopService from "../dist/webshop";
import PubSubService from "../dist/pubsub";
import TokenService from "../dist/token";


describe("Test WebShopService", () => {
    beforeEach(() => {
        let pubSubService = PubSubService.getInstance();
        pubSubService.clear();
    });

    
    test('buy Token 555 for Id 1', () => {
        let webshopService = new WebShopService();
        webshopService.buyProduct(1, "Token", 2);
        let tokenService = TokenService.getInstance();
        let result = tokenService.GetAll();
        let expected = 161;
        let expectedTwo = 222;
        let expectedTThree = 333;
        expect(result["1"].token).toBe(expected);
        expect(result["2"].token).toBe(expectedTwo);
        expect(result["3"].token).toBe(expectedTThree);
    });

    test('buy subscription for Id 3', () => {
        let webshopService = new WebShopService();
        webshopService.buyProduct(3, "Subscription", 1);
        let tokenService = TokenService.getInstance();
        let result = tokenService.GetAll();
        let expected = true;
        let expectedFalse = false;
        expect(result["1"].hasSubscription).toBe(expectedFalse);
        expect(result["2"].hasSubscription).toBe(expectedFalse);
        expect(result["3"].hasSubscription).toBe(expected);
    });

    test('buy nothing', () => {
        let webshopService = new WebShopService();
        let result = () => webshopService.buyProduct(1, "Car", 2);
        let expected = "Incorrect Product Type.";
        expect(result).toThrow(Error);
        expect(result).toThrow(expected);
    });

    test('buy Token and get publish event', () => {
        let pubSubService = PubSubService.getInstance();
        const mockCallback = jest.fn(x => x);
        let id = pubSubService.subscribe("TokenEvent", mockCallback);
        let webshopService = new WebShopService();
        webshopService.buyProduct(1, "Token", 2);
        expect(mockCallback.mock.calls.length).toBe(1);
    });

    test('buy subscription and get publish event', () => {
        let pubSubService = PubSubService.getInstance();
        const mockCallback = jest.fn(x => x);
        let id = pubSubService.subscribe("SubscriptionEvent", mockCallback);
        let webshopService = new WebShopService();
        webshopService.buyProduct(3, "Subscription", 1);
        expect(mockCallback.mock.calls.length).toBe(1);
    });

});
