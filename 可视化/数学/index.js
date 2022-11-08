export class Vector2D extends Array {
    constructor(x = 1, y = 0) {
        super(x, y);
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }


    get len() {
        return Math.hypot(this.x, this.y);
    }

    get dir() {
        return Math.atan2(this.y, this.x);
    }

    // 计算夹角
    cross(v) {
        return this.x * v.y - v.x * this.y;
    }
}