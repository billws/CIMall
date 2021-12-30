import TokenService from "../dist/token";

describe("Test TokenService", () => {

    test('empty', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.Get();
        let expected = undefined;
        expect(result).toBe(expected);
    });

    test('get 3', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.Get(3);
        let expected = "three";
        expect(result.username).toBe(expected);
    });

    test('get all', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.GetAll();
        let expectedCount = 3;
        let expectedSecondToken = 222;
        expect(Object.keys(result).length).toBe(expectedCount);
        expect(result["2"].token).toBe(expectedSecondToken);
    });

    test('get 2 balnaces', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.GetBalances(2);
        let expected = 2222;
        expect(result).toBe(expected);
    });

    test('get 4 balnaces', () => {
        let tokenService = TokenService.getInstance();
        let result = () => tokenService.GetBalances(4);
        let expected = "Not exist.";
        expect(result).toThrow(Error);
        expect(result).toThrow(expected);
    });

    test('get total balnaces', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.GetAllBalances();
        let expected = 6666;
        expect(result).toBe(expected);
    });

    test('1 give 2 111 successful', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.Transfer(1, 2, 111);
        let allTokens = tokenService.GetAll();
        let expected = true;
        let expectedOneToken = 0;
        let expectedTwoToken = 333;
        expect(result).toBe(expected);
        expect(allTokens["1"].token).toBe(expectedOneToken);
        expect(allTokens["2"].token).toBe(expectedTwoToken);
    });

    test('1 give 3 111 but failed', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.Transfer(1, 3, 111);
        let allTokens = tokenService.GetAll();
        let expected = false;
        let expectedOneToken = 0;
        let expectedThreeToken = 333;
        expect(result).toBe(expected);
        expect(allTokens["1"].token).toBe(expectedOneToken);
        expect(allTokens["3"].token).toBe(expectedThreeToken);
    });

    test('add 50 token to 1', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.AddToken(1, 50);
        let allTokens = tokenService.GetAll();
        let expected = true;
        let expectedOneToken = 50;
        expect(result).toBe(expected);
        expect(allTokens["1"].token).toBe(expectedOneToken);
    });

    test('add 50 token to 4', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.AddToken(4, 50);
        let expected = false;
        expect(result).toBe(expected);
    });

    test('update 2 hasSubscription to true', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.UpdateSubscription(2, true);
        let allTokens = tokenService.GetAll();
        let expected = true;
        let expectedtwoSub = true;
        expect(result).toBe(expected);
        expect(allTokens["2"].hasSubscription).toBe(expectedtwoSub);
    });

    test('update 4 hasSubscription to true', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.UpdateSubscription(4, true);
        let expected = false;
        expect(result).toBe(expected);
    });

    test('2 equal 3, 1 left 50, 2 sub is true, other is false', () => {
        let tokenService = TokenService.getInstance();
        let result = tokenService.GetAll();
        let expectedOneLeft = 50;
        let expectedOneAndThreeSub = false;
        let expectedTwoSub = true;
        expect(result["2"].token).toBe(result["3"].token);
        expect(result["1"].token).toBe(expectedOneLeft);
        expect(result["1"].hasSubscription).toBe(expectedOneAndThreeSub);
        expect(result["3"].hasSubscription).toBe(expectedOneAndThreeSub);
        expect(result["2"].hasSubscription).toBe(expectedTwoSub);
    });
});
