export default function combineReducers(reducers) {
    return function combination(state = {}, action) {
        let nextState = {};
        let hasChanged = false;

        for (let key in reducers) {
            const reducer = reducers[key];
            const nextStateForKey = reducer(state[key], action);
            if (typeof nextStateForKey === 'undefined') {
                return console.error('error');
            }
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextState[key] !== state[key];
        }

        hasChanged =
            hasChanged || Object.keys(nextState).length !== Object.keys(state).length;

        return hasChanged ? nextState : state;
    };
}
// 暗号： 毛里塔尼亚