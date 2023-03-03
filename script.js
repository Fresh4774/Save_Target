var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(600, 600); 
    frameRate(60);    
    smooth();
    
smooth();

textAlign(CENTER, TOP);
textFont(createFont("Trebuchet MS"), 30);

var Person = (function() {
    Person = function(args) {
        this.x = args.x || 480;
        this.y = args.y || 340;
        this.length = args.length || 110;
        this.diameter = args.diameter || this.length / 2;
        this.thickness = args.thickness || this.length * 0.04;
        this.timer = 0;
        this.speed = args.speed || 7;
        this.angle = -15;
        this.colors = args.colors || {
            skin: color(52, 52, 52),
            stroke: color(80),
            feet: color(80)
        };
        this.canChangeSpeed = true;
        this.limbs = args.limbs || [
            { //LEFT ARM
                x: 0,
                y: 0,
                offset: 60,
                color: color(52, 52, 52),
                upper: {
                    angle: 10,
                    dist: 60,
                    length: this.length * 0.8 / 2
                },
                lower: {
                    angle: -60,
                    dist: 50,
                    length: this.length * 0.68 / 2
                }
            },
            { //RIGHT ARM
                x: 0,
                y: 0,
                offset: 240,
                color: color(52, 52, 52),
                upper: {
                    angle: 10,
                    dist: 60,
                    length: this.length * 0.8 / 2
                },
                lower: {
                    angle: -60,
                    dist: 50,
                    length: this.length * 0.68 / 2
                }
            },
            { //LEFT LEG
                x: 0,
                y: 0,
                offset: 180,
                color: color(52, 52, 52),
                upper: {
                    angle: -10,
                    dist: 60,
                    length: this.length / 2
                },
                lower: {
                    angle: 60,
                    dist: 50,
                    length: this.length * 0.75 / 2
                },
                foot: {
                    angle: -70,
                    dist: 20,
                    length: this.length * 0.25 / 2
                }
            },
            { //RIGHT LEG
                x: 0,
                y: 0,
                offset: 0,
                color: color(52, 52, 52),
                upper: {
                    angle: -10,
                    dist: 60,
                    length: this.length / 2
                },
                lower: {
                    angle: 60,
                    dist: 50,
                    length: this.length * 0.75 / 2
                },
                foot: {
                    angle: -70,
                    dist: 20,
                    length: this.length * 0.25 / 2
                }
            }
        ];
        this.sine = 0;
        this.init();
    };
    Person.prototype = {
        init: function() {
            //LEFT ARM
            this.limbs[0].x = this.x + this.length * 0.15;
            this.limbs[0].y = this.y + this.diameter * 0.9;
            
            //RIGHT ARM
            this.limbs[1].x = this.x - this.length * 0.32;
            this.limbs[1].y = this.y + this.diameter * 1.2;
            
            //LEFT LEG
            this.limbs[2].x = this.x + this.length * 0.15;
            this.limbs[2].y = this.y + this.length;
            
            //RIGHT LEG
            this.limbs[3].x = this.x - this.length * 0.23;
            this.limbs[3].y = this.y + this.length;
        },
        moveArm: function(limb) {
            stroke(this.colors.stroke);
            stroke(90, 90, 90);
            strokeWeight(this.thickness);
            pushMatrix();
                translate(limb.x, limb.y);
                rotate(radians(limb.upper.angle + sin(radians((this.timer * this.speed) + limb.offset)) * limb.upper.dist));
                line(0, 0, 0, limb.upper.length);

                translate(0, limb.upper.length);
                rotate(radians(limb.lower.angle + cos(radians((this.timer * this.speed) + limb.offset)) * limb.lower.dist));
                line(0, 0, 0, limb.lower.length);
                
                stroke(this.colors.stroke);
                strokeWeight(this.thickness / 2);
                fill(this.colors.skin);
                //HANDS
                ellipse(0, limb.lower.length, this.diameter * 0.2, this.diameter * 0.2);
            popMatrix();
        },
        moveLeg: function(limb) {
            stroke(this.colors.stroke);
            strokeWeight(this.thickness);
            pushMatrix();
                translate(limb.x - this.angle * 0.5, limb.y);
                rotate(radians(limb.upper.angle + cos(radians((this.timer * this.speed) + limb.offset)) * limb.upper.dist));
                line(0, 0, 0, limb.upper.length);
                
                translate(0, limb.upper.length);
                rotate(radians(limb.lower.angle + sin(radians((this.timer * this.speed) + limb.offset)) * limb.lower.dist));
                line(0, 0, 0, limb.lower.length);
                
                translate(0, limb.lower.length);
                rotate(radians(limb.foot.angle + sin(radians((this.timer * this.speed) + limb.offset)) * limb.foot.dist));
                stroke(this.colors.feet);
                strokeWeight(this.thickness * 1.5);
                line(0, 0, 0, limb.foot.length);
            popMatrix();
        },
        draw: function() {
            this.timer++;
            
            this.angle = sin(radians(this.timer * this.speed * 0.2)) * 20;

            var point = 0;
            
            pushMatrix();
                translate(0, sin(radians((this.timer) * this.speed * 2)) * 10);

                //LEFT ARM
                this.moveArm(this.limbs[0]);
                
                //LEFT LEG
                this.moveLeg(this.limbs[2]);
                
                //BODY
                pushMatrix();
                    translate(this.x, this.y + this.length * 0.6);
                    rotate(radians(this.angle));
                    noStroke();
                    fill(52, 52, 52);
                    ellipse(0, 0, this.length * 0.7, this.length * 1.25);
                    fill(67, 66, 66);
                    ellipse(this.length * 0.03, 0, this.length * 0.65, this.length * 1.2);
                    fill(134, 229, 255);
                    ellipse(this.length * 0.1, 0, this.length * 0.45, this.length * 0.9);
                    fill(255, 0, 50);
                    ellipse(this.length * 0.13, 0, this.length * 0.35, this.length * 0.7);
                    fill(255, 234, 32);
                    ellipse(this.length * 0.15, 0, this.length * 0.25, this.length * 0.5);
                popMatrix();
                
                //RIGHT LEG
                this.moveLeg(this.limbs[3]);
                
                //RIGHT ARM
                this.moveArm(this.limbs[1]);
            popMatrix();
        }
    };
    return Person;
})();

var App = (function() {
    App = function() {
        this.timer = 0;
        this.speedIndex = 0;
        this.speeds = [7, 14];
        this.speed = this.speeds[this.speedIndex];
        this.arrows = [];
        this.dusts = [];
        this.person = new Person({
            speed: this.speed
        });
        this.sine = 0;
        this.state = -1;
        this.changed = false;
        this.hills = {
            back: {
                img: undefined,
                x1: 0,
                x2: 599
            },
            front: {
                img: undefined,
                x1: 0,
                x2: 599
            }
        };
        this.getHills();
    };
    App.prototype = {
        getHills: function() {
            background(0, 0,);
            noStroke();
            fill(45, 190, 160);
            beginShape();
                vertex(0, 373);
                vertex(48, 417);
                vertex(64, 394);
                vertex(107, 443);
                vertex(152, 327);
                vertex(201, 371);
                vertex(253, 294);
                vertex(306, 393);
                vertex(328, 339);
                vertex(349, 367);
                vertex(405, 270);
                vertex(472, 395);
                vertex(501, 358);
                vertex(553, 415);
                vertex(600, 373);
                vertex(600, 600);
                vertex(0, 600);
            endShape(CLOSE);
            
            this.hills.back.img = get(0, 265, 600, 335);
            
            background(0, 0);
            noStroke();
            fill(35, 145, 120);
            beginShape();
                vertex(0, 439);
                vertex(82, 361);
                vertex(128, 419);
                vertex(155, 371);
                vertex(221, 454);
                vertex(253, 383);
                vertex(275, 411);
                vertex(303, 354);
                vertex(375, 452);
                vertex(423, 376);
                vertex(477, 434);
                vertex(513, 406);
                vertex(550, 439);
                vertex(574, 418);
                vertex(600, 439);
                vertex(600, 600);
                vertex(0, 600);
            endShape(CLOSE);
            
            this.hills.front.img = get(0, 350, 600, 250);
        },
        runHills: function() {
            //HILLS-1
            image(this.hills.back.img, this.hills.back.x1, 265);
            image(this.hills.back.img, this.hills.back.x2, 265);
            
            this.hills.back.x1-= this.speed * 0.15;
            this.hills.back.x2-= this.speed * 0.15;
            
            if(this.hills.back.x1 <= -this.hills.back.img.width) {
                this.hills.back.x1 = this.hills.back.x2 + 599;
            }
            if(this.hills.back.x2 <= -this.hills.back.img.width) {
                this.hills.back.x2 = this.hills.back.x1 + 599;
            }
            
            //HILLS-2
            image(this.hills.front.img, this.hills.front.x1, 370);
            image(this.hills.front.img, this.hills.front.x2, 370);
            
            this.hills.front.x1-= this.speed * 0.3;
            this.hills.front.x2-= this.speed * 0.3;
            
            if(this.hills.front.x1 <= -this.hills.front.img.width) {
                this.hills.front.x1 = this.hills.front.x2 + 599;
            }
            if(this.hills.front.x2 <= -this.hills.front.img.width) {
                this.hills.front.x2 = this.hills.front.x1 + 599;
            }
        },
        runDusts: function() {
            noStroke();
            
            for(var i = this.dusts.length - 1; i >= 0; i--) {
                var dust = this.dusts[i];
                
                fill(dust.color, dust.opacity);
                ellipse(dust.x, dust.y, dust.diameter, dust.diameter);

                dust.x-= (this.speed + dust.vx);
                dust.y-= dust.vy;
                dust.opacity-= this.speed * 0.4;
                
                if(dust.opacity <= 0) {
                    this.dusts.splice(i, 1);
                }
            }
        },
        runArrows: function() {
            strokeWeight(2);
            
            for(var i = this.arrows.length - 1; i >= 0; i--) {
                var arrow = this.arrows[i];
                
                pushMatrix();
                    translate(arrow.x, arrow.y);
                    rotate(radians(arrow.angle));
                    
                    stroke(80, 140, 155);
                    line(-arrow.w / 2, 0, arrow.w / 2, 0);
                    noStroke();
                    fill(46, 72, 79);
                    triangle(   arrow.w * 0.55, 0,
                                arrow.w * 0.4, -arrow.w * 0.08,
                                arrow.w * 0.4, arrow.w * 0.08);
                    
                    fill(89, 89, 89);
                    for(var j = 0; j < 3; j++) {
                        var xoff = (j * arrow.w * 0.06);
                        triangle(   -arrow.w * 0.29 - xoff, 0,
                                    -arrow.w * 0.37 - xoff, -arrow.w * 0.10,
                                    -arrow.w * 0.32 - xoff, 0);
                        triangle(   -arrow.w * 0.29 - xoff, 0,
                                    -arrow.w * 0.37 - xoff, arrow.w * 0.10,
                                    -arrow.w * 0.32 - xoff, 0);
                    }
        
                    arrow.vx-= arrow.friction;
                    arrow.x+= arrow.vx;
                    arrow.vy+= arrow.gravity;
                    arrow.y+= arrow.vy;
                    arrow.angle+= arrow.rot;
                
                    if(!arrow.hit && arrow.y + arrow.w > arrow.base) {
                        arrow.gravity = 0;
                        arrow.vy = 0;
                        arrow.rot = 0;
                        arrow.friction = 0;
                        arrow.vx = -this.speed;
                        arrow.hit = true;
                    }
                    else if(arrow.hit) {
                        arrow.vx = -this.speed;
                        
                        noStroke();
                        fill(27, 38, 44);
                        rect(arrow.w * 0.48, -arrow.w * 0.05, arrow.w * 0.07, arrow.w * 0.1);
                        
                        if(arrow.x < -arrow.w) {
                            this.arrows.splice(i, 1);
                        }
                    }
                popMatrix();
            }
        },
        draw: function() {
            background(146, 226, 232);
            
            this.runHills();
            
            //ground
            noStroke();
            fill(112, 84, 62);
            rect(0, 510, width, 90);
            
            fill(50, 20);
            var shadow = sin(this.timer * this.speed * 2);
            ellipse(this.person.x + 5, 550, 110 - shadow * 2, 15 - shadow * 2);

            if(this.hit > 0 && shadow < 0) {
                for(var j = 0; j < 10; j++) {
                    this.dusts.push({
                        x: this.person.x + (this.state === 1 ? -this.person.diameter * 0.3 : this.person.diameter * 0.5),
                        y: 545,
                        vx: random(-this.speed * 0.08, this.speed * 0.05),
                        vy: random(this.speed * 0.20, this.speed * 0.30),
                        opacity: random(80, 150),
                        diameter: random(5, 10),
                        color: color(140, 119, 84)
                    });
                }
                this.state*= -1;
            }
            this.hit = shadow;
            
            this.runDusts();
            
            this.person.draw();
            
            //ARROWS
            if(this.timer++ % (140 / (this.speed | 0)) === 0) {
                this.arrows.push({
                    x: -50,
                    y: random(330, 380),
                    w: 100,
                    vx: random(4, 5),
                    vy: random(-8, -7),
                    angle: -60,
                    rot: 1.3,
                    gravity: 0.2,
                    friction: 0.01,
                    hit: false,
                    base: random(height * 0.97, height * 1.05),
                    speed: this.speed
                });
            }
            
            //ARROWS
            this.runArrows();
            
            if(!this.changed) {
                fill(0, 0, 0);
                text("CLICK OR HOLD TO SAVE THE TARGET", 300, 100);
            }
        },
        run: function() {
          this.draw();
        }
    };
    return App;
})();

var app = new App();

draw = function() {
    app.run();
};

mousePressed = function() {
    app.speedIndex = (app.speedIndex + 1) % app.speeds.length;
    app.speed = app.speeds[app.speedIndex];
    app.person.speed = app.speed;
    app.changed = true;
};
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);