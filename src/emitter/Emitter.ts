class Emitter {
    listeners: {
        [type: string]: ((...args: any) => void)[];
    } = {};

    constructor() {
        this.on = this.on.bind(this);
        this.addListener = this.addListener.bind(this);
        this.emit = this.emit.bind(this);
        this.off = this.off.bind(this);
        this.removeListener = this.removeListener.bind(this);
    }

    addListener(type: string, callback: (...args: any) => void) {
        this.on(type, callback);
    }

    removeListener(type: string, callback: (...args: any) => void) {
        this.off(type, callback);
    }

    off(type: string, callback: (...args: any) => void) {
        if (!(type in this.listeners)) {
            return;
        }
        this.listeners[type] = this.listeners[type].filter(
            (listener) => listener !== callback
        );
    }

    on(type: string, callback: (...args: any) => void) {
        if (type in this.listeners) {
            this.listeners[type].push(callback);
            return;
        }
        this.listeners = { ...this.listeners, [type]: [callback] };
    }

    emit(type: string, ...args: any) {
        if (!(type in this.listeners)) {
            return;
        }
        this.listeners[type].forEach((listener) => {
            if (typeof listener === "function") {
                listener(...args);
            }
        });
    }
}

export default Emitter