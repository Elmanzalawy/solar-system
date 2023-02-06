import * as THREE from 'three';
import { image } from '../util';

const skyBoxes = [
    'skybox1',
    'skybox2',
];

class Skybox {

    constructor(folderName) {
        this.folderName = folderName
        this.baseFolderName = image(`skyboxes/${this.folderName}/`);

        return this.render();
    }

    render() {
        const materialArray = this.createMaterialArray(this.baseFolderName);
        const skyboxGeo = new THREE.BoxGeometry(99999, 99999, 99999);
        return new THREE.Mesh(skyboxGeo, materialArray);
    }

    createPathStrings(folderName) {
        const fileType = ".png";
        const sides = [1, 2, 3, 4, 5, 6];
        const pathStrings = sides.map(side => {
            return folderName + side + fileType;
        });

        return pathStrings;
    }

    createMaterialArray(folderName) {
        const skyboxImagepaths = this.createPathStrings(folderName);
        const materialArray = skyboxImagepaths.map(image => {
            let texture = new THREE.TextureLoader().load(image);

            return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---
        });

        return materialArray;
    }
}

function randomSkybox() {
    return skyBoxes[Math.floor(Math.random() * skyBoxes.length)];
}

export {
    Skybox,
    randomSkybox
}