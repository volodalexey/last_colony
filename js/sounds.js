var sounds = {
  list: {
    "bullet": ['gun'],
    "heatseeker": ["heatseeker1", "heatseeker2"],
    "fireball": ["laser1", "laser2"],
    "cannon-ball": ["cannon1", "cannon2"],
    "message-received": ["message"],
    "acknowledge-attacking": ["engaging"],
    "acknowledge-moving": ["yup", "roger1", "roger2"]
  },
  loaded: {},
  contextAudio: null,
  wrapBufferSource: function(buffer) {
    var source = sounds.contextAudio.createBufferSource();
    source.buffer = buffer;
    return source;
  },
  init: function(volume) {
    sounds.contextAudio = new AudioContext();
    sounds.volumeGain = sounds.contextAudio.createGain();
    sounds.volumeGain.gain.value = volume;
    sounds.volumeGain.connect(sounds.contextAudio.destination);

    Object.keys(sounds.list).forEach(function(soundName) {
      var sound = {
        buffers: []
      };
      sounds.list[soundName].forEach(function(file_name) {
          loader.loadAudio('audio/' + file_name + loader.soundFileExtn, function(err, raw_buffer) {
            if (err) {
              return console.error(err);
            }

            sounds.contextAudio.decodeAudioData(raw_buffer, function(buffer) {
              sound.buffers.push(buffer)
            }, function(err) {
              console.error(err);
            });
          })
      });
      sounds.loaded[soundName] = sound;
    });
  },
  play: function(soundName) {
    var sound = sounds.loaded[soundName];
    if (!sound) {
      return new Error();
    }
    var buffers = sound.buffers, buffers_len = buffers.length;
    if (buffers_len) {
      if (!sound.counter || sound.counter >= buffers_len) {
        sound.counter = 0;
      }
      var bufferSource = sounds.wrapBufferSource(sound.buffers[sound.counter]);
      bufferSource.connect(sounds.volumeGain);
      sound.counter++;
      bufferSource.start(0);
    }
  }
};
