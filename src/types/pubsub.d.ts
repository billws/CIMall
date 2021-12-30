type CallBackFucn = Record<string, Function>;

interface IPubSubService {
    publish<Type>(event: string, arg?: Type): void;
    subscribe(event: string, callback: Function): number;
    unsubscribe(event: string, id: number): boolean;
    clear(): void;
}; 