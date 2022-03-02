let audioCtx, listener, listenerPosition;
let themesong;

function startThemeSong() {
    let gainNode = audioCtx.createGain();
    gainNode.gain.value = .4;

    themesong = getAudioData('./assets/themesong.wav', gainNode);
    themesong.start();
}

function stopThemeSong() {
    themesong.stop();
}

function initBinauralAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    listener = audioCtx.listener;
    listenerPosition = [width/2, height/2, 100];
    listener.setPosition(listenerPosition[0], listenerPosition[1], listenerPosition[2]);
    listener.setOrientation(0, 1, 0, 0, 0, 1);

    for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].createAudioNodes();
    }
    startThemeSong();
}

function initMultichannelAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.destination.channelCount = 16;
    listener = audioCtx.listener;
    listenerPosition = [width/2, height/2, 100];
    listener.setPosition(listenerPosition[0], listenerPosition[1], listenerPosition[2]);
    listener.setOrientation(0, 1, 0, 0, 0, 1);

    for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].createAudioNodes(multichannel=true);
    }
    startThemeSong();
}

function drawListener() {
    stroke(255, 255, 255, 80)
    noFill();
    point(listenerPosition[0], listenerPosition[1]);
    circle(listenerPosition[0], listenerPosition[1], 40);
}
  
function getAudioData(filePath, gainNode) {
    var source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      var audioData = request.response;
      audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
          source.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          source.loop = true;
        },
        function(e){ console.log("Error with decoding audio data" + e.err); });
    }
    request.send();
    return source;
  }

function getAudioDataBinaural(filePath, pannerNode, gainNode) {
    var source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      var audioData = request.response;
      audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
          source.connect(pannerNode);
          pannerNode.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          source.loop = true;
        },
        function(e){ console.log("Error with decoding audio data" + e.err); });
    }
    request.send();
    return source;
}

function getAudioDataMultichannel(filePath, gainNodes, multichannelMerger) {
    var source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      var audioData = request.response;
      audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
          for (let i = 0; i < gainNodes.length; i++) {
            gainNodes[i].gain.value = 0.2;
            source.connect(gainNodes[i]);
            gainNodes[i].connect(multichannelMerger, 0, i);
          }
          multichannelMerger.connect(audioCtx.destination);
          source.loop = true;
        },
        function(e){ console.log("Error with decoding audio data" + e.err); });
    }
    request.send();
    return source;
}

function updateBinauralPanner(i) {
    soundObjects[i].pannerNode.setPosition(soundObjects[i].x, soundObjects[i].y, 0);
}

// let multichannelPannerPositions = [{x: 0, y: 0}, {x: 1600, y: 0}, {x: 0, y: 1000}, {x: 1600, y: 1000}]
let multichannelPannerPositions = [{x: 200, y: 200}, {x: 1400, y: 200}, {x: 200, y: 800}, {x: 1400, y: 800}]
function updateMultichannelPanner(i) {
    let distances = [];
    let volumes = [];
    let rolloffFactor = 3;
    let alpha = (6 / (20 * Math.log10(2))) * rolloffFactor;

    for (let j = 0; j < multichannelPannerPositions.length; j++) {
        distances[j] = Math.sqrt(Math.pow(soundObjects[i].x - multichannelPannerPositions[j].x, 2) + Math.pow(soundObjects[i].y - multichannelPannerPositions[j].y, 2) + 1)
    }

    let k = 1 / (Math.sqrt(
        (1 / (Math.pow(distances[0], 2 * alpha))) + 
        (1 / (Math.pow(distances[1], 2 * alpha))) + 
        (1 / (Math.pow(distances[2], 2 * alpha))) + 
        (1 / (Math.pow(distances[3], 2 * alpha)))
    ));

    let intensity = 0;
    for (let j = 0; j < multichannelPannerPositions.length; j++) {
        volumes[j] = k / Math.pow(distances[j], alpha)
        intensity += Math.pow(volumes[j], 2)
    }
    for (let j = 0; j < multichannelPannerPositions.length; j++) {
        volumes[j] /= intensity;
        soundObjects[i].gainNodes[j].gain.value = volumes[j];
    }
}

function drawMultichannelPanner() {
    strokeWeight(2);
    stroke(255, 255, 255, 5);
    noFill();
    for (let i = 0; i < multichannelPannerPositions.length; i++) {
        circle(multichannelPannerPositions[i].x, multichannelPannerPositions[i].y, 20);
        circle(multichannelPannerPositions[i].x, multichannelPannerPositions[i].y, 40);
        circle(multichannelPannerPositions[i].x, multichannelPannerPositions[i].y, 60);
        circle(multichannelPannerPositions[i].x, multichannelPannerPositions[i].y, 80);
    }
}