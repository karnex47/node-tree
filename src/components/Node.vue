<template>
    <div
        class="node"
        :style="style"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        draggable="true"
    >
        <ul class="in-sockets">
            <component v-for="(socket, index) in sockets.in" v-bind:key="`in-${index}`" v-bind:is="socket"></component>
        </ul>
        <div class="container">Dummy text</div>
        <ul class="out-sockets">
            <component v-for="(socket, index) in sockets.out" v-bind:key="`out-${index}`" v-bind:is="socket"></component>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vector2 } from '../utils/DataTypes';
import hasClass from '../utils/hasClass';
import Socket from './Socket';
import './Node.scss';

export default {
    name: 'Node',
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
        position: {
            type: Object,
            required: false,
            default: function() {
                return new Vector2(50, 50);
            },
        },
    },
    components: {
        Socket,
    },
    data: function() {
        return {
            currentPosition: this.position,
            prevPosition: this.position,
            dragging: false,
            sockets: {
                in: [Socket, Socket],
                out: [Socket, Socket],
            }
        }
    },
    computed: {
        style() {
            // TODO: Fix positioning
            const top = (this.currentPosition.y) + this.offset.y;
            const left = (this.currentPosition.x) + this.offset.x;
            return {
                zoom: this.zoomFactor,
                top: `${top}px`,
                left: `${left}px`,
                opacity: this.dragging ? 0.5 : 1,
            }
        }
    },
    methods: {
        onDragStart: function(event) {
            if (hasClass(event.target, 'node')) {
                this.dragging = true;
                this.prevPosition = new Vector2(event.clientX, event.clientY);
            }
        },
        onDragEnd: function(event) {
            if (hasClass(event.target, 'node')) {
                event.preventDefault();
                this.dragging = false;
                this.setPosition(new Vector2(event.clientX * 1/this.zoomFactor, event.clientY * 1/this.zoomFactor));
            }
        },
        setPosition: function(position) {
            this.currentPosition = position;
        }
    }
}
</script>