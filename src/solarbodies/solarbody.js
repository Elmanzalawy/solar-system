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
            this.solarbody.position.x += options.orbit.orbitDistance.x;
            this.solarbody.position.y += options.orbit.orbitDistance.y;
            this.solarbody.position.z += options.orbit.orbitDistance.z;
            
            this.object.position.x = options.orbit.solarbody.position.x;
            this.object.position.y = options.orbit.solarbody.position.y;
            this.object.position.z = options.orbit.solarbody.position.z;

            this.orbitalVelocity = options.orbit.orbitalVelocity;
        }


        options.scene.add(this.object);

        // add orbit
        this.orbit = new THREE.Object3D();
        options.scene.add(this.orbit);
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
        this.object.rotation.y += this.orbitalVelocity ?? 0;
        this.solarbody.rotation.y += 0.003;
    }
}
export{
    Solarbody
}