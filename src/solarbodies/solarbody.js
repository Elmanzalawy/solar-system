import * as THREE from 'three';
import vertexShader from '../../assets/shaders/vertex.glsl'
import fragmentShader from '../../assets/shaders/fragment.glsl'
import atmosphereVertexShader from '../../assets/shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../../assets/shaders/atmosphereFragment.glsl'

class Solarbody{
    constructor(options){
        this.orbit = new THREE.Object3D();
        options.scene.add(this.orbit);
        const sphereGeometry = options?.geometry ?? new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                globeTexture: {
                    value: new THREE.TextureLoader().load(options.textureImage)
                }
            }
        });
        const mesh = new THREE.Mesh(sphereGeometry, material);

        if(options.scale){
            mesh.scale.set(options.scale, options.scale, options.scale); 
        }

        this.orbit.add(mesh);
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
        this.orbit.add(atmosphere)     
    }

    update(){
        this.orbit.rotation.y += 0.005;
    }
}
export{
    Solarbody
}