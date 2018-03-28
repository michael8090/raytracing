import Vector3 from './math/Vector3';
import Color from './Color';

export default class Light {
    constructor(public direction: Vector3, public color: Color) {}
}
