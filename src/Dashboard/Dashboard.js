import React, { useEffect } from 'react';
import logo from '../resources/logo.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from './components/DashboardInformation/DashboardInformation';
import { callStates } from '../store/actions/callActions';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
import GroupCall from './components/GroupCall/GroupCall';
import NavbarLocal from '../Navbar/Navbar';


import './Dashboard.css';

const Dashboard = ({ username, callState }) => {
  useEffect(() => {
    console.log("Dashboard $$$$$");
    console.log(username);
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);
  

  return (
    // old start
    // <div className='dashboard_container background_main_color'>
    //   <div className='dashboard_left_section'>
    //     <div className='dashboard_content_container'>
    //       <DirectCall />
    //       <GroupCall />
    //       {callState !== callStates.CALL_IN_PROGRESS && username.usertype === "OPERATOR" && <DashboardInformation username={username.username} />}
    //     </div>
    //     <div className='dashboard_rooms_container background_secondary_color'>
    //       <GroupCallRoomsList />
    //     </div>
    //   </div>
    //   <div className='dashboard_right_section background_secondary_color'>
    //     <div className='dashboard_active_users_list'>
    //       {/* {username.usertype === "OPERATOR" && <ActiveUsersList />} */}
    //     </div>
    //     <div className='dashboard_logo_container'>
    //       <img className='dashboard_logo_image' src={logo} />
    //     </div>
    //   </div>
    // </div>
    // old end
    <div>
     <NavbarLocal /> 
    <div className='bg_color_theme'>
      <div className='col-12 row height_90'>
        {/* // Call Pending */}
        <div className='col-3 pt-1 px-0'>
          {/* <span>Active</span> */}
          {/* <GroupCallRoomsList /> */}
          {username.usertype === "OPERATOR" && <GroupCallRoomsList />}
        </div>
        {/* // video section */}
        <div className='col-9'>
          {/* <span>Video</span> */}
          <DirectCall />
          <GroupCall />
        </div>
        
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(Dashboard);
