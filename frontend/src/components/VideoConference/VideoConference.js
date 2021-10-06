import React, { useState, useEffect } from 'react';

function VideoConference() {

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
    </div>
  );
}

export default VideoConference;