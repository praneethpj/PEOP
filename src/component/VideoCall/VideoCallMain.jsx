import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VideoCallMain = props =>

  <div className="home">
   
    <div>
      <h1 itemProp="headline">Ready to Join with {props.username}?</h1>
      {/* <p>Please enter a room name.</p> */}
      {/* <input type="text" name="room" value={ props.roomId } onChange={props.handleChange} pattern="^\w+$" maxLength="10" required autoFocus title="Room name should only contain letters or numbers."/> */}
      <Link className="primary-button" to={ '/r/' + props.roomId }>Join</Link>
      {/* <Link className="primary-button" to={ '/r/' + props.defaultRoomId }>Random</Link> */}
      {/* { props.rooms.length !== 0 && <div>Recently used rooms:</div> } */}
      {/* { props.rooms.map(room => <Link key={room} className="recent-room" to={ '/r/' + room }>{ room }</Link>) } */}
    </div>
  </div>;

VideoCallMain.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultRoomId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired
};
 
const mapStateToProps = store => ({rooms: store.rooms});

export default connect(mapStateToProps)(VideoCallMain);