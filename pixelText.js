export default class PixelText extends HTMLSpanElement {

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const color = getComputedStyle(this).color;


        const style = document.createElement('style');
        style.textContent = `
        :host {
            image-rendering: pixelated;
            background-repeat: no-repeat;
            background-size: 100%;
            color: transparent !important;
            background-position: center;
        }`
        shadow.appendChild(style);

        const slot = document.createElement('slot');
        shadow.appendChild(slot);

        const canvas = document.createElement("canvas");
        const base = 12;
        const text = this.textContent.trim();
        const ctx = canvas.getContext("2d");

        ctx.font = `${base}px SimSun`;
        canvas.width = ctx.measureText(text).width;
        canvas.height = base;

        ctx.fillStyle = color;
        ctx.font = `${base}px SimSun`;
        ctx.fillText(text, 0, base - 2);


        canvas.toBlob((blob) => {
            this.url = URL.createObjectURL(blob);
            this.style.backgroundImage = `url(${this.url})`;
        });
    }

    url;
    disconnectedCallback() {
        URL.revokeObjectURL(this.url);
    }
}
