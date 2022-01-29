import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './user/reducer';
import { churchReducer } from './church/reducer';
import { formReducer } from './form/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	church: churchReducer,
	form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
