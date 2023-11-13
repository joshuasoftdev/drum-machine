import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const sounds = [
  { key: 'Q', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', name: 'Heater 1' },
  { key: 'W', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', name: 'Heater 2' },
  { key: 'E', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', name: 'Heater 3' },
  { key: 'A', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', name: 'Heater 4' },
  { key: 'S', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', name: 'Clap' },
  { key: 'D', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', name: 'Open-HH' },
  { key: 'Z', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', name: 'Kick-n-Hat' },
  { key: 'X', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', name: 'Kick' },
  { key: 'C', mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', name: 'Closed-HH' },
];

function App() {
  const [displayText, setDisplayText] = useState('');
  const audioRefs = useRef([]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();
      const sound = sounds.find(sound => sound.key === key);
      if (sound) {
        playSound(audioRefs.current[sound.key], sound.name);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const playSound = (audio, name) => {
    audio.currentTime = 0;
    audio.play();
    setDisplayText(name);
  };

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      {sounds.map((sound, i) => (
        <button key={i} className="drum-pad" id={sound.key} onClick={() => playSound(audioRefs.current[sound.key], sound.name)}>
          {sound.key}
          <audio ref={ref => audioRefs.current[sound.key] = ref} src={sound.mp3} className="clip" id={sound.key}></audio>
        </button>
      ))}
    </div>
  );
}

export default App;