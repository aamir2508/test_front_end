import React from 'react';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';


const GroupCallRoomsListItem = ({ room }) => {
  const handleListItemPressed = () => {
    webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId);
  };

  return (
    <div>
      <div className='bg-light p-2 m-1 rounded '>
        <span className='d-block font_weight_500 color_theme'>Name: {room.hostName.username}</span>
        <span className='d-block font_weight_500 color_theme'>Reason:  {room.hostName.userreason}</span>
        <button className='d-block btn btn-primary bg_color_theme width_100' onClick={handleListItemPressed}>Answer</button>
      </div>
    </div>
  );
};

export default GroupCallRoomsListItem;
