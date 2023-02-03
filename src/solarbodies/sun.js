import { image } from '../util';
import { Solarbody } from './solarbody';
import { TextureLoader, MeshBasicMaterial } from "three";

class Sun extends Solarbody{
    constructor(options){
        options.material = new MeshBasicMaterial({
            map: new TextureLoader().load(image(options.textureImage))
        });
        super(options);
        this.type = "sun";
    }
}
export{
    Sun
}