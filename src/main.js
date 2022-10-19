import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Sphere } from './sphere'

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(200);
camera.position.setX(200);
renderer.render(scene, camera);


// Sun
let Sun = new Sphere({ radius: 50, coords: { x: 0, y: 0, z: 0, }, centre: { x: 0, y: 0, z: 0 }, rotation_deg: 0, deg: 0, distance: 0, revolutionIncrement: 0, rotationIncrement: 0, img: "/img/sun.jpg" }) // 0.24 for rotation every 30 secs (revolutionIncrement)
Sun.init();
scene.add(Sun._obj);

// Moon
let Moon = new Sphere({ radius: 3, coords: { x: 0, y: 0, z: 0, }, centre: { x: 0, y: 0, z: 0 }, rotation_deg: 0, deg: 0, distance: 30, revolutionIncrement: 0.74, rotationIncrement: 0.5, img: "/img/moon.jpg", texture: "/img/moon_normal.jpg" })
Moon.init();
scene.add(Moon._obj);

// Earth
let Earth = new Sphere({ radius: 10, coords: { x: 0, y: 0, z: 0, }, centre: { x: 0, y: 0, z: 0 }, rotation_deg: 0, deg: 0, distance: 300, revolutionIncrement: 0.06, rotationIncrement: 21.9, img: "/img/earth.jpg", texture: "/img/earth_normal.jpg" })
Earth.init();
scene.add(Earth._obj);

// Mercury
let Mercury = new Sphere({ radius: 4, coords: { x: 0, y: 0, z: 0, }, centre: { x: 0, y: 0, z: 0 }, rotation_deg: 0, deg: 0, distance: 150, revolutionIncrement: 0.249, rotationIncrement: 0.373, img: "/img/moon.jpg", texture: "/img/moon_normal.jpg" })
Mercury.init();
scene.add(Mercury._obj);

// Venus
let Venus = new Sphere({ radius: 9, coords: { x: 0, y: 0, z: 0, }, centre: { x: 0, y: 0, z: 0 }, rotation_deg: 0, deg: 0, distance: 250, revolutionIncrement: 0.097, rotationIncrement: -0.09, img: "/img/venus.jpg", texture: "/img/venus_normal.jpg" })
Venus.init();
scene.add(Venus._obj);

// Mars
let Mars = new Sphere({ radius: 5, coords: { x: 0, y: 0, z: 0, }, centre: { x: 0, y: 0, z: 0 }, rotation_deg: 0, deg: 0, distance: 450, revolutionIncrement: 0.032, rotationIncrement: 21.346, img: "/img/mars.jpg" })
Mars.init();
scene.add(Mars._obj);

// Lights for sun
let lights = [];
let main = new THREE.PointLight(0xffffff, 1.5, 10000, 2)
main.position.set(0, -70, 0)
scene.add(main)
for (let i = 0; i < 20; i++) {
    lights.push(new THREE.PointLight(0xffffff, 1.5, 300, 2));
}
lights[0].position.set(0, 70, 0); lights[1].position.set(0, -70, 0); lights[2].position.set(70, 0, 0); lights[3].position.set(-70, 0, 0); lights[4].position.set(70, 70, 0); lights[5].position.set(-70, 70, 0); lights[6].position.set(70, -70, 0); lights[7].position.set(-70, -70, 0); lights[8].position.set(0, 0, 70); lights[9].position.set(0, 0, -70); lights[12].position.set(0, 70, 70); lights[13].position.set(0, -70, 70); lights[14].position.set(0, 70, -70); lights[15].position.set(0, -70, -70); lights[16].position.set(70, 0, 70); lights[17].position.set(-70, 0, 70); lights[18].position.set(70, 0, -70); lights[19].position.set(-70, 0, -70);

for (let i of lights) {
    scene.add(i);
};


// Helpers
// for (let i of lights) {
//     const lightHelper = new THREE.PointLightHelper(i);
//     scene.add(lightHelper)
// };
// const gridHelper = new THREE.GridHelper(800, 50);
// scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


// Update Loop
function update() {
    Sun.updatePos();
    Earth.updatePos();
    Mercury.updatePos();
    Venus.updatePos();
    Mars.updatePos();

    Moon._centre = { x: Earth._coords.x, y: 0, z: Earth._coords.z };
    Moon.updatePos();

    animate();
}

// Animation Loop
function animate() {
    Sun._obj.rotation.y += 0.005;
    Sun._obj.rotation.z += 0.001;

    controls.update();
    renderer.render(scene, camera);
}
setInterval(update, 20)
animate();