import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

class Controls{
    constructor(camera, canvas){
        const controls = new OrbitControls(camera, canvas);
        controls.enableDampening = true;
        // controls.enablePan =false;
        // controls.enableZoom =false;
        // controls.autoRotate = true;
        // controls.autoRotateSpeed = 3;
        return controls;
    }
    
    update(){
        this.controls.update();
    }
}
export{
    Controls
}