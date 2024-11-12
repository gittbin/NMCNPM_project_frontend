import ReactAudioPlayer from 'react-audio-player';
import cute from './cute.mp3'
function AudioPlayer() {
  return (
    <div>
      <ReactAudioPlayer
        src={cute}
        autoPlay
        controls
      />
    </div>
  );
}

export default AudioPlayer;
