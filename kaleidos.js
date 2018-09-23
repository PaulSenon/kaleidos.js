class Kaleidoscope {
    constructor({parentId, imageUrl, slices, radius, zoom, fps, speed}){
        this.HALF_PI = Math.PI / 2;
        this.TWO_PI = Math.PI * 2;

        this.offsetRotation = 0.0;
        this.offsetScale = 1.0;
        this.offsetX = 0.0;
        this.offsetY = 0.0;
        this.radius = radius || 100;
        this.slices = slices || 12;
        this.step = this.TWO_PI / this.slices;
        this.arcsteppos = this.step * -0.51;
        this.arcstepneg = this.step * 0.51;
        this.zoom = zoom || 1;
        this.fps = fps || 60;
        this.frameinterval = 1000 / this.fps;
        this.speed = speed || 0.01;
        

        this.domElement = document.createElement('canvas');
        this.context = this.domElement.getContext('2d');

        const image = new Image();
        image.src = imageUrl;
        this.image = image;
        this.halfimgwidth = this.image.width / 2;

        this.parent = document.getElementById(parentId);
        this.parent.appendChild(this.domElement);
        const width = this.parent.offsetWidth;
        const height = this.parent.offsetHeight;
        this.radius = Math.min(width, height)/2;
        // make speed not dependent of radius
        this.speed = this.speed * (1/this.radius) * 100;
        this.play = false;
        this.stepCount = 0;
      
        this.init = () => {
            this.lastTime = (new Date()).getTime();
            this.currentTime = 0;
            this.delta = 0;

            
        };
        this.start = () => {
            this.play = true;
            this.init();
            this.loop();
        };
        this.stop = () => {
            this.play = false;
        };
        this.loop = () => {
            if(!this.play){return}
            window.requestAnimationFrame(this.loop);
            this.currentTime = (new Date()).getTime();
            this.delta = (this.currentTime - this.lastTime);
            if(this.delta > this.frameinterval){
        
                this.stepCount += this.delta * this.speed;
        
                let tx = this.offsetX;
                let ty = this.offsetY;
                let tr = this.offsetRotation;
        
                const dx = Math.cos(this.stepCount);
                const dy = Math.sin(this.stepCount);
                            
                tx = dx * this.radius * -2;
                ty = dy * this.radius * 2;
                tr = Math.atan2(dy, dx);
        
                this.offsetX += ( tx - this.offsetX ) ;
                this.offsetY += ( ty - this.offsetY ) ;
                this.offsetRotation += ( tr - this.offsetRotation ) ;
                this.draw();
        
                this.lastTime = this.currentTime - (this.delta % this.frameinterval);
            }
    
        };
        this.draw = () => {
            this.domElement.width = this.radius * 2;
            this.domElement.height = this.radius * 2;
            this.context.fillStyle = this.context.createPattern(this.image, 'repeat');

            this.scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
            this.step = this.TWO_PI / this.slices;
            this.halfimgwidth = this.image.width / 2;

            for(let i = 0; i <= this.slices; i++){
                this.context.save();
                this.context.translate(this.radius, this.radius);
                this.context.rotate(i * this.step);
                this.context.beginPath();
                this.context.moveTo(-0.5, -0.5);
                this.context.arc(0, 0, this.radius, this.arcsteppos, this.arcstepneg);
                this.context.lineTo(0.5, 0.5);
                this.context.closePath();
                
                this.context.rotate(this.HALF_PI)
                this.context.scale(this.scale, this.scale);
                this.context.scale([-1,1][i % 2], 1)
                this.context.translate(this.offsetX - this.halfimgwidth, this.offsetY);
                this.context.rotate(this.offsetRotation);
                this.context.scale(this.offsetScale, this.offsetScale);
                
                this.context.fill();
                this.context.restore();
            }
        };

        this.init();
        this.draw();

    }
}

// for import syntax
export default Kaleidoscope;
// for require syntax
module.exports = Kaleidoscope;