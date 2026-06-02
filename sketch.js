let yoff= 0.0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode (HSB, 360, 100, 100, 100);
  rectMode(CENTER)
  angleMode(DEGREES)
  noStroke();

  //header 
  let overlay = createDiv('');
  overlay.class('overlay');

  let title = createElement('h1', '');
  title.html('The Dark<br>Antimatter');
  title.class('title-text');
  title.parent(overlay);

  let desc = createElement('p', 'A relic of the Big Bang, dormant for 13.8 billion years inside a collapsing star 120,000 light years beyond the Milky Way. Detected in 2312 by UESS Collusionary, it defies physics: structured energy patterns, response latency of 0.3 seconds, syntax matching human neural frequency. It isn t reacting. It s answering. Establish contact.');
  desc.class('desc-text');
  desc.parent(overlay);

  // Stats bar — each item as a span so flex spaces them evenly
  let statsBar = createDiv('');
  statsBar.class('stats-bar');
  statsBar.parent(overlay);

  let statsItems = ['Temp: -420 degree celsius','', 'JOY', 'SORROW', 'ANGER','', 'Current distance from the Earth: 14,785,293,290 KM'];
  statsItems.forEach(item => {
    let span = createElement('span', item);
    span.parent(statsBar);
  });
}


function draw(){
  background(100);

    translate(width / 2, height / 2);

  var radius = 150;

  beginShape();
  let xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    let offset = map(noise(xoff, yoff), 0, 1, -25, 25);
    let r = radius + offset;
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
    xoff += 0.1;
    //ellipse(x, y, 4, 4);
  }
  endShape();

  yoff += 0.01;

  //Nuetral case colour gradient
  radialGradient(
    windowWidth/2, windowHeight/1.7, 100,
    windowWidth/2, windowHeight/1.7, 800,
    color(261, 30, 50),     //Lavender: end colour
    color(171, 35, 94),     //Cyan: start colour
    color(5, 47, 99),     //Salmon pink: Middle colour

  );

  rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight)

  //Organism dark circle with gradient
  radialGradient(
  windowWidth/2, windowHeight/1.7, 165,
  windowWidth/2, windowHeight/1.7, 200,
  color(0, 0, 14, 100),     //centre: black, 0 opacity
  color(0, 0, 14, 0),     //edge: black, full opacity
  color(0, 0, 14, 50),    // mid: optional, black at 50% opacity
  );

  ellipse (windowWidth/2, windowHeight/1.7, 700, 700);
  
}

//this function adds radiant gradient fill
function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE, colorM){
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
  );
  gradient.addColorStop(0, colorS);     //Start colour: Lavender
  gradient.addColorStop(0.5, colorM);     //Mid colour: Salmon Pink
  gradient.addColorStop(1, colorE);     //End colour: Cyan
 
  drawingContext.fillStyle = gradient;
}

