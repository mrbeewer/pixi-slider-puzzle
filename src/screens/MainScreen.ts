import { LayoutContainer } from "@pixi/layout/components";
import { Assets, Container } from "pixi.js";
import { app } from "../main";
import { Controls } from "../components/Controls";
import { Tile } from "../components/Tile";
import { TileGrid } from "../components/TileGrid";

export class MainScreen extends Container {

    public mainContainer: LayoutContainer;
    private controls: Controls | undefined;

    constructor() {
        super();

        this.mainContainer = new LayoutContainer({
            layout: {
                width: app.screen.width,
                height: app.screen.height,
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                flexDirection: "row",
                backgroundColor: "black",
            },
        });

        this.addChild(this.mainContainer);

        this.prepare();

        requestAnimationFrame(() => {
            this.resize(app.screen.width, app.screen.height);
        });
    }

    public async prepare() {

        // const texture = Assets.get("bunny");
        // const toy = new Sprite({
        //     texture: texture,
        //     anchor: 0.5,
        //     scale: 6,
        //     alpha: 1,
        // });

        // toy.x = app.screen.width / 2;
        // toy.y = app.screen.height / 2;

        const tileGrid = new TileGrid();
        this.mainContainer.addChild(tileGrid);

        const toy = new Tile(Assets.get("bunny")!, this.mainContainer, tileGrid);

        this.mainContainer.addChild(toy);

        this.controls = new Controls(toy);

        this.mainContainer.addChild(this.controls);
    }

    public resize(width: number, height: number) {
        // Update the layout container size so children using percentages/intrinsic sizes recalculate
        this.mainContainer.layout = {
            width: width,
            height: height,
        };

        // Center the main container on the screen. Use pivot so the container's center aligns with the stage center.
        // We use the provided width/height because layout should match these values.
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        this.mainContainer.pivot.set(centerX, centerY);
        this.mainContainer.position.set(0, 0);

        // If you have other size-dependent children, update them here (for example artBoard)
        // this.artBoard.layout = { width: ..., height: ... };
        if (this.controls) {
            this.controls.resize(width, height);
        }
    }
}
