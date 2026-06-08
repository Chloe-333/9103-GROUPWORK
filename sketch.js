function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();
  initTimeMechanic();
  //header
  let overlay = createDiv('');
  overlay.class('overlay');

  //title or a name for our concept
  let title = createElement('h1', '');
  title.html('The Dark<br>Antimatter');
  title.class('title-text');
  title.parent(overlay);

  //using storytelling to add context to the concept
  let desc = createElement(
    'p',
    "A relic of the Big Bang, dormant for 13.8 billion years inside a collapsing star 120,000 light years beyond the Milky Way. Detected in 2312 by UESS Collusionary, it defies physics: structured energy patterns, response latency of 0.3 seconds, syntax matching human neural frequency. It isn't reacting. It's answering. Establish contact."
  );
  desc.class('desc-text');
  desc.parent(overlay);

  // Stats bar — each item as a span so flex spaces them evenly
  let statsBar = createDiv('');
  statsBar.class('stats-bar');
  statsBar.parent(overlay);

  let statsItems = [
    'Temp: -420 degree celsius',
    '44678',
    'Collusion: not detected',
    'Force: CENTRIFUGAL',
    'Current distance from the Earth: 14,785,293,290 KM'
  ];

  statsItems.forEach(item => {
    let span = createElement('span', item);
    span.parent(statsBar);
  });


// play music when image loaded
 playTrack(0);
 initAudio();
}

function draw() {
  background(100);
  updateTimeMechanic();

  drawEmotionBackground();
  noStroke();
  rect(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  drawCircles();
  drawJoySprays();

  if (currentEmotion === "anger") {
    drawIdleAngerLasers();
  }

  mouseHover();

  drawAngerLasers();
  drawOrganism();
  drawTears();
  drawRipples();
  drawInstructions();
}

//changing background gradient argument using if, else if and else
function drawEmotionBackground() {
  //Audio drives background radius: bass energy expands the gradient
  // AI Acknowledgement 5: Audio-driven background gradient
  let bassEnergy = getBassEnergy();
  let gradientRadius = map(bassEnergy, 0, 255, 700, 1000);
  
  if (currentEmotion === "joy") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, gradientRadius,
      color(260, 95, 95),
      color(50, 70, 100),
      color(320, 65, 85)
    );
  }

  else if (currentEmotion === "sorrow") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, gradientRadius,
      color(170, 35, 88),
      color(0, 0, 14),
      color(220, 20, 68)
    );
  }

  else if (currentEmotion === "anger") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, gradientRadius,
      color(260, 22, 48),
      color(5, 75, 100),
      color(320, 65, 85)
    );
  }

  else {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, gradientRadius,
      color(261, 30, 50),
      color(171, 35, 94),
      color(5, 47, 99)
    );
  }
}






