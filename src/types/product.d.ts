type Purchaser =  {
    userId: number
};

interface IProduct {
    buy(purchaser: Purchaser): boolean;
}

 