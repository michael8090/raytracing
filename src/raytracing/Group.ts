import DisplayObject from './DisplayObject';
import Ray3 from './math/Ray3';
import IntersectResult from './IntersectResult';

export default class Group extends DisplayObject {
    constructor(public geometries: DisplayObject[]) {
        super();
    }
    copy(): this {
        return new Group(this.geometries.map(g => g.copy())) as this;
    }
    initialize(): void {
        this.geometries.forEach(g => g.initialize());
    }
    intersect(ray: Ray3) {
        let minDistance = Infinity;
        let minResult = IntersectResult.noHit;
        this.geometries.forEach(geometry => {
            const result = geometry.intersect(ray);
            if (result.geometry && result.distance < minDistance) {
                minDistance = result.distance;
                minResult = result;
            }
        });

        return minResult;
    }
}
