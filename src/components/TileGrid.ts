import { LayoutContainer } from "@pixi/layout/components";
import { Graphics } from "pixi.js";

export class TileGrid extends LayoutContainer {
    // Attributes
    public btnWidth = 220;
    public btnHeight = 40;
    public btnRadius = 5;
    public btnFill = 'white';

    public dropZones: Graphics[] = [];

    constructor() {
        super();

        this.layout = {
            width: '100%',
            height: '100%',
            padding: 0,
            gap: 0,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'center',
            borderWidth: 0,
            borderColor: `#fff`,
            backgroundColor: 'black'
        }

        this.label = "tileGrid";
        this.eventMode = "passive";

        this.prepare();
    }

    public prepare() {

        const size = 300;

        // 2x2 grid of different colors
        const topLeft = new Graphics()
            .roundRect(0, 0, size, size, 0)
            .fill('green');
        const topRight = new Graphics()
            .roundRect(size, 0, size, size, 0)
            .fill('yellow');
        const bottomLeft = new Graphics()
            .roundRect(0, size, size, size, 0)
            .fill('blue');
        const bottomRight = new Graphics()
            .roundRect(size, size, size, size, 0)
            .fill('pink');

        this.addChild(topLeft);
        this.addChild(topRight);
        this.addChild(bottomLeft);
        this.addChild(bottomRight);

        this.dropZones.push(topLeft, topRight, bottomLeft, bottomRight);
    }

    public resize(width: number, height: number) {
        // Update the layout container size so children using percentages/intrinsic sizes recalculate
        this.layout = {
            width: width,
            height: height,
        };
    }
}