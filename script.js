

const buttonGrid = document.getElementById('buttonGrid');

// Replace each placeholder with the path to your own MP3 file.
const soundFiles = [
  'audio/nov-1.m4a', //1
  'audio/nov-2.m4a', //2
  'audio/nov-3.m4a', //3
  'audio/nov-4.m4a', //4
  'audio/nov-5.m4a', //5
  'audio/nov-6.m4a', //6
  'audio/nov-7.m4a', //7
  'audio/nov-8.m4a', //8
  'audio/nov-9.m4a', //9
  'audio/nov-10.m4a', //10
  'audio/nov-11.m4a', //11
  'audio/nov-12.m4a', //12
  'audio/nov-13.m4a', //13
  'audio/nov-14.m4a', //14
  'audio/nov-15.m4a', //15
  'audio/nov-16.m4a', //16
  'audio/nov-17.m4a', //17
  'audio/nov-18.m4a', //18
  'audio/nov-19.m4a', //19
  'audio/nov-20.m4a', //20
  'audio/nov-21.m4a', //21
  'audio/nov-22.m4a', //22
  'audio/nov-23.m4a', //23
  'audio/nov-24.m4a', //24
  'audio/nov-25.m4a', //25
  'audio/nov-26.m4a', //26
  'audio/nov-27.m4a', //27
  'audio/nov-28.m4a', //28
  'audio/nov-29.m4a', //29
  'audio/nov-30.m4a', //30
  'audio/nov-31.m4a', //31
  'audio/nov-32.m4a', //32
  'audio/nov-33.m4a', //33
  'audio/nov-34.m4a', //34
  'audio/nov-35.m4a', //35
];

const specialSoundPath = 'audio/special.mp3';
const spaceState = { held: false };

const updateSpaceButtonState = () => {
  const buttons = buttonGrid.querySelectorAll('.grid-button');
  buttons.forEach((button) => {
    button.classList.toggle('space-active', spaceState.held);
  });
};

// Touch: block long-press menus and multi-finger pinch zoom.
window.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener(
  'touchmove',
  (event) => {
    if (event.touches.length > 1) event.preventDefault();
  },
  { passive: false }
);

// Browsers only allow fullscreen and audio after a user gesture. Every sound is
// created and preloaded up front so a tap can call play() immediately, while the
// browser still counts it as a user gesture.
const requestFullscreen = () => {
  const root = document.documentElement;
  if (document.fullscreenElement || document.webkitFullscreenElement) return;
  const request = root.requestFullscreen || root.webkitRequestFullscreen;
  if (request) {
    Promise.resolve(request.call(root, { navigationUI: 'hide' })).catch(() => {});
  }
};

const createAudio = (path) => {
  const audio = new Audio(path);
  audio.preload = 'auto';
  audio.setAttribute('playsinline', '');
  audio.load();
  return audio;
};

// Rewinds and plays from inside the tap handler. Returns the play() promise.
const playFromStart = (audio) => {
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch (error) {
    // Some WebViews throw if the file hasn't loaded metadata yet; play anyway.
  }
  return Promise.resolve(audio.play());
};

const flashError = (button, path, error) => {
  console.warn(`Could not play ${path}:`, error);
  button.classList.add('error');
  setTimeout(() => button.classList.remove('error'), 600);
};

const specialAudio = createAudio(specialSoundPath);

// Fullscreen is re-requested on every touch in case the player swiped out of it.
// This runs after the button's own click handler, so the sound has already started.
window.addEventListener('click', requestFullscreen);

// Try fullscreen immediately too; works when launched from a home-screen shortcut
// or kiosk browser that permits it, and is silently ignored otherwise.
requestFullscreen();

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    if (!spaceState.held) {
      spaceState.held = true;
      updateSpaceButtonState();
    }
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    spaceState.held = false;
    updateSpaceButtonState();
  }
});

for (let i = 0; i < soundFiles.length; i += 1) {
  const button = document.createElement('button');
  button.className = 'grid-button';
  button.type = 'button';
  button.setAttribute('aria-label', `Button ${i + 1}`);

  const audio = createAudio(soundFiles[i]);
  let playing = false;

  const stop = () => {
    audio.pause();
    playing = false;
    button.classList.remove('playing');
  };

  audio.addEventListener('ended', stop);

  button.addEventListener('click', () => {
    if (spaceState.held) {
      playFromStart(specialAudio).catch((error) =>
        flashError(button, specialSoundPath, error)
      );
      return;
    }

    if (playing) {
      stop();
      return;
    }

    playing = true;
    button.classList.add('playing');
    playFromStart(audio).catch((error) => {
      stop();
      flashError(button, soundFiles[i], error || audio.error);
    });
  });

  buttonGrid.appendChild(button);
}
