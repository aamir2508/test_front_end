import * as wss from '../wssConnection/wssConnection';
import store from '../../store/store';
import { setGroupCallActive, setCallState, callStates, setGroupCallIncomingStreams, clearGroupCallData, setCallStartTime } from '../../store/actions/callActions';
import { startRecording } from '../videoRecording/recordingUtils';
import { stopRecording } from '../videoRecording/recordingUtils';

import { pushAuditsData } from '../../utils/Service/Service'


let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
  });

  

  myPeer.on('open', (id) => {
    console.log('succesfully connected with peer server');
    myPeerId = id;
  });

  myPeer.on('call', call => {
    call.answer(store.getState().call.localStream);
    call.on('stream', incomingStream => {
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find(stream => stream.id === incomingStream.id);

      if (!stream) {
        addVideoStream(incomingStream);
      }
    });
  });
};

export const createNewGroupCall = () => {
  console.log("new group created from direct login");
  groupCallHost = true;
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
}
;

export const joinGroupCall = (hostSocketId, roomId) => {
  const localStream = store.getState().call.localStream;
  groupCallRoomId = roomId;

  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    localStreamId: localStream.id
  });

  //logic to start the call time

  store.dispatch(setCallStartTime("tes44445555555555"));
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));

  // logic to record the video once accepted
  startRecording();

  
  
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerId, localStream);

  call.on('stream', (incomingStream) => {
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find(stream => stream.id === incomingStream.id);

    if (!stream) {
      addVideoStream(incomingStream);
    }
  
  });
};

export const auditfunction = () => {
  console.log("#################### end call called");
  console.log("start time$$$$");
  console.log(store.getState());
  const auditObj = {
    callStartTime:'new Date()',
    operatorName: 'operatorname',
    callEndTime:  new Date(),
    reason: store.getState().dashboard.userreason,
    callOrigin: store.getState().dashboard.username
  };
  console.log(auditObj); 
  pushAuditsData(auditObj);
}

//changing this logic to all time host
export const leaveGroupCall = () => {
  console.log("leaveGroupCall");
  console.log(groupCallHost);
  console.log(myPeerId);
  // who ever leave the call audit shoud be triggered
 

    // logic to stop recording
  stopRecording();
  if (groupCallHost) {
  console.log("groupCallHost");
    wss.groupCallClosedByHost({
      peerId: myPeerId
    });
  } else {
  console.log("groupCallHost USER");
  console.log(myPeerId);
  console.log(store.getState().call.localStream.id);
  console.log(groupCallRoomId);
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId,
      peerId: myPeerId
    });
  }
  clearGroupData();
  
};

export const clearGroupData = () => {
  console.log("clearGroupData");
  groupCallRoomId = null;
  groupCallHost = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy();
  connectWithMyPeer();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};


export const removeInactiveStream = (data) => {
    console.log('removeInactiveStream user left');
    console.log(data);
  const groupCallStreams = store.getState().call.groupCallStreams.filter(
    stream => stream.id !== data.streamId
  );
  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

const addVideoStream = (incomingStream) => {
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream
  ];

  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

// if group call is active return roomId if not return false
export const checkActiveGroupCall = () => {
  console.log("check active group call");
  console.log(store.getState().call);
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
}
;
