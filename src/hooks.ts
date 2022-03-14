import {useCallback, useRef, useEffect} from 'react';
import {Emitter} from "./emitter";

const emitter = new Emitter();

// eslint-disable-next-line
const useEmitter = () => {
    return useCallback((type: string, ...args: any) => {
        // eslint-disable-next-line
        // @ts-ignore
        emitter.emit(type, ...args);
    }, []);
};
const useEvent = (type: string, callback: (...args: any) => void) => {
    const ref = useRef(callback);
    useEffect(() => {
        if (ref.current !== callback) {
            ref.current = callback;
        }
    }, [callback, ref]);

    useEffect(() => {
        const call = (...args: any) => {
            if (typeof ref.current === "function") {
                ref.current(...args);
            }
        };
        emitter.addListener(type, call);
        return () => {
            emitter.removeListener(type, call);
        };
    }, [type, ref]);
};

export { useEvent, useEmitter };
