import { Vector2 } from './DataTypes';

export default function(pos, offset, zoomFactor) {
    return new Vector2(
        (pos.x - offset.x) * (1.0 / zoomFactor),
        (pos.y - offset.y) * (1.0 / zoomFactor)
    );
}