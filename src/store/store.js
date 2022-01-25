import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './user/reducer';
import { churchReducer } from './church/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	church: churchReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
