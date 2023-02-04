import {PerspectiveCamera} from 'three'
import { dimensions } from '../util';

class Camera{
    constructor(options){
        const camera = new PerspectiveCamera(50, dimensions().width / dimensions().height, 0.1, 99999);
        camera.position.set(0, 120, 0);
        camera.up.set(0, 1, 1);
        camera.lookAt(0, 0, 0);

        return camera;
    }
}
export{
    Camera
}