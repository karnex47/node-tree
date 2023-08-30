<template>
    <svg class="connection"><path :d="path" stroke="black" stroke-width="2" fill="none"></path></svg>
</template>

<script lang="ts">
import { Vector2 } from '../utils/DataTypes';
import './Connection.scss'

const curvature = 30;
export default {
    name: 'Connection',
    props: {
        start: {
            type: Object,
            required: false,
            default: function() {
                return new Vector2();
            },
        },
        end: {
            type: Object,
            required: false,
            default: function() {
                return new Vector2();
            },
        },
    },
    computed: {
        path: function() {
            // return `M${this.start.x},${this.start.y} L${this.end.x},${this.end.y}`;
            const midPoint = new Vector2();
            const controlPoint = new Vector2();
            midPoint.x = (this.end.x - this.start.x)/2 + this.start.x;
            midPoint.y = (this.end.y - this.start.y)/2 + this.start.y;
            controlPoint.x = (midPoint.x - this.start.x)/2 + this.start.x;
            controlPoint.y = (midPoint.y - this.start.y)/2 + this.start.y + (midPoint.y < this.start.y ? 1 : -1) * curvature;
            return `M${this.start.x},${this.start.y} Q${controlPoint.x},${controlPoint.y} ${midPoint.x},${midPoint.y} T${this.end.x},${this.end.y}`;
        }
    }
}
</script>