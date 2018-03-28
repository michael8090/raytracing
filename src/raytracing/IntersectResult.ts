import Vector3 from './math/Vector3';
import DisplayObject from './DisplayObject';

export default class InterSectResult {
    static noHit = new InterSectResult();
    constructor(
        public geometry: DisplayObject | null = null,
        public distance: number = 0,
        public position: Vector3 = Vector3.zero,
        public normal: Vector3 = Vector3.zero
    ) {}
}
