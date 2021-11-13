import React, { useRef,useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import {setCalldetails} from '../../features/readyCallActivities';
import { useHistory } from 'react-router';
import axios from 'axios';
import {viewProfileAs} from '../../features/profileActivities';

function VideoCallMain(props) {
  const callActivity=useSelector((state)=>state.readyCallActivities.value);
     const selectUser=useSelector((state)=>state.authActivity.user)
       const viewUserAs=useSelector((state)=>state.profileActivity.viewas)
    const [granted,setGranted]=React.useState(false);
    const  dispatch = useDispatch();
        const history = useHistory();
        const ref = useRef(null);

        useEffect(() => {
    setTimeout(() => {
      ref.current.click();
    }, 100); //miliseconds
  }, []);

const handleJoin=()=>{
  videoCallInit();



}

const videoCallInit= async()=>{
     if(viewUserAs.viewas=="1"){
                history.push('/r/' + props.roomId )
  console.log("callActivity.roomstatus "+callActivity.roomstatus);
            }else{
  let roomid=callActivity.roomid;
  let professionid=selectUser.user;
  let userid=callActivity.username ;
  console.log("users "+selectUser.user);
const data = {

            "roomid": roomid,
            "professionid":professionid,
            "userid":userid,
            "jwt":localStorage.getItem("token")
        
            };

  await axios.post('http://localhost:8000/init', data, {
            "headers": {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
          if(typeof response.data !== 'undefined' || response.data.length !== 0 )
          {
           // getAppointments();
           
           setGranted(JSON.stringify(response.data));
            console.log("res from: "+granted+" "+response.data+" "+viewUserAs.viewas);
         
             if(response.data==true){
  dispatch(setCalldetails({...callActivity,roomstatus:"true"}));
  history.push('/r/' + props.roomId )
  console.log("ACT "+callActivity.roomstatus);
  }else{
    alert("Server Not Grantted");
  }
          }
          //  addNotify("Success", JSON.stringify(response));
        }).catch(error => {
           // addNotify("Error", JSON.stringify(error));
            console.log(error.response);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });
            }
}
return(
  <div className="home">
   
    <div>
      <h1 itemProp="headline">Ready to Join with {props.username}?</h1>
      {/* <p>Please enter a room name.</p> */}
      {/* <input type="text" name="room" value={ props.roomId } onChange={props.handleChange} pattern="^\w+$" maxLength="10" required autoFocus title="Room name should only contain letters or numbers."/> */}
      <button ref={ref} className="primary-button" onClick={handleJoin}  >Join</button>
      
      {/* <Link className="primary-button" to={ '/r/' + props.defaultRoomId }>Random</Link> */}
      {/* { props.rooms.length !== 0 && <div>Recently used rooms:</div> } */}
      {/* { props.rooms.map(room => <Link key={room} className="recent-room" to={ '/r/' + room }>{ room }</Link>) } */}
    </div>
  </div>
  );
}
VideoCallMain.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultRoomId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired
};
 
const mapStateToProps = store => ({rooms: store.rooms});

export default connect(mapStateToProps)(VideoCallMain);