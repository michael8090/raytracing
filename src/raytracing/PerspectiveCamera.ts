import Vector3 from './math/Vector3';
import Ray3 from './math/Ray3';

export default class PerspectiveCamera {
    right: Vector3;
    fovScale: number;
    private refUp: Vector3;

    constructor(
        public eye: Vector3,
        public front: Vector3,
        public up: Vector3,
        public fov: number
    ) {
        this.refUp = up;
    }

    initialize() {
        this.right = this.front.cross(this.refUp);
        this.up = this.right.cross(this.front);
        this.fovScale = Math.tan(this.fov * 0.5 * Math.PI / 180) * 2;
    }

    generateRay(x: number, y: number) {
        const r = this.right.multiply((x - 0.5) * this.fovScale);
        const u = this.up.multiply((y - 0.5) * this.fovScale);
        return new Ray3(
            this.eye,
            this.front
                .add(r)
                .add(u)
                .normalize()
        );
    }
}
