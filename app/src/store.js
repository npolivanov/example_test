import {createStore} from 'redux'
function reducer ( state, action ) {
    switch( action.type ) {
        case 'ADD_ITEMS':
            return {...state, 
                ...{users: state.users.concat(action.payload) }
        }
        case 'SEARCH_ITEMS':
            return {...state, 
                ...{users: action.payload }
        }
        default:
            return state
    }
}

const store = createStore(reducer, {
    users: []
});

export default store;