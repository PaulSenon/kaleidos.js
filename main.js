

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

document.addEventListener("DOMContentLoaded", function(event) {
    const image = new Image();
    // image.src = 'https://cl.ly/image/1X3e0u1Q0M01/cm.jpg';
    image.src = 'nugget.png';
    
    const kaleidoscope = new Kaleidoscope({
        image,
        slices: 26,
        radius: 200,
        zoom: 1
    });
    
    // kaleidoscope.domElement.style.position = 'absolute';
    // kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px';
    // kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px';
    // kaleidoscope.domElement.style.left = '50%';
    // kaleidoscope.domElement.style.top = '50%';
    document.getElementById('test').appendChild(kaleidoscope.domElement);
    const width = document.getElementById('test').offsetWidth;
    const height = document.getElementById('test').offsetHeight;
    kaleidoscope.radius = Math.min(width, height)/2;
    
    kaleidoscope.draw();
    // document.body.appendChild('spdojhfksdjhfglkjhdfg');

    const frameinterval = 1000/60;
    const speed = 0.001;
    let lastTime = (new Date()).getTime();
    let currentTime = 0;
    let incrementor = 0;
    const loop = () => {
        // window.requestAnimationFrame(loop);

        // currentTime = (new Date()).getTime();
        // delta2 = (currentTime - lastTime) / 1000;
        // incrementor += delta2 * speed;
        // console.log(incrementor);

        tx = kaleidoscope.offsetX;
        ty = kaleidoscope.offsetY;
        tr = kaleidoscope.offsetRotation;

        dx = Math.cos(incrementor);
        dy = Math.sin(incrementor);
                    
        tx = dx * kaleidoscope.radius * -2;
        ty = dy * kaleidoscope.radius * 2;
        tr = Math.atan2(dy, dx);

        delta = tr - kaleidoscope.offsetRotation;
        theta = Math.atan2( Math.sin( delta ), Math.cos( delta ) )
                    
        kaleidoscope.offsetX += ( tx - kaleidoscope.offsetX ) ;
        kaleidoscope.offsetY += ( ty - kaleidoscope.offsetY ) ;
        kaleidoscope.offsetRotation += ( theta - kaleidoscope.offsetRotation ) ;
        kaleidoscope.draw();

        incrementor += speed;
        // lastTime = currentTime;
    };

    setInterval(loop, frameinterval);
    // loop();
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