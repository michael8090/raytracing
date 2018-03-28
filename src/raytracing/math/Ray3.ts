import Vector3 from './Vector3';

export default class Ray3 {
    constructor(public origin: Vector3, public direction: Vector3) {}
    getPoint(t: number) {
        return this.origin.add(this.direction.multiply(t));
    }
}
