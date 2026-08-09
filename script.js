

const buttonGrid = document.getElementById('buttonGrid');

// Replace each placeholder with the path to your own MP3 file.
const soundFiles = [
  'audio/nov-1.mp3', //1
  'audio/nov-2.mp3', //2
  'audio/nov-3.mp3', //3
  'audio/nov-4.mp3', //4
  'audio/nov-5.mp3', //5
  'audio/nov-6.mp3', //6
  'audio/nov-7.mp3', //7
  'audio/nov-8.mp3', //8
  'audio/nov-9.mp3', //9
  'audio/nov-10.mp3', //10
  'audio/nov-11.mp3', //11
  'audio/nov-12.mp3', //12
  'audio/nov-13.mp3', //13
  'audio/nov-14.mp3', //14
  'audio/nov-15.mp3', //15
  'audio/nov-16.mp3', //16
  'audio/nov-17.mp3', //17
  'audio/nov-18.mp3', //18
  'audio/nov-19.mp3', //19
  'audio/nov-20.mp3', //20
  'audio/nov-21.mp3', //21
  'audio/nov-22.mp3', //22
  'audio/nov-23.mp3', //23
  'audio/nov-24.mp3', //24
  'audio/nov-25.mp3', //25
  'audio/nov-26.mp3', //26
  'audio/nov-27.mp3', //27
  'audio/nov-28.mp3', //28
  'audio/nov-29.mp3', //29
  'audio/nov-30.mp3', //30
  'audio/nov-31.mp3', //31
  'audio/nov-32.mp3', //32
  'audio/nov-33.mp3', //33
  'audio/nov-34.mp3', //34
  'audio/nov-35.mp3', //35
];

for (let i = 0; i < soundFiles.length; i += 1) {
  const button = document.createElement('button');
  button.className = 'grid-button';
  button.type = 'button';
  button.setAttribute('aria-label', `Button ${i + 1}`);

  const state = { audio: null, playing: false };

  const stop = () => {
    if (state.audio) {
      state.audio.pause();
      state.audio.currentTime = 0;
    }
    state.playing = false;
    button.classList.remove('playing');
  };

  button.addEventListener('click', () => {
    if (state.playing) {
      stop();
      return;
    }

    const audio = new Audio(soundFiles[i]);
    audio.addEventListener('ended', stop);
    audio.addEventListener('error', stop);
    state.audio = audio;
    state.playing = true;
    button.classList.add('playing');
    audio.play().catch(stop);
  });

  buttonGrid.appendChild(button);
}