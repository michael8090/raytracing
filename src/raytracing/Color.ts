export default class Color {
    static black = new Color(0, 0, 0);
    static white = new Color(1, 1, 1);
    static red = new Color(1, 0, 0);
    static green = new Color(0, 1, 0);
    static blue = new Color(0, 0, 1);
    constructor(public r: number, public g: number, public b: number) {}
    copy() {
        return new Color(this.r, this.g, this.b);
    }
    add(c: Color) {
        return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
    }
    multiply(s: number) {
        return new Color(this.r * s, this.g * s, this.b * s);
    }
    modulate(c: Color) {
        return new Color(this.r * c.r, this.g * c.g, this.b * c.b);
    }
}
