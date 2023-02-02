import './style.css';
import { image, dimensions } from '~util'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Skybox, randomSkybox } from './scene/skybox';
import { Controls } from './scene/controls';
import { Camera } from './scene/camera';
import { Solarbody } from './solarbodies/solarbody';
import { SolarbodiesController } from './solarbodies/solarbodiesController';

// Scene
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
const skybox = new Skybox(randomSkybox());
scene.add(skybox);

// Light
const light = new THREE.PointLight(0xffffff, 2, 100, 1);
light.position.set(0, 0, 0);
scene.add(light);

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

// // 3D Object
// const loader = new GLTFLoader();
// loader.load('assets/models/free_cyberpunk_hovercar/scene.gltf', function (gltf) {
//   // scene.add(gltf.scene);
//   gltf.scene.position.z = 20;
// }, undefined, function (error) {
//   console.error(error);
// });

// loader.load('assets/models/galaxy/scene.gltf', function (gltf) {
//   gltf.scene.position.y = -60;
//   gltf.scene.position.x = -100;
//   gltf.scene.position.z = 100;

//   gltf.scene.scale.set(60, 30, 60);

//   // scene.add(gltf.scene);
// }, undefined, function (error) {
//   console.error(error);
// });


function init() {
  // Render solarbodies
  solarbodiesController.initSolarbodies({ scene });
  solarbodiesController.addAxesHelper();
  animate();
}

const animate = () => {
  controls.update();
  solarbodiesController.updateSolarbodies();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

init();