import history from "../../history";

export const historyPush = payload => {
    return () => {
        history.push(payload);
        console.log('pushed');
    }
};

export const historyReplace = payload => {
    return () => {
        history.replace(payload);
    }
};