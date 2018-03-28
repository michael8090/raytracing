import DisplayObject from './DisplayObject';
import Vector3 from './math/Vector3';
import Ray3 from './math/Ray3';
import IntersectResult from './IntersectResult';

export default class Plane extends DisplayObject {
    public position: Vector3;
    constructor(public normal: Vector3, public d: number) {
        super();
    }
    copy() {
        return new Plane(this.normal.copy(), this.d) as this;
    }
    initialize(): void {
        this.position = this.normal.multiply(this.d);
    }
    intersect(ray: Ray3) {
        const a = ray.direction.dot(this.normal);
        if (a >= 0) {
            return IntersectResult.noHit;
        }

        const b = this.normal.dot(ray.origin.subtract(this.position));
        const result = new IntersectResult();
        result.geometry = this;
        result.distance = -b / a;
        result.position = ray.getPoint(result.distance);
        result.normal = this.normal;
        return result;
    }
}
