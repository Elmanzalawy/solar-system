import { AxesHelper } from "three";
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
            textureImage: image("solarbodies/2k_sun.jpg"),
            scale: 5
        });
        sun.update = function () {
            this.orbit.rotation.y += 0.001;
        }
        this.solarbodies.push(sun);

        const earth = new Solarbody({
            scene: sun.orbit,
            textureImage: image("solarbodies/2k_earth_day.jpg"),
            scale: 1
        })
        earth.createAtmosphere();
        earth.orbit.position.x = 10;
        this.solarbodies.push(earth);


        const moon = new Solarbody({
            scene: earth.orbit,
            textureImage: image("solarbodies/2k_moon.jpg"),
            scale: 0.4
        });
        moon.orbit.position.x = 2.5;
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
            node.orbit.add(axes);
        });
    }
}

export {
    SolarbodiesController
}