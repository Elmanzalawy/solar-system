import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Scene } from './scene/scene';
import { Controls } from './scene/controls';
import { Solarbody } from './solarbodies/solarbody';
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
// var ambientLight = new THREE.AmbientLight( 0xffffff, 0.1 );
// scene.add( ambientLight );
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 500);
camera.position.set(0, 50, 0);
camera.up.set(0, 1, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);

// Renderer
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2); // smoothing
renderer.render(scene, camera);

// an array of objects whose rotation to update
const objects = [];

// Sphere
const sphereGeometry = new THREE.SphereGeometry(
  1, 5, 5);

const sun = new Solarbody({
  scene: scene,
  material: new THREE.MeshStandardMaterial({ emissive: 0xFFFF00 }),
  scale: 5
});
sun.update = function() {
  this.orbit.rotation.y += 0.002;
}

objects.push(sun);

const earth = new Solarbody({
  scene: sun.orbit,
  material: new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 }),
  scale:1
})
earth.orbit.position.x = 10;
objects.push(earth);


const moon = new Solarbody({
  scene: earth.orbit,
  material: new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 }),
  scale: 0.4
});
moon.orbit.position.x = 2.5;
objects.push(moon);

// add an AxesHelper to each node
objects.forEach((node) => {
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  node.orbit.add(axes);
});


// 3D Object
const loader = new GLTFLoader();
loader.load('assets/models/free_cyberpunk_hovercar/scene.gltf', function (gltf) {
  scene.add(gltf.scene);
  gltf.scene.position.z = 20;
}, undefined, function (error) {
  console.error(error);
});

loader.load('assets/models/galaxy/scene.gltf', function (gltf) {
  gltf.scene.position.y = -60;
  gltf.scene.position.x = -100;
  gltf.scene.position.z = 100;

  gltf.scene.scale.set(60, 30, 60);

  scene.add(gltf.scene);
}, undefined, function (error) {
  console.error(error);
});

const controls = new Controls(camera, canvas);

// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

const animate = () => {
  controls.update();
  objects.forEach((obj) => {
    obj.update();
  });
  
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();