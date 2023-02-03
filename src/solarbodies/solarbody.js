import * as THREE from 'three';
import vertexShader from '../../assets/shaders/vertex.glsl'
import fragmentShader from '../../assets/shaders/fragment.glsl'
import atmosphereVertexShader from '../../assets/shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../../assets/shaders/atmosphereFragment.glsl'

class Solarbody{
    constructor(options){
        const sphereGeometry = options?.geometry ?? new THREE.SphereGeometry(1, 64, 64);
        const material = options?.material ?? new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(options.textureImage)
        });
        this.solarbody = new THREE.Mesh(sphereGeometry, material);
        this.object = new THREE.Object3D();
        this.object.add(this.solarbody);
        
        if(options.scale){
            this.solarbody.scale.set(options.scale, options.scale, options.scale); 
        }

        if(options.orbit){
            this.orbit = options.orbit;
            this.solarbody.position.x += this.orbit.orbitDistance.x;
            this.solarbody.position.y += this.orbit.orbitDistance.y;
            this.solarbody.position.z += this.orbit.orbitDistance.z;
            
            this.object.position.x = this.orbit.solarbody.position.x;
            this.object.position.y = this.orbit.solarbody.position.y;
            this.object.position.z = this.orbit.solarbody.position.z;
        }


        options.scene.add(this.object);
    }

    createAtmosphere(){
        //create atmosphere
        const atmosphere = new THREE.Mesh
        (
            new THREE.SphereGeometry(0.9,50,50),
            new THREE.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            })
        )
        atmosphere.scale.set(1.1, 1.1, 1.1)
        this.solarbody.add(atmosphere)     
    }

    update(){
        this.object.rotation.y += this.orbit.orbitalVelocity ?? 0;
        this.solarbody.rotation.y += 0.003;
    }
}
export{
    Solarbody
}