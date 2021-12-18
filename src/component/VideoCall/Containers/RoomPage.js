import React, { Component } from 'react';
import MediaContainer from './MediaContainer'
import CommunicationContainer from './CommunicationContainer'
import { connect } from 'react-redux'
 
import io from 'socket.io-client'
import store from '../../../store';
import { useSelector,useDispatch } from 'react-redux'
import {setCalldetails} from '../../../features/readyCallActivities';

class RoomPage extends Component {
  constructor(props) {
    super(props);
    this.getUserMedia = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).catch(e => alert('getUserMedia() error: ' + e.name))
    this.socket = io.connect();
  }
  handleStatus = ()  => { 
      //const callActivity=useSelector((state)=>state.readyCallActivities.value)
    const { dispatch } = this.props;                
      dispatch(setCalldetails({roomstatus:"true"}));
}

  componentDidMount() {
    this.props.addRoom();
   // this.handleStatus();
  }
  render(){
    return (
      <div>
        <MediaContainer media={media => this.media = media} socket={this.socket} getUserMedia={this.getUserMedia} />
        <CommunicationContainer socket={this.socket} media={this.media} getUserMedia={this.getUserMedia} />
      </div>
    );
  }
}
const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
const mapDispatchToProps = (dispatch, ownProps) => (
    {
    
      addRoom: () => store.dispatch({ type: 'ADD_ROOM', room: ownProps.match.params.room })
    }
  );
export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);