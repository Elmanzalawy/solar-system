import { AxesHelper, TextureLoader, MeshBasicMaterial } from "three";
import { Solarbody } from "./solarbody"
import { Sun } from "./sun"

class SolarbodiesController {
    constructor(options) {
        this.solarbodies = [];
    }

    /**
     * 
     * @param {*} json 
     * seed solarbodies from json.
     */
    seedSolarbodies(json) {
        const scene = json.scene;
        const seeder = json.seeder;
        
        seeder.solarbodies.forEach(solarbody => {

            this.seedSolarbody(scene, solarbody);
        });
    }

    seedSolarbody(scene, seed){
        let current = this.createSolarbody(scene, seed);

        if(seed.children && seed.children.length > 0){
            seed.children.forEach(child => {
                this.seedSolarbody(current, child);
            });
        }
    }

    createSolarbody(parent, seed){
        let orbit = seed.orbit ? {
            ...seed.orbit,
            solarbody: parent.solarbody ?? parent,
        } : null;

        let params = {
            scene: parent.object ?? parent,
            ...seed,
            orbit:orbit,
        };

        let solarbody;

        if(seed.type == "sun"){
            solarbody = new Sun(params);
        }else{
            solarbody = new Solarbody(params);
        }
        this.solarbodies.push(solarbody);
        return solarbody;
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