import { createStore } from 'redux';
import reducers from './component/VideoCall/reducers';

//This is stored the data
const mapStoreToStorage = () =>
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
const persistedState = localStorage.getItem('reduxState')
	? JSON.parse(localStorage.getItem('reduxState'))
	: {
		rooms: [],
		video: true,
		audio: true
	};
const store = createStore(reducers, persistedState);
store.subscribe(mapStoreToStorage);
export default store;