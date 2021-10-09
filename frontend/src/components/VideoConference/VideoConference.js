import React, {useEffect, useState } from 'react';
import Add from '../PrescriptionManagement/Add/Add';

function VideoConference(props) {

  const appointmentID = props.match.params.id
  const [show, setShow] = useState(false)
  const [isDoctor, setIsDoctor] = useState(false)

    function startConference() {
    try {
      const domain = 'meet.jit.si';
      const options = {
        roomName: 'roomName',
        height: 800,
        parentNode: document.getElementById('jitsi-container'),
        interfaceConfigOverwrite: {
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false,
        },
        configOverwrite: {
          disableSimulcast: false,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      api.addEventListener('videoConferenceJoined', () => {
        api.executeCommand('displayName', 'Minindu');
      });
    } catch (error) {
      console.error('Failed to load Jitsi API', error);
    }
  }

  useEffect(() => {

    if (localStorage.getItem("doctorAuthToken")) {
      setIsDoctor(true)
    } else {
      setIsDoctor(false)
    }

    // verify the JitsiMeetExternalAPI constructor is added to the global..
    if (window.JitsiMeetExternalAPI){
      startConference();
    }else {
      alert('Jitsi Meet API script not loaded');
    }
  }, []);

  return (
    <div className="container">
      <div id="jitsi-container" />
      <br/>
      <div align='right'>
      {isDoctor &&
          <input type="submit" value="Prescription" className="form-submit-btn" onClick={()=>setShow(!show)}/>
      }    
      </div>
      <br/>
      <div>
        {
         show?<Add parentToChild = {appointmentID}/>:null      
        }
      </div>
      
    </div>
  );
}

export default VideoConference;
