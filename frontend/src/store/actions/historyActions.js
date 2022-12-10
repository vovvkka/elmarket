import history from "../../../../../taitai/frontend/src/history";

export const historyPush = payload => {
    return () => {
        history.push(payload);
    }
};

export const historyReplace = payload => {
    return () => {
        history.replace(payload);
    }
};