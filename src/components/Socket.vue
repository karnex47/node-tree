<template>
    <li class="socket" @dragend="onMouseMove">
        <div
            draggable="true"
            class="draggable-socket"
            @dragstart="onDragStart"
            @dragend="onDragEnd"
            @drag="onMouseMove"
            @drop="onDrop"
        >
        </div>
        <Connection class="new-connection" :start="connectionStart" :end="newConnectionEnd"></Connection>
    </li>
</template>

<script lang="ts">
import { debounce } from 'lodash';
import Connection from './Connection';
import Node from './Node';
import './Socket.scss';
import { Vector2 } from '../utils/DataTypes';
import hasClass from '../utils/hasClass';

export default {
    name: "Socket",
    components: {
        Connection,
        Node,
    },
    data: function () {
        return {
            isDragging: false,
            connections: [],
            connectionStart: new Vector2(),
            newConnectionEnd: new Vector2(),
        };
    },
    mounted: function() {
        const rect = this.$el.getBoundingClientRect();
        this.connectionStart.x = rect.width/2;
        this.connectionStart.y = -rect.height/2;
    },
    methods: {
        onDragStart: function(event) {
            if (hasClass(event.target, 'draggable-socket')) {
                event.stopPropagation();
                this.isDragging = true;
            }
        },
        onDragEnd: function(event) {
            if (hasClass(event.target, 'draggable-socket')) {
                event.preventDefault();
                this.isDragging = false;
            }
        },
        onMouseMove: function(event) {
            if (this.isDragging) {
                const rect = event.target.getBoundingClientRect();
                this.newConnectionEnd.x = event.clientX - rect.x + rect.width/2;
                this.newConnectionEnd.y = event.clientY - rect.y - rect.height;
            }
        },
        onDrop: function(event) {
            if (hasClass(event.target, 'grid')) {
                console.log(event);
            }
        }
    }
}
</script>