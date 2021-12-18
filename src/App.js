import logo from './logo.svg';
import './App.css';
 

import 'bootstrap/dist/css/bootstrap.css';
import MainHome from './component/Home-Page/MainHome';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProfileView from './component/Profiles/ProfileView';
import PaymentPay from './component/Profiles/PaymentPay';
 
import Room from './component/VideoCall/Containers/RoomPage'
import { VideoCallMainPage } from './component/VideoCall/Containers/VideoCallMainPage';
import SignIn from './component/authentication/SignIn';
import Signup from './component/authentication/Signup';
import Dashboard from './component/dashboard/Appinments';
import DashboardProfile from './component/dashboard/DashboardProfile';
import DashboardHistory from './component/dashboard/DashboardHistory';
import ApplyProfession from './component/dashboard/ApplyProfession';
 import NextCalls from './component/dashboard/NextCalls';
 import Notification from './component/dashboard/Notification';
import RoomPage from './component/VideoCall/Containers/RoomPage';

function App() {
  return (
    <div className="App">
       <Router>
      <div>
        {/* <nav>
          <ul>
            <li> */}
           {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
           <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        
      </li>
   
      </ul>
         </div>
              {/* <Link className="App-menu-item" to="/">Home</Link> */}
              {/* </nav>   */}
             
            {/* </li> */}
            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
            {/* <li>
              <Link to="/profile/:id">My Account</Link>
            </li> */}
          {/* </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.  <Route path="/makecall/:id">*/}
        <Switch>
          <Route path="/payment">
            <PaymentPay />
          </Route>
          <Route path="/makecall">
            <VideoCallMainPage />
          </Route>
          <Route path="/profile/:id">
            <ProfileView />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
            </Route>
            <Route path="/profile">
            <DashboardProfile/>
            </Route>
            <Route path="/history">
            <DashboardHistory/>
            </Route>
            <Route path="/applyprofession">
            <ApplyProfession/>
            </Route>
            <Route path="/r/:room" component={Room} />
             <Route path="/notification">
            <Notification/>
       
         
          </Route>
          <Route path="/calls">
            <NextCalls/>
            </Route>
          <Route path="/">
            <MainHome/>
            </Route>
        </Switch>
      </div>
    </Router>
 
    </div>
  );
}

export default App;
