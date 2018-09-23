

class Kaleidoscope {
    constructor({image, slices, radius, zoom}){
        this.HALF_PI = Math.PI / 2;
        this.TWO_PI = Math.PI * 2;

        this.offsetRotation = 0.0;
        this.offsetScale = 1.0;
        this.offsetX = 0.0;
        this.offsetY = 0.0;
        this.radius = radius || 100;
        this.slices = slices || 12;
        this.zoom = zoom || 1;

        this.domElement = document.createElement('canvas');
        this.context = this.domElement.getContext('2d');
        this.image = image || document.createElement('img');
    }

    draw(){
        this.domElement.width = this.radius * 2;
        this.domElement.height = this.radius * 2;
        this.context.fillStyle = this.context.createPattern(this.image, 'repeat');

        const scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
        const step = this.TWO_PI / this.slices;
        const cx = this.image.width / 2;

        for(let i = 0; i <= this.slices; i++){
            this.context.save();
            this.context.translate(this.radius, this.radius);
            this.context.rotate(i * step);
            this.context.beginPath();
            this.context.moveTo(-0.5, -0.5);
            this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51);
            this.context.lineTo(0.5, 0.5);
            this.context.closePath();
            
            this.context.rotate(this.HALF_PI)
            this.context.scale(scale, scale);
            this.context.scale([-1,1][i % 2], 1)
            this.context.translate(this.offsetX - cx, this.offsetY);
            this.context.rotate(this.offsetRotation);
            this.context.scale(this.offsetScale, this.offsetScale);
            
            this.context.fill();
            this.context.restore();
        }
    }
}

class Kaleidoscope2 {
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
        console.log(image);
        this.image = image;
        this.halfimgwidth = this.image.width / 2;

        this.parent = document.getElementById(parentId);
        this.parent.appendChild(this.domElement);
        const width = this.parent.offsetWidth;
        const height = this.parent.offsetHeight;
        this.radius = Math.min(width, height)/2;
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
                // console.log(this.stepCount+' '+this.offsetX+' '+this.offsetY+' '+this.offsetRotation);
        
                let tx = this.offsetX;
                let ty = this.offsetY;
                let tr = this.offsetRotation;
        
                const dx = Math.cos(this.stepCount);
                const dy = Math.sin(this.stepCount);
                            
                tx = dx * this.radius * -2;
                ty = dy * this.radius * 2;
                tr = Math.atan2(dy, dx);
        
                const deltaRot = tr - this.offsetRotation;
                const theta = Math.atan2( Math.sin( deltaRot ), Math.cos( deltaRot ) )
                            
                this.offsetX += ( tx - this.offsetX ) ;
                this.offsetY += ( ty - this.offsetY ) ;
                this.offsetRotation += ( tr - this.offsetRotation ) ;
                this.draw();
        
                // incrementor += speed;
                // this.lastTime = this.currentTime;
                this.lastTime = this.currentTime - (this.delta % this.frameinterval);
            }
    
        };
        this.draw = () => {
            // this.domElement.width = radius * 2;
            // this.domElement.height = radius * 2;
            // this.context.fillStyle = this.context.createPattern(this.image, 'repeat');
           
    
            // this.scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
            
            
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

    // init(){

    // }

    // start(){

    // }

    // stop(){

    // }

    // loop(){
        
    // }

    // // setInterval(loop, frameinterval){
    // // // loop();
    // // }

    // draw(){

    // }
}

document.addEventListener("DOMContentLoaded", function(event) {
    window.kaleidoscope = new Kaleidoscope2({
        parentId: 'test', 
        imageUrl: 'nugget.png', 
        slices: 26, 
        radius: 200, 
        zoom: 1, 
        fps: 60, 
        speed: -0.0002
    });
    window.kaleidoscope.start();

    // const image = new Image();
    // // image.src = 'https://cl.ly/image/1X3e0u1Q0M01/cm.jpg';
    // image.src = 'nugget.png';
    // console.log(image);
    // const kaleidoscope = new Kaleidoscope({
    //     image,
    //     slices: 26,
    //     radius: 200,
    //     zoom: 1
    // });
    
    // // kaleidoscope.domElement.style.position = 'absolute';
    // // kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px';
    // // kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px';
    // // kaleidoscope.domElement.style.left = '50%';
    // // kaleidoscope.domElement.style.top = '50%';
    // document.getElementById('test').appendChild(kaleidoscope.domElement);
    // const width = document.getElementById('test').offsetWidth;
    // const height = document.getElementById('test').offsetHeight;
    // kaleidoscope.radius = Math.min(width, height)/2;
    
    // kaleidoscope.draw();
    // // document.body.appendChild('spdojhfksdjhfglkjhdfg');

    // const frameinterval = 1000/60;
    // const speed = 0.001;
    // let lastTime = (new Date()).getTime();
    // let currentTime = 0;
    // let incrementor = 0;
    // const loop = () => {
    //     // window.requestAnimationFrame(loop);

    //     // currentTime = (new Date()).getTime();
    //     // delta2 = (currentTime - lastTime) / 1000;
    //     // incrementor += delta2 * speed;
    //     // console.log(incrementor);

    //     tx = kaleidoscope.offsetX;
    //     ty = kaleidoscope.offsetY;
    //     tr = kaleidoscope.offsetRotation;

    //     dx = Math.cos(incrementor);
    //     dy = Math.sin(incrementor);
                    
    //     tx = dx * kaleidoscope.radius * -2;
    //     ty = dy * kaleidoscope.radius * 2;
    //     tr = Math.atan2(dy, dx);

    //     delta = tr - kaleidoscope.offsetRotation;
    //     theta = Math.atan2( Math.sin( delta ), Math.cos( delta ) )
                    
    //     kaleidoscope.offsetX += ( tx - kaleidoscope.offsetX ) ;
    //     kaleidoscope.offsetY += ( ty - kaleidoscope.offsetY ) ;
    //     kaleidoscope.offsetRotation += ( theta - kaleidoscope.offsetRotation ) ;
    //     kaleidoscope.draw();

    //     incrementor += speed;
    //     // lastTime = currentTime;
    // };

    // setInterval(loop, frameinterval);
    // // loop();
});

  
// # Mouse events
  
// tx = kaleidoscope.offsetX
// ty = kaleidoscope.offsetY
// tr = kaleidoscope.offsetRotation
  
// onMouseMoved = ( event ) =>

//   cx = window.innerWidth / 2
//   cy = window.innerHeight / 2
                
//   dx = event.pageX / window.innerWidth
//   dy = event.pageY / window.innerHeight
                
//   hx = dx - 0.5
//   hy = dy - 0.5
                
//   tx = hx * kaleidoscope.radius * -2
//   ty = hy * kaleidoscope.radius * 2
//   tr = Math.atan2 hy, hx

// window.addEventListener 'mousemove', onMouseMoved, no
                
// # Init
  
// const options = {
//     interactive: yes,
//     ease: 0.1
// }
           
// const update = () => {
//     const delta = 
// }();

// do update = =>
                
//   if options.interactive

//     delta = tr - kaleidoscope.offsetRotation
//     theta = Math.atan2( Math.sin( delta ), Math.cos( delta ) )
                
//     kaleidoscope.offsetX += ( tx - kaleidoscope.offsetX ) * options.ease
//     kaleidoscope.offsetY += ( ty - kaleidoscope.offsetY ) * options.ease
//     kaleidoscope.offsetRotation += ( theta - kaleidoscope.offsetRotation ) * options.ease
    
//     do kaleidoscope.draw
  
//   setTimeout update, 1000/60
    
// # Init gui

// gui = new dat.GUI
// gui.add( kaleidoscope, 'zoom' ).min( 0.25 ).max( 2.0 )
// gui.add( kaleidoscope, 'slices' ).min( 6 ).max( 32 ).step( 2 )
// gui.add( kaleidoscope, 'radius' ).min( 200 ).max( 500 )
// gui.add( kaleidoscope, 'offsetX' ).min( -kaleidoscope.radius ).max( kaleidoscope.radius ).listen()
// gui.add( kaleidoscope, 'offsetY' ).min( -kaleidoscope.radius ).max( kaleidoscope.radius ).listen()
// gui.add( kaleidoscope, 'offsetRotation' ).min( -Math.PI ).max( Math.PI ).listen()
// gui.add( kaleidoscope, 'offsetScale' ).min( 0.5 ).max( 4.0 )
// gui.add( options, 'interactive' ).listen()
// gui.close()

// onChange = =>

//   kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px'
//   kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px'
    
//   options.interactive = no
    
//   do kaleidoscope.draw

// ( c.onChange onChange unless c.property is 'interactive' ) for c in gui.__controllers