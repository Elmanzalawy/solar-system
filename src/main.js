import './style.css';
import { asset, dimensions } from '~util'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Skybox } from './scene/skybox';
import { Controls } from './scene/controls';
import { Camera } from './scene/camera';
import { SolarbodiesController } from './solarbodies/solarbodiesController';

// Scene
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

// Light
const light = new THREE.PointLight(0xffffff, 2, 300, 1);
light.position.set(0, 0, 0);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// Camera
const camera = new Camera();

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(dimensions().width, dimensions().height);
renderer.setPixelRatio(2); // smoothing
renderer.render(scene, camera);

// Controls
let controls = new Controls(camera, canvas);

// Solarbodies Controller
const solarbodiesController = new SolarbodiesController();

window.addEventListener('resize', () => {
  // Update dimensions
  dimensions().width = window.innerWidth;
  dimensions().height = window.innerHeight;

  // Update Camera
  camera.aspect = dimensions().width / dimensions().height;
  camera.updateProjectionMatrix();
  renderer.setSize(dimensions().width, dimensions().height);
})   

function init() {
  // Render solarbodies
  fetch(asset('seeders/galaxies/sol.json'))
    .then((response) => response.json())
    .then(function(seeder){
      const skybox = new Skybox(seeder.skybox);
      scene.add(skybox);      
      solarbodiesController.seedSolarbodies({ scene, seeder});
      // solarbodiesController.addAxesHelper();
    });
  animate();
}

const animate = () => {
  controls.update();
  solarbodiesController.updateSolarbodies();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

init();