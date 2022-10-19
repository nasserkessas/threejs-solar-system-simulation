import * as THREE from 'three';

export class Sphere {
    constructor({ radius, coords = { x: 0, y: 0, z: 0, }, centre = { x: 0, y: 0, z: 0 }, rotation_deg, deg, distance, revolutionIncrement, rotationIncrement, img, texture }) {
        this._radius = radius;
        this._coords = coords;
        this._centre = centre;
        this._rotation_deg = rotation_deg;
        this._deg = deg;
        this._distance = distance;
        this._revolutionIncrement = revolutionIncrement;
        this._rotationIncrement = rotationIncrement;
        this._img = img;
        this._texture = texture;
    }

    init() {
        const moonTexture = new THREE.TextureLoader().load(this._img);
        if (this._texture) {
            const moonNormalTexture = new THREE.TextureLoader().load(this._texture);
            this._obj = new THREE.Mesh(
                new THREE.SphereGeometry(this._radius, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: moonTexture,
                    normalMap: moonNormalTexture,
                })
            );
        }
        else {
            this._obj = new THREE.Mesh(
                new THREE.SphereGeometry(this._radius, 32, 32),
                new THREE.MeshStandardMaterial({
                    map: moonTexture,
                })
            );
        }

    }

    updatePos() {
        this._deg += this._revolutionIncrement;
        this._rotation_deg = this._rotationIncrement * Math.PI / 180
        this._coords.x = Math.cos(this._deg * (Math.PI / 180)) * this._distance + this._centre.x;
        this._coords.z = Math.sin(this._deg * (Math.PI / 180)) * this._distance + this._centre.z;
        this._coords.y = this._centre.y;
        this._obj.position.x = this._coords.x;
        this._obj.position.z = this._coords.z;
        this._obj.rotation.y += this._rotationIncrement * Math.PI / 180
    }
}