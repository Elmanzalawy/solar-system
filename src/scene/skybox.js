import * as THREE from 'three';

const skyBoxes = [
    'skybox3/corona',
    'skybox4/redeclipse'
];

class Skybox {

    constructor(filename) {
        this.filename = filename
        this.baseFilename = "../../assets/images/skyboxes/" + this.filename;

        return this.render();
    }

    render() {
        const materialArray = this.createMaterialArray(this.baseFilename);
        const skyboxGeo = new THREE.BoxGeometry(99999, 99999, 99999);
        return new THREE.Mesh(skyboxGeo, materialArray);
    }

    createPathStrings(filename) {
        const fileType = ".png";
        const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
        const pathStrings = sides.map(side => {
            return filename + "_" + side + fileType;
        });

        return pathStrings;
    }

    createMaterialArray(filename) {
        const skyboxImagepaths = this.createPathStrings(filename);
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