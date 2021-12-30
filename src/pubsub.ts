export default class PubSubService implements IPubSubService {
    private static instance?: PubSubService = undefined;
    private subscribeEvents: Record<string, CallBackFucn>;

    private constructor() {
        this.subscribeEvents = {};
    }

    public clear(): void {
        this.subscribeEvents = {};
    }

    public static getInstance(): PubSubService {
        if (this.instance === undefined) {
            this.instance = new PubSubService();
        }

        return this.instance;
    }

    public publish<Type>(event: string, arg?: Type): void {
        const events = this.subscribeEvents[event];

        if (events === undefined) {
            return;
        }

        Object.keys(events).forEach((key) => events[key](arg));
    }

    public subscribe(event: string, callback: Function): number {
        const id = Date.now();
        if (!this.subscribeEvents[event]) {
            this.subscribeEvents[event] = {};
        }
        this.subscribeEvents[event][id] = callback;
        return id;
    }

    public unsubscribe(event: string, id: number): boolean {
        const events = this.subscribeEvents[event];

        if (events === undefined) {
            return false;
        }

        if (Object.prototype.hasOwnProperty.call(events, id)) {
            delete events[id];
            if (Object.keys(this.subscribeEvents[event]).length === 0) {
                delete this.subscribeEvents[event];
            }
            return true;
        }
        return false;
    }

};