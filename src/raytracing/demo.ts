import Plane from './Plan';
import Sphere from './Sphere';
import CheckerMaterial from './CheckerMaterial';
import PhongMaterial from './PhoneMaterial';
import Vector3 from './math/Vector3';
import Color from './Color';
import Group from './Group';
import PerspectiveCamera from './PerspectiveCamera';
import { rayTraceReflection } from './rayTrace';
import Light from './Light';
// import Ray3 from './math/Ray3';

function createCanvas(canvasWidth: number, canvasHeight: number) {
    const canvas = document.createElement('canvas');
    canvas.width = devicePixelRatio * canvasWidth;
    canvas.height = devicePixelRatio * canvasHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    return canvas;
}

const { body } = document;
const container = document.createElement('div');
container.style.cssText =
    'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);';
body.appendChild(container);
const size = Math.min(body.clientWidth, body.clientHeight) * 0.8;
container.style.width = `${size}px`;
container.style.height = `${size}px`;
const cvs = createCanvas(size, size);
container.appendChild(cvs);
const ctx = cvs.getContext('2d')!;
const { width, height } = cvs;

const plane = new Plane(new Vector3(0, 1, 0), 0);
const sphere1 = new Sphere(new Vector3(-10, 10, -10), 10);
const sphere2 = new Sphere(new Vector3(10, 10, -10), 10);
const group = new Group([plane, sphere1, sphere2]);

const camera = new PerspectiveCamera(
    new Vector3(0, 5, 15),
    new Vector3(0, 0, -1),
    new Vector3(0, 1, 0),
    90
);

const fixedLookAt = camera.eye.add(camera.front.multiply(15));

const light = new Light(new Vector3(1, 1, 1).normalize(), Color.white);
plane.material = new CheckerMaterial(0.1, 0.5);
sphere1.material = new PhongMaterial(Color.red, Color.white, 16, 0.25);
sphere2.material = new PhongMaterial(Color.blue, Color.white, 16, 0.25);

function draw() {
    rayTraceReflection({ ctx, width, height }, group, light, camera, 1);
}

draw();

let lastPosition: Vector3 | null;
container.onmousedown = e => {
    lastPosition = new Vector3(e.pageX, e.pageY, 0);
};

container.onmousemove = e => {
    if (lastPosition) {
        const newPosition = new Vector3(e.pageX, e.pageY, 0);
        const delta = newPosition.subtract(lastPosition);
        lastPosition = newPosition;
        camera.eye = camera.eye.add(delta);
        camera.front = fixedLookAt.subtract(camera.eye).normalize();
        draw();
    }
};

container.onmouseup = () => (lastPosition = null);
