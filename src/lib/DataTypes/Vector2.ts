import DataType from './DataType';

export default class Vector2 {
    public static readonly type = 'Vector2';
    public x: Number;
    public y: Number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

}