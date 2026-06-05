// Time state variables
let lifeStartTime;
let lifecycleAlpha = 0;
let lifecycleRadiusScale = 1.0;

const BIRTH_DUR = 10000;
const GROW_DUR = 20000;
const MATURE_DUR = 30000;
const AGE_DUR = 30000;

let breathScale = 1.0;

let lastBeatTime = 0;
let beatScale = 1.0;
let isBeat = false;
let beatStartTime = 0;
const BEAT_DUR = 400;

let emotionStartTime = 0;
let emotionDecayDelay = 0;
let isDecaying = false;
let decayProgress = 0;

function initTimeMechanic() {
  lifeStartTime = millis();
  lastBeatTime = millis();
}

function onEmotionChanged(emotion) {
  emotionStartTime = millis();
  isDecaying = false;
  decayProgress = 0;

  if (emotion === 'anger')  emotionDecayDelay = 8000;
  else if (emotion === 'joy')    emotionDecayDelay = 10000;
  else if (emotion === 'sorrow') emotionDecayDelay = 15000;
  else                           emotionDecayDelay = 0;
}

function updateTimeMechanic() {
  updateLifeCycle();
  updateBreathing();
  updateHeartbeat();
  updateEmotionDecay();
}

// 1. Lifecycle: handles fade-in/out and sizing over time
function updateLifeCycle() {
  let age = millis() - lifeStartTime;

  if (age < BIRTH_DUR) {
    lifecycleAlpha = map(age, 0, BIRTH_DUR, 0, 70);
    lifecycleRadiusScale = map(age, 0, BIRTH_DUR, 0.2, 1.0);
  } 
  else if (age < BIRTH_DUR + GROW_DUR + MATURE_DUR) {
    lifecycleAlpha = 70;
    lifecycleRadiusScale = 1.0;
  } 
  else {
    let ageStart = BIRTH_DUR + GROW_DUR + MATURE_DUR;
    lifecycleAlpha = map(age, ageStart, ageStart + AGE_DUR, 70, 20);
    lifecycleAlpha = constrain(lifecycleAlpha, 20, 70);

    lifecycleRadiusScale = map(age, ageStart, ageStart + AGE_DUR, 1.0, 0.6);
    lifecycleRadiusScale = constrain(lifecycleRadiusScale, 0.6, 1.0);
  }
}

// 2. Breathing: continuous loop based on emotion speed/depth
function updateBreathing() {
  let breathSpeed, breathDepth;

  if (currentEmotion === 'anger') {
    breathSpeed = 0.022;
    breathDepth = 0.06;
  } else if (currentEmotion === 'joy') {
    breathSpeed = 0.018;
    breathDepth = 0.08;
  } else if (currentEmotion === 'sorrow') {
    breathSpeed = 0.008;
    breathDepth = 0.02;
  } else {
    breathSpeed = 0.015;
    breathDepth = 0.04;
  }

  breathScale = 1.0 + sin(millis() * breathSpeed) * breathDepth;
}

// 3. Heartbeat: sharp interval pulse
function updateHeartbeat() {
  let beatInterval;

  if (currentEmotion === 'anger')       beatInterval = 1500;
  else if (currentEmotion === 'joy')    beatInterval = 2000;
  else if (currentEmotion === 'sorrow') beatInterval = 4000;
  else                                  beatInterval = 3000;

  if (!isBeat && millis() - lastBeatTime > beatInterval) {
    isBeat = true;
    beatStartTime = millis();
    lastBeatTime = millis();
  }

  if (isBeat) {
    let beatAge = millis() - beatStartTime;
    let beatProgress = beatAge / BEAT_DUR;

    if (beatProgress < 1.0) {
      let beatStrength;
      if (currentEmotion === 'anger')       beatStrength = 0.18;
      else if (currentEmotion === 'joy')    beatStrength = 0.14;
      else if (currentEmotion === 'sorrow') beatStrength = 0.04;
      else                                  beatStrength = 0.08;

      beatScale = 1.0 + sin(PI * beatProgress) * beatStrength;
    } else {
      beatScale = 1.0;
      isBeat = false;
    }
  }
}

// 4. Emotion Decay: timer to fade back to neutral
function updateEmotionDecay() {
  if (currentEmotion === 'neutral') {
    decayProgress = 0;
    isDecaying = false;
    return;
  }

  let timeSinceChange = millis() - emotionStartTime;

  if (timeSinceChange > emotionDecayDelay) {
    isDecaying = true;
  }

  if (isDecaying) {
    let decayDuration = 5000;
    decayProgress = map(timeSinceChange, emotionDecayDelay, emotionDecayDelay + decayDuration, 0, 1);
    decayProgress = constrain(decayProgress, 0, 1);

    if (decayProgress >= 1) {
      currentEmotion = 'neutral';
      decayProgress = 0;
      isDecaying = false;
    }
  }
}

// Helpers for sketch.js rendering
function getTimedRadius(base) {
  return (base * lifecycleRadiusScale) * breathScale * beatScale;
}

function getDecayedNoiseAmp(emotionAmp, neutralAmp) {
  return lerp(emotionAmp, neutralAmp, decayProgress);
}

function getLifecycleAlpha() {
  return lifecycleAlpha;
}