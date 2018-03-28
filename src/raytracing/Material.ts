import Color from './Color';
import Ray3 from './math/Ray3';
import Vector3 from './math/Vector3';
import Light from './Light';

export default abstract class Material {
    abstract sample(
        ray: Ray3,
        position: Vector3,
        normal: Vector3,
        light: Light
    ): Color;
}
