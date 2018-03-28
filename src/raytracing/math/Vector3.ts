export default class Vector3 {
    static zero = new Vector3(0, 0, 0);
    constructor(public x: number, public y: number, public z: number) {}
    copy() {
        return new Vector3(this.x, this.y, this.z);
    }
    length() {
        return Math.sqrt(this.sqrLength());
    }
    sqrLength() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    normalize() {
        const inv = 1 / this.length();
        return new Vector3(this.x * inv, this.y * inv, this.z * inv);
    }
    negate() {
        return new Vector3(-this.x, -this.y, -this.z);
    }
    add(v: Vector3) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    subtract(v: Vector3) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    multiply(f: number) {
        return new Vector3(this.x * f, this.y * f, this.z * f);
    }
    divide(f: number) {
        const invf = 1 / f;
        return new Vector3(this.x * invf, this.y * invf, this.z * invf);
    }
    dot(v: Vector3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v: Vector3) {
        return new Vector3(
            -this.z * v.y + this.y * v.z,
            this.z * v.x - this.x * v.z,
            -this.y * v.x + this.x * v.y
        );
    }
}
