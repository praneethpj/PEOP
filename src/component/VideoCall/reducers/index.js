import { combineReducers } from 'redux';
// Reducers
import roomReducer from './room-reducer';
import audioReducer from './audio-reducer';
import videoReducer from './video-reducer';
import userActivityReducer from '../../../features/userActivities';
import authenticationActivities from '../../../features/authenticationActivities';
import   configurationActivity   from '../../../features/configurationsActivity';

// Combine Reducers
const reducers = combineReducers({
  rooms: roomReducer,
  video: videoReducer,
  audio: audioReducer,
  userActivity:userActivityReducer,
  authActivity:authenticationActivities,
  configActivity:configurationActivity,
});
export default reducers;