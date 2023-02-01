import * as THREE from 'three';

class Solarbody{
    constructor(options){
        this.orbit = new THREE.Object3D();
        options.scene.add(this.orbit);
        const sphereGeometry = options?.geometry ?? new THREE.SphereGeometry(1, 64, 64);
        const mesh = new THREE.Mesh(sphereGeometry, options.material);

        if(options.scale){
            mesh.scale.set(options.scale, options.scale, options.scale); 
        }

        this.orbit.add(mesh);
    }
}
export{
    Solarbody
}