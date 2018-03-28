import Material from './Material';
import Ray3 from './math/Ray3';
import Vector3 from './math/Vector3';
import Color from './Color';

export default class CheckerMaterial extends Material {
    constructor(public scale: number, public reflectiveness: number) {
        super();
    }
    sample(ray: Ray3, position: Vector3, normal: Vector3): Color {
        return Math.abs(
            (Math.floor(position.x * 0.1) +
                Math.floor(position.z * this.scale)) %
                2
        ) < 1
            ? Color.black
            : Color.white;
    }
}
