export function createStore(initialState) {
    let state = initialState;
    /** @type {Set<Function>} */
    const listeners = new Set();

    function getState() {
        return state;
    }

    function setState(updater) {
        state = typeof updater === "function" ? updater(state) : updater;
        for (const fn of listeners) fn(state);
    }

    function subscribe(fn) {
        listeners.add(fn);
        return () => listeners.delete(fn);
    }

    return { getState, setState, subscribe };
}
