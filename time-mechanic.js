// Time state variables
let lifeStartTime;
let lifecycleAlpha = 0;
let lifecycleRadiusScale = 1.0;
let growProgress = 0;

const BIRTH_DUR = 10000;
const GROW_DUR = 20000;
const MATURE_DUR = 1800000;
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

function resetInteractionTimer() {
  emotionStartTime = millis(); 
  isDecaying = false;          
  decayProgress = 0;
}

function onEmotionChanged(emotion) {
  resetInteractionTimer();
}

function updateTimeMechanic() {
  updateLifeCycle();
  updateBreathing();
  updateHeartbeat();
  updateEmotionDecay();
}

// 1. Lifecycle: Handles morphological evolution over time
function updateLifeCycle() {
  let age = millis() - lifeStartTime;

  // Stage 1: Birth
  if (age < BIRTH_DUR) {
    lifecycleAlpha = map(age, 0, BIRTH_DUR, 0, 70);
    lifecycleRadiusScale = map(age, 0, BIRTH_DUR, 0.2, 1.0);
    growProgress = 0; 
  } 
  // Stage 2: Growth
  else if (age < BIRTH_DUR + GROW_DUR) {
    lifecycleAlpha = 70;
    lifecycleRadiusScale = 1.0; // Size plateaus while internal features mature
    
    let growAge = age - BIRTH_DUR;
    growProgress = growAge / GROW_DUR; 
  }
  // Stage 3: Maturation
  else if (age < BIRTH_DUR + GROW_DUR + MATURE_DUR) {
    lifecycleAlpha = 70;
    lifecycleRadiusScale = 1.0;
    growProgress = 1.0;
  } 
  // Stage 4: Senescence
  else {
    let ageStart = BIRTH_DUR + GROW_DUR + MATURE_DUR;
    
    lifecycleAlpha = map(age, ageStart, ageStart + AGE_DUR, 70, 20);
    lifecycleAlpha = constrain(lifecycleAlpha, 20, 70);

    lifecycleRadiusScale = map(age, ageStart, ageStart + AGE_DUR, 1.0, 0.6);
    lifecycleRadiusScale = constrain(lifecycleRadiusScale, 0.6, 1.0);
    growProgress = 1.0;
  }
}

function getGrowProgress() {
  return growProgress;
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
    breathSpeed = 0.003;
    breathDepth = 0.01;
  } else {
    breathSpeed = 0.006;
    breathDepth = 0.03;
  }

  breathScale = 1.0 + sin(millis() * breathSpeed) * breathDepth;
}

// 3. Heartbeat: sharp interval pulse
function updateHeartbeat() {
  let beatInterval;

  if (currentEmotion === 'anger')       beatInterval = 1500;
  else if (currentEmotion === 'joy')    beatInterval = 4000;
  else if (currentEmotion === 'sorrow') beatInterval = 7000;
  else                                  beatInterval = 5000;

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
      if (currentEmotion === 'anger')       beatStrength = 0.14;
      else if (currentEmotion === 'joy')    beatStrength = 0.12;
      else if (currentEmotion === 'sorrow') beatStrength = 0.04;
      else                                  beatStrength = 0.06;

      beatScale = 1.0 + sin(PI * beatProgress) * beatStrength;
    } else {
      beatScale = 1.0;
      isBeat = false;
    }
  }
}

// 4. Emotion Decay: timer to fade back to neutral
//Refactored with assistance from Gemini AI to truncate overflowing sound assets and force smooth fallback.
function updateEmotionDecay() {
  if (currentEmotion === 'neutral') {
    decayProgress = 0;
    isDecaying = false;
    return;
  }
  let trackDuration = 107000; 
  let timeElapsed = millis() - emotionStartTime;

  // 2. Trigger decay after the track duration ends
  if (timeElapsed > trackDuration) {
    isDecaying = true;
  }

  if (isDecaying) {
    let decayDuration = 2000; 
    decayProgress = map(timeElapsed, trackDuration, trackDuration + decayDuration, 0, 1);
    decayProgress = constrain(decayProgress, 0, 1);

    if (decayProgress >= 1) {
      currentEmotion = 'neutral';
      
      if (typeof playTrack === 'function') {
        playTrack(0); 
      }
      
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

function getGrowProgress() {
  return growProgress;
}