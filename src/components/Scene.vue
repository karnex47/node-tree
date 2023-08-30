<template>
    <div
        @mousewheel="onScroll"
        @mousedown="onDragStart"
        @mouseup="onDragEnd"
        @mousemove="debounceOnMouseMove"
        @dragover="onDragOver"
        :style="style"
        ref="scene"
        class="scene"
    >
        <Grid :zoomFactor="zoomFactor" :offset="offset"></Grid>
        <Node :zoomFactor="zoomFactor" :offset="offset">A beautiful node</Node>
    </div>
</template>

<script lang="ts">
import { clamp, debounce } from 'lodash';
import Grid from './Grid';
import Node from './Node';
import { Vector2 } from '../utils/DataTypes';
import getMousePosition from '../utils/getMousePosition';
import getScenePosition from '../utils/getScenePosition';
import hasClass from '../utils/hasClass';

export default {
    name: 'Scene',
    components: {
        Grid,
        Node,
    },
    props: {
        height: {
            type: String,
            required: false,
            default: '100%'
        },
        width: {
            type: String,
            required: false,
            default: '100%'
        },
    },
    data: function() {
        return { zoomFactor: 1, isPanning: false, mousePos: new Vector2(), offset: new Vector2() };
    },
    created: function() {
        this.debounceOnMouseMove = debounce(this.onMouseMove, 5);
    },
    computed: {
        style() {
            return {
                height: this.height,
                width: this.width,
            }
        },
    },
    methods: {
        onScroll: function(event: MouseEvent) {
            if (this.isPanning) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            const pos = getMousePosition(this.$refs.scene, event);
            const delta = event.wheelDelta > 0 ? 1.01 : 1.0 / 1.01;
            // TODO: configurable zoom max/min
            this.zoomFactor = clamp(this.zoomFactor * delta, 0.5, 3);
            // TODO: Fix liner interpolation
            // this.offset.x = pos.x - (pos.x - this.offset.x) * delta;
		    // this.offset.y = pos.y - (pos.y - this.offset.y) * delta;
        },
        onDragStart: function(event) {
            if (event.button === 0 && hasClass(event.target, 'grid')) {
                event.preventDefault();
                event.stopPropagation();
                this.mousePos = getMousePosition(this.$refs.scene, event);
                this.isPanning = true;
            }
        },
        onDragEnd: function(event) {
           if (event.button === 0) {
                event.preventDefault();
                event.stopPropagation();
                this.isPanning = false;
            }
        },
        onMouseMove: function(event) {
            if (this.isPanning) {
                const pos = getMousePosition(this.$refs.scene, event);
                const prev = getScenePosition(this.mousePos, this.offset, this.zoomFactor);
                const cur = getScenePosition(pos, this.offset, this.zoomFactor)
                const diff = new Vector2(prev.x - cur.x, prev.y - cur.y);
                this.offset.x -= diff.x * this.zoomFactor;
			    this.offset.y -= diff.y * this.zoomFactor;
                this.mousePos = getMousePosition(this.$refs.scene, event);
            }
        },
        onDragOver: function(event) {
            event.preventDefault();
        },
    },
}
</script>