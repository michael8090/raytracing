import Vector3 from './math/Vector3';
import Ray3 from './math/Ray3';
import IntersectResult from './IntersectResult';
import DisplayObject from './DisplayObject';

export default class Sphere extends DisplayObject {
    public sqrRadius: number;
    constructor(public center: Vector3, public radius: number) {
        super();
    }
    copy() {
        return new Sphere(this.center.copy(), this.radius) as this;
    }

    initialize() {
        this.sqrRadius = this.radius * this.radius;
    }

    intersect(ray: Ray3) {
        const v = ray.origin.subtract(this.center);
        const a0 = v.sqrLength() - this.sqrRadius;
        const DdotV = ray.direction.dot(v);

        if (DdotV <= 0) {
            const discr = DdotV * DdotV - a0;
            if (discr >= 0) {
                const result = new IntersectResult();
                result.geometry = this;
                result.distance = -DdotV - Math.sqrt(discr);
                result.position = ray.getPoint(result.distance);
                result.normal = result.position
                    .subtract(this.center)
                    .normalize();
                return result;
            }
        }

        return IntersectResult.noHit;
    }
}
