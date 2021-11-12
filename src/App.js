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
import Dashboard from './component/dashboard/Appinments';
import DashboardProfile from './component/dashboard/DashboardProfile';
import DashboardHistory from './component/dashboard/DashboardHistory';
import ApplyProfession from './component/dashboard/ApplyProfession';
 import NextCalls from './component/dashboard/NextCalls';

function App() {
  return (
    <div className="App">
       <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
            {/* <li>
              <Link to="/profile">Profile</Link>
            </li> */}
          </ul>
        </nav>

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
              <Route path="/calls">
            <NextCalls/>
            </Route>
          <Route path="/r/:room" component={Room} />
				{/* <Route path="*" component={NotFound} /> */}
          <Route path="/">
            <MainHome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
    </div>
  );
}

export default App;
