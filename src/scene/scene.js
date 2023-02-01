import * as THREE from 'three';

class Scene{
    constructor(...args){
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('black');
        return scene;
    }
}
export {
    Scene
}