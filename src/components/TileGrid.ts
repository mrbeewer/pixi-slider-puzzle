import { LayoutContainer } from "@pixi/layout/components";
import { Assets, Graphics, Sprite } from "pixi.js";
import { Tile } from "./Tile";

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
            // justifyContent: 'center',
            // alignContent: 'center',
            borderWidth: 0,
            borderColor: `#fff`,
            backgroundColor: 'black'
        }

        this.label = "tileGrid";
        this.eventMode = "passive";

        this.prepare();
    }

    public prepare() {

        const size = 400;
        const start = 75;

        // 2x2 grid of different colors
        const topLeft = new Graphics()
            .roundRect(start, start, size, size, 0)
            .fill('green');
        const topRight = new Graphics()
            .roundRect(start + size, start, size, size, 0)
            .fill('yellow');
        const bottomLeft = new Graphics()
            .roundRect(start, start + size, size, size, 0)
            .fill('blue');
        const bottomRight = new Graphics()
            .roundRect(start + size, start + size, size, size, 0)
            .fill('pink');

        this.addChild(topLeft);
        this.addChild(topRight);
        this.addChild(bottomLeft);
        this.addChild(bottomRight);

        this.dropZones.push(topLeft, topRight, bottomLeft, bottomRight);

        const bunnyContainer = new LayoutContainer({
            layout: {
                position: 'absolute',
                width: size,
                height: size,
                justifyContent: "center",
                alignItems: "center",
            }
        });
        bunnyContainer.cursor = "pointer";

        this.addChild(bunnyContainer);
        bunnyContainer.position.set(start, start);

        const bunnyTightContainer = new LayoutContainer({
            layout: {
                width: 100,
                height: 100,
                padding: 0,
            }
        });
        bunnyTightContainer.label = "bunnyTightContainer";

        bunnyContainer.addChild(bunnyTightContainer);

        const bunny = new Sprite(Assets.get("bunny")!);
        // bunny.anchor.set(0.5);
        // bunny.scale.set(3);
        bunny.width = 100;
        bunny.height = 100;
        // bunny.position.set(bunnyContainer.width / 2 + bunny.width, bunnyContainer.height);
        bunnyTightContainer.addChild(bunny);


        // const toy = new Tile(Assets.get("bunny")!, this, this);
        // toy.position.set(75, 75);
        // this.addChild(toy);
    }

    public resize(width: number, height: number) {
        // Update the layout container size so children using percentages/intrinsic sizes recalculate
        this.layout = {
            width: width,
            height: height,
        };
    }
}