import Ray3 from './math/Ray3';
import IntersectResult from './IntersectResult';
import Material from './Material';

export default abstract class DisplayObject {
    material?: Material;
    abstract copy(): this;

    abstract initialize(): void;

    abstract intersect(ray: Ray3): IntersectResult;
}
