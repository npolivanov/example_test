import { createStore } from "redux";
function reducer(state, action) {
    switch (action.type) {
        case "ADD_ITEMS":
            return {
                ...state,
                ...{ users: state.users.concat(action.payload) },
            };
        case "SEARCH_ITEMS":
            return { ...state, ...{ users: action.payload } };
        case "EDITOR_ITEMS":
            return {
                ...state,
                ...{
                    users: state.users.map(function(item) {
                        if (item.id === action.payload.id) {
                            item = action.payload.item;
                        }
                        return item;
                    }),
                },
            };
        default:
            return state;
    }
}

const store = createStore(reducer, {
    users: [],
});

export default store;
