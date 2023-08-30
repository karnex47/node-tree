import { Vector2 } from '../utils/DataTypes';

export class Scene {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    eventListeners: Object;
    zoomFactor: Number;
    screenOffset: Vector2;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.zoomFactor = 1;
        this.screenOffset = new Vector2();
        const eventListenerSignatures = {
            mousedown: this.onMouseDown,
            mousewheel: this.onMouseScroll,
        };
        this.eventListeners = {};
        const self = this;
        Object.keys(eventListenerSignatures).forEach((eventName) => {
            const handler = event => eventListenerSignatures[eventName].call(self, event);
            this.canvas.addEventListener(eventName, handler);
            this.eventListeners[eventName] = handler;
        });
    }

    dispose() {
        Object.keys(this.eventListeners).forEach((eventName) => {
            this.canvas.removeEventListener(eventName, this.eventListeners[eventName]);
        });
    }

    getMousePos(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    onMouseDown(event: MouseEvent) {
        const pos = this.getMousePos(event);
        console.log(pos);
        this.ctx.beginPath();

        this.ctx.arc(pos.x, pos.y, 5 * this.zoomFactor, 0, Math.PI*2);
        this.ctx.stroke();
    }

    onMouseScroll(event: WheelEvent) {
		// no panning while zooming
		const pos = this.getMousePos(event);
		const delta = <Number>event.wheelDelta > 0 ? 1.1 : 1.0 / 1.1;

		this.zoomFactor *= delta;
		this.screenOffset.x = pos.x - (pos.x - this.screenOffset.x) * delta; // * (factor);
		this.screenOffset.y = pos.y - (pos.y - this.screenOffset.y) * delta; // * (factor);

		//this.zoom(pos.x, pos.y, delta);

		event.preventDefault();
		return false;
	}

}