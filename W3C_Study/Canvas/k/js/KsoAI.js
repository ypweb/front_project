var canvas = document.getElementById("canvas");
if(!canvas.getContext){
		document.getElementById("notags").style.display="block";
}
   var ctx = canvas.getContext("2d"),
    width = 900,
    height = 500;

canvas.width = width;
canvas.height = height;
ctx.fillRect(0, 0, width, height);
ctx.lineWidth = 2;

// create the circles
var Bokeh= function(){   
    var circle = function(){
        this.x = Math.floor(Math.random()*width);
        this.y = Math.floor(Math.random()*height);
        this.size = Math.floor(Math.random()*20)+15;
        this.speed = (Math.random()*1)+.1;
        this.color = {r:0, g:0, b:0};
        var colorAvg = 0;
        
        while(colorAvg < 150){
              this.color.r = Math.floor(Math.random()*255); 
              this.color.g = Math.floor(Math.random()*255); 
              this.color.b = Math.floor(Math.random()*255); 
            colorAvg = (this.color.r + this.color.g + this.color.b)/3
        }
    },
    init = function(){
        this.circles = [];
        this.blurCanvas = document.createElement("canvas");
        this.blurCanvas.width = canvas.width/2;
        this.blurCanvas.height = canvas.height/2;
        this.blurCtx = this.blurCanvas.getContext("2d");
            
        for(var i = 0, len = Math.floor(width/12); i < len; i++){
            this.circles.push(new circle());   
        }
        tick();
    },
    tick = function(){
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";
        var circs = this.circles.length;
        while(circs--){ 
            var circle = this.circles[circs],
                color = circle.color;
            
            ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ",0.2)";
            
            circle.x+=circle.speed;
            circle.y+=circle.speed;
            if(circle.x > width + circle.size){
                circle.x = -circle.size;
            }   
            if(circle.y > height+ circle.size){
                circle.y = -circle.size;
            }              
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.size,0,360);  
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle ="rgba(" + color.r + "," + color.g + "," + color.b + ",0.8)";
            ctx.arc(circle.x, circle.y, circle.size,0,360);  
            ctx.stroke();
        }
      
        this.blurCtx.drawImage(canvas,0,0,width, height,0,0,width,height);
        ctx.drawImage(this.blurCanvas,0,0,width,height);
        setTimeout(tick,10);
        
    };
        return{
          init : function(){
               init();
          }        
        }        
}
    
    var bokeh = new Bokeh();
    bokeh.init();