<template>
    <div class="grid" :style="style">

    </div>
</template>

<script lang="ts">
import { Vector2 } from '../utils/DataTypes';
import './Grid.scss';
export default {
    name: 'Grid',
    props: {
        zoomFactor: {
            type: Number,
            required: false,
            default: 1,
        },
        offset: {
            type: Object,
            required: false,
            default: function() {
                return new Vector2();
            },
        },
        height: {
            type: Number,
            required: false,
            default: 600,
        },
        width: {
            type: Number,
            required: false,
            default: 800,
        }
    },
    computed: {
        style() {
            return {
                zoom: this.zoomFactor,
                backgroundPositionX: `${this.offset.x}px`,
                backgroundPositionY: `${this.offset.y}px`,
            }
        }
    }
}
</script>

