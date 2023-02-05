import * as THREE from 'three';
import { image, getMobileOperatingSystem } from '../util';
import atmosphereVertexShader from '../../storage/shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../../storage/shaders/atmosphereFragment.glsl'

class Solarbody{
    constructor(options){
        this.type = options.type ?? "solarbody";
        this.sphereGeometry = options?.geometry ?? new THREE.SphereGeometry(1, 64, 64);

        if(getMobileOperatingSystem() == "Android"){
            this.material = options?.material ?? new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(image(options.textureImage))
            });
        }else{
            this.material = options?.material ?? new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load(image(options.textureImage))
            });
        }
        this.solarbody = new THREE.Mesh(this.sphereGeometry, this.material);
        this.object = new THREE.Object3D();
        this.object.add(this.solarbody);

        if(options.ring){
            let innerRadius = this.solarbody.geometry.parameters.radius * options.scale * 1.3;
            let outerRadius = innerRadius + options.ring.width;
            this.ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
            this.ringMaterial = options.ring?.material ?? new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(image(options.ring.textureImage)),
                side: THREE.DoubleSide
            });
            this.ring = new THREE.Mesh(this.ringGeometry, this.ringMaterial);
            this.ring.rotation.x = -0.5 * Math.PI;
            this.object.add(this.ring)
        }

        if(options.position){
            this.object.position.x = options.position.x;
            this.object.position.y = options.position.y;
            this.object.position.z = options.position.z;
        }
        
        if(options.scale){
            this.solarbody.scale.set(options.scale, options.scale, options.scale); 
        }

        if(options.orbit){
            this.orbit = options.orbit;
            this.solarbody.position.x += this.orbit.orbitDistance.x;
            this.solarbody.position.y += this.orbit.orbitDistance.y;
            this.solarbody.position.z += this.orbit.orbitDistance.z;
            
            if(this.ring){
                this.ring.position.x += this.orbit.orbitDistance.x;
                this.ring.position.y += this.orbit.orbitDistance.y;
                this.ring.position.z += this.orbit.orbitDistance.z;
            }
            
            this.object.position.x = this.orbit.solarbody.position.x;
            this.object.position.y = this.orbit.solarbody.position.y;
            this.object.position.z = this.orbit.solarbody.position.z;
        }

        if(options.hasAtmosphere){
            this.createAtmosphere();
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
        if(this.orbit){
            this.object.rotation.y += this.orbit.orbitVelocity ?? 0;
        }
        this.solarbody.rotation.y += 0.003;
    }
}
export{
    Solarbody
}