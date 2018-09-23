# kaleidos.js

A dependency free module that allow you to display kaleidoscop image within a html5 canvas.
**inspired and created from https://codepen.io/soulwire/pen/pwchL**

# install :
npm :
> `npm install kaleidos.js --save`

yarn : 
> `yarn add kaleidos.js`

custom :
> just download the kaleidos.js file of this repository, and add it into your js folder.

# require :
you may chose, depend on what you are using in your project :

> `import Kaleidos from 'kaleidos.js';` 

or

> `const Kaleidos = require('kaleidos.js');` 

or if you do it old school, directly insert it in your httm file:

> `<script src="your/path/to/js/files/kaleidos.js"></script>`

# use :
```HTML
<!-- In your html file : -->
<div id="kaleidos" style="width=200px; height=200px;"></div>
```
```JavaScript
// In your custom javascript file :
const kaleidos = new Kaleidos({
    parentId: 'kaleidos', // id of parent container
    imageUrl: 'myimg.png', // from your static folder
    slices: 26, // number of slices (chose an even number for better result)
    radius: 200, // radius of the kaleidos, but it will be override by parent container width/height
    zoom: 1, // zoom of the image (just tweak it to have a better result)
    fps: 60, // max fps (I use requestAnimationFrame with a framerate limit)
    speed: -0.0002 // speed of animation (give negative value for reverse play)
});

// after that you can call two methods to play/pause the animation :
kaleidos.start(); // you must use it, animation does not start automatically
kaleidos.stop();
```

# other :

Feel free to contribute if you see any possible optimisation (I'm sure there is many...).


