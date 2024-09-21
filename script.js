let answers = [
    "Go for it", "Absolutely certain", "Unquestionable fact", 
    "Without a doubt", "Better not tell you now", "Try again later", 
    "Can't reveal that just yet", "Let's save that for another time", 
    "Wouldn't bet on that", "Unlikely to happen", "Far from certain", 
    "Chances are slim"
];
let currentAnswer = "Stay (in) decisive";
let minDimension;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    minDimension = min(width, height);
    textFont('Jacquarda ');
}

function draw() {
    clear();
    
    // Outer horizontal gradient circle
    drawHorizontalGradientCircle(width/2, height/2, minDimension * 0.75);
    
    // Middle circle
    drawOutlineCircle(width/2, height/2, minDimension * 0.71);
    
    // Inner vertical gradient circle
    drawVerticalGradientCircle(width/2, height/2, minDimension * 0.5);
    
    // Blue gradient triangle
    drawGradientTriangle(width/2, height/2, minDimension * 0.125);
    
    // Answer text
    drawAnswerText(width/2, height/2, minDimension * 0.125);
    
    // Stars
    drawStar(20, 20);
    drawStar(width - 20, 20);
    drawStar(20, height - 20);
    drawStar(width - 20, height - 20);
}

function drawHorizontalGradientCircle(x, y, diameter) {
    push();
    noFill();
    for (let i = -diameter/2; i <= diameter/2; i++) {
        let inter = abs(i) / (diameter/2);
        let opacity = 255 * Math.pow(inter, 5);
        let c = color(255, 255, 255, opacity);
        stroke(c);
        line(x + i, y - sqrt(sq(diameter/2) - sq(i)), x + i, y + sqrt(sq(diameter/2) - sq(i)));
    }
    // Add outline
    stroke(255);
    strokeWeight(1);
    ellipse(x, y, diameter, diameter);
    pop();
}

function drawOutlineCircle(x, y, diameter) {
    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(x, y, diameter, diameter);
}

function drawVerticalGradientCircle(x, y, diameter) {
    push();
    noFill();
    for (let i = -diameter/2; i <= diameter/2; i++) {
        let inter = abs(i) / (diameter/2);
        let opacity = 255 * Math.pow(inter, 5);
        let c = color(255, 255, 255, opacity);
        stroke(c);
        line(x - sqrt(sq(diameter/2) - sq(i)), y + i, x + sqrt(sq(diameter/2) - sq(i)), y + i);
    }
    // Add outline
    stroke(255);
    strokeWeight(1);
    ellipse(x, y, diameter, diameter);
    pop();
}

function drawGradientTriangle(x, y, size) {
    push();
    translate(x, y);
    rotate(PI); // Rotate 180 degrees
    
    // Calculate triangle points
    let topX = 0, topY = -size;
    let leftX = -size * 0.866, leftY = size * 0.5;
    let rightX = size * 0.866, rightY = size * 0.5;
    
    // Set corner radius 
    let cornerRadius = size * 0.015; // Reduced to 3% of size for subtler rounding
    
    // Draw gradient
    for (let i = topY; i <= leftY; i++) {
        let inter = (i - topY) / (leftY - topY); // Normalize to 0-1
        let opacity = 255 * Math.pow(inter, 2); // Adjusted power for smoother gradient
        let c = color(0, 0, 255, opacity);
        stroke(c);
        
        // Calculate x coordinates for this y level
        let leftXAtY = map(i, topY, leftY, topX, leftX);
        let rightXAtY = map(i, topY, rightY, topX, rightX);
        
        line(leftXAtY, i, rightXAtY, i);
    }
    
    // Draw rounded corners and edges
    noFill();
    stroke(255);
    strokeWeight(0.3);
    
    beginShape();
    // Top corner
    vertex(topX - cornerRadius, topY + cornerRadius);
    quadraticVertex(topX, topY, topX + cornerRadius, topY + cornerRadius);
    
    // Right edge
    vertex(rightX - cornerRadius, rightY - cornerRadius);
    
    // Bottom right corner
    quadraticVertex(rightX, rightY, rightX - cornerRadius, rightY);
    
    // Bottom edge
    vertex(leftX + cornerRadius, leftY);
    
    // Bottom left corner
    quadraticVertex(leftX, leftY, leftX + cornerRadius, leftY - cornerRadius);
    
    // Left edge
    vertex(topX - cornerRadius, topY + cornerRadius);
    
    endShape(CLOSE);
    
    pop();
}

function drawAnswerText(x, y, triangleSize) {
    push();
    fill(255);
    textFont('Silkscreen');
    textSize(triangleSize * 0.1);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    
    noStroke();
    
    let padding = triangleSize * 0.15;
    let maxWidth = triangleSize * 1.2 - (padding * 2);
    let words = currentAnswer.split(' ');
    let lines = [];
    let currentLine = '';
    let lastWord = '';

    for (let i = 0; i < words.length; i++) {
        if (words[i].toLowerCase() === 'time' || words[i].toLowerCase() === 'now' || words[i].toLowerCase() === 'yet') {
            if (currentLine !== '') {
                lines.push(currentLine.trim());
            }
            lines.push(words[i]);
            lastWord = words[i];
            currentLine = '';
        } else {
            let testLine = currentLine + (currentLine === '' ? '' : ' ') + words[i];
            if (textWidth(testLine) <= maxWidth) {
                currentLine = testLine;
            } else {
                if (currentLine !== '') {
                    lines.push(currentLine.trim());
                }
                currentLine = words[i];
            }
            lastWord = words[i];
        }
    }
    if (currentLine !== '') {
        lines.push(currentLine.trim());
    }

    let lineHeight = textAscent() + textDescent();
    let totalHeight = lineHeight * lines.length;
    
    for (let i = 0; i < lines.length; i++) {
        let lineY = y + (i - (lines.length - 1) / 2) * lineHeight;
        text(lines[i], x, lineY);
    }
    pop();
}

function drawStar(x, y) {
    push();
    translate(x, y);
    rotate(frameCount * 0.02);
    stroke(255);
    let starSize = minDimension * 0.015;
    line(-starSize, 0, starSize, 0);
    line(0, -starSize, 0, starSize);
    pop();
}

function keyPressed() {
    if (key === ' ') {
        currentAnswer = random(answers);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    minDimension = min(width, height);
}