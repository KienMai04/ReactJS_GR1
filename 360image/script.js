//import * as lilGui from 'lil-gui';
//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js';

//import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
//import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
//import './style.css';

// GUI Configurator
  // const gui = new lilGui.GUI();
  // add the camera to the GUI
  //   gui
  //     .add(model.position, 'x')
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name('Model X Axis Position');
  //   gui
  //     .add(model.position, 'y')
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name('Model Y Axis Position');
  //   gui
  //     .add(model.position, 'z')
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name('Model Z Axis Position');

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./model/image1.jpeg');

// Geometry và Material cho hình cầu
const sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.BackSide,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 1; // Giới hạn zoom gần nhất
controls.maxDistance = 1400; // Giới hạn zoom xa nhất

// Zoom bằng cuộn chuột (thay đổi vị trí camera)
window.addEventListener('wheel', (event) => {
  camera.position.z += event.deltaY * 0.1; // Phóng to/thu nhỏ
  camera.position.z = THREE.MathUtils.clamp(camera.position.z, 10, 500); // Giới hạn khoảng cách zoom
});

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

  