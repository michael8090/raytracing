import Material from './Material';
import Ray3 from './math/Ray3';
import Vector3 from './math/Vector3';
import Color from './Color';
import Light from './Light';

export default class PhongMaterial extends Material {
    constructor(
        public diffuse: Color,
        public specular: Color,
        public shininess: number,
        public reflectiveness: number
    ) {
        super();
    }
    sample(ray: Ray3, position: Vector3, normal: Vector3, light: Light): Color {
        const NdotL = normal.dot(light.direction);
        const H = light.direction.subtract(ray.direction).normalize();
        const NdotH = normal.dot(H);
        const diffuseTerm = this.diffuse.multiply(Math.max(NdotL, 0));
        const specularTerm = this.specular.multiply(
            Math.pow(Math.max(NdotH, 0), this.shininess)
        );
        return light.color.modulate(diffuseTerm.add(specularTerm));
    }
}
