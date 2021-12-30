import PubSubService from "../dist/pubsub";

describe("Test PubSubService", () => {
    beforeEach(() => {
        let pubSubService = PubSubService.getInstance();
        pubSubService.clear();
    });

    test('subscribe', () => {
        let pubSubService = PubSubService.getInstance();
        const mockCallback = jest.fn(x => x);
        let result = pubSubService.subscribe("test", mockCallback);
        expect(typeof result).toBe("number");
    });

    test('subscribe and unsubscribe', () => {
        let pubSubService = PubSubService.getInstance();
        const mockCallback = jest.fn(x => x);
        let id = pubSubService.subscribe("test", mockCallback);
        expect(typeof id).toBe("number");
        let result = pubSubService.unsubscribe("test", id);
        let expected = true;
        expect(result).toBe(expected);
    });

    test('subscribe and non exist unsubscribe', () => {
        let pubSubService = PubSubService.getInstance();
        const mockCallback = jest.fn(x => x);
        let id = pubSubService.subscribe("test", mockCallback);
        expect(typeof id).toBe("number");
        let result = pubSubService.unsubscribe("test", id + 1);
        let expected = false;
        expect(result).toBe(expected);
    });

    test('clear and unsubscribe', () => {
        let pubSubService = PubSubService.getInstance();
        pubSubService.clear();
        let result = pubSubService.unsubscribe("test", 111);
        let expected = false;
        expect(result).toBe(expected);
    });

    test('subscribe and publish', () => {
        let pubSubService = PubSubService.getInstance();
        const mockCallback = jest.fn(x => x);
        let id = pubSubService.subscribe("test", mockCallback);
        pubSubService.publish("test");
        pubSubService.publish("test");
        expect(mockCallback.mock.calls.length).toBe(2);
    });

    test('subscribe and unsubscribe and publish', () => {
        let pubSubService = PubSubService.getInstance();
        const mockCallback = jest.fn(x => x);
        let id = pubSubService.subscribe("test", mockCallback);
        let result = pubSubService.unsubscribe("test", id);
        let expected = true;
        expect(result).toBe(expected);
        pubSubService.publish("test");
        expect(mockCallback.mock.calls.length).toBe(0);
    });

    test('publish nothing', () => {
        let pubSubService = PubSubService.getInstance();
        let result = pubSubService.publish("test");
        expect(result).toBe(undefined);
    });

});
