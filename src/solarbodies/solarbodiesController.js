import { AxesHelper, TextureLoader, MeshBasicMaterial } from "three";
import { Solarbody } from "./solarbody"
import { image } from '~util';

class SolarbodiesController {
    constructor(options) {
        this.solarbodies = [];
    }

    /**
     * 
     * @param {*} options 
     * initialize solarbodies.
     * TODO: add ability to parse solarbodies from json
     */
    initSolarbodies(options) {
        const sun = new Solarbody({
            scene: options.scene,
            material: new MeshBasicMaterial({
                map: new TextureLoader().load(image("solarbodies/2k_sun.jpg"))
            }),
            textureImage: image("solarbodies/2k_sun.jpg"),
            scale: 5
        });
        sun.update = function () {
            this.solarbody.rotation.y += 0.001;
        }
        this.solarbodies.push(sun);

        const mercury = new Solarbody({
            scene: sun.object,
            orbit:{
                solarbody: sun.solarbody,
                orbitDistance:{
                    x: 8,
                    y: 0,
                    z: 0
                },
                orbitalVelocity: 0.005
            },
            textureImage: image("solarbodies/2k_mercury.jpg"),
            scale: 0.6
        })
        this.solarbodies.push(mercury);

        const venus = new Solarbody({
            scene: sun.object,
            orbit:{
                solarbody: sun.solarbody,
                orbitDistance:{
                    x: 12,
                    y: 0,
                    z: 0
                },
                orbitalVelocity: 0.003
            },
            textureImage: image("solarbodies/2k_venus.jpg"),
            scale: 0.9
        })
        this.solarbodies.push(venus);


        const earth = new Solarbody({
            scene: sun.object,
            orbit:{
                solarbody: sun.solarbody,
                orbitDistance:{
                    x: 20,
                    y: 0,
                    z: 0
                },
                orbitalVelocity: 0.001
            },
            textureImage: image("solarbodies/2k_earth_day.jpg"),
            scale: 1
        })
        earth.createAtmosphere();
        this.solarbodies.push(earth);


        const moon = new Solarbody({
            scene: earth.object,
            orbit:{
                solarbody: earth.solarbody,
                orbitDistance:{
                    x: 2,
                    y: 0,
                    z: 2
                },
                orbitalVelocity: 0.005
            },
            textureImage: image("solarbodies/2k_moon.jpg"),
            scale: 0.4
        });
        this.solarbodies.push(moon);
    }

    updateSolarbodies(options) {
        this.solarbodies.forEach((obj) => {
            obj.update();
        });
    }

    /**
     * add an AxesHelper to each node
     */
    addAxesHelper() {
        this.solarbodies.forEach((node) => {
            const axes = new AxesHelper();
            axes.material.depthTest = false;
            axes.renderOrder = 1;
            node.solarbody.add(axes);
        });
    }
}

export {
    SolarbodiesController
}