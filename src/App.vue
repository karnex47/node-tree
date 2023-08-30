<template>
    <div class="container">
        <Scene />
    </div>
</template>

<script lang="ts">
import Scene from './components/Scene';

export default {
    name: 'App',
    components: {
        Scene,
    },
    props: {
        height: {
            type: Number,
            required: false,
            default: 1
        },
        width: {
            type: Number,
            required: false,
            default: 1
        },
    },
    mounted: function() {
        // const scene = new Scene(this.$refs.canvas);
    }
}
</script>