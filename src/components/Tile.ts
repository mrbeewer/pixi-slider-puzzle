import { Container, FederatedPointerEvent, Graphics, Sprite, Texture } from "pixi.js";
import { app } from '../main';
import { TileGrid } from "./TileGrid";

export class Tile extends Sprite {
    // Attributes
    public btnWidth = 50;
    public btnHeight = 50;
    private parentContainer: Container;
    private dragTarget: (Sprite & { dragOffset?: { x: number; y: number } | null }) | undefined;
    public toyTexture: Texture;
    public toySprite!: Sprite;
    private defaultScale = 3; // 0.75 is about right
    private tileGrid: TileGrid | undefined;
    private dropZones: Graphics[] = [];

    private pointerMoveHandler?: (event: FederatedPointerEvent) => void;
    private pointerUpHandler?: () => void;

    constructor(tileTexture: Texture, parentContainer: Container, tileGrid?: TileGrid) {
        const texture = tileTexture;
        super({ texture, layout: false });

        this.toyTexture = texture;
        this.parentContainer = parentContainer;
        this.tileGrid = tileGrid;
        this.dropZones = tileGrid ? tileGrid.dropZones : [];

        this.prepare();
    }

    public async prepare() {
        // Scale the sprite
        this.scale.set(this.defaultScale);

        // Center the sprite's anchor point
        this.anchor.set(0.5);

        // Set zIndex for layering
        this.zIndex = 50;

        // Keeps the sprite from being offset due to the layout container
        // this.layout = {
        //     position: 'absolute',
        // }

        // Move the sprite to the center of the container
        // this.position.set(this.parentContainer.width / 2 - this.width / 2, this.parentContainer.height / 2 - this.height / 2);

        // Make the sprite interactive (drag)
        this.eventMode = "static";

        // Set the cursor
        this.cursor = "pointer";

        // OnPointerDown, drag if it is an opaque pixel
        this.on("pointerdown", (event) => {
            this.onDragStart(event);
        });
    }

    public onDragStart(event: FederatedPointerEvent) {
        this.alpha = 0.5;
        this.dragTarget = this;

        // Get pointer position in containerScene's local coordinates
        const pointerLocal = event.getLocalPosition(this.parentContainer);

        // Store offset between pointer and sprite center
        // const pointerPos = event.global;
        this.dragTarget.dragOffset = {
            x: pointerLocal.x - this.dragTarget.x,
            y: pointerLocal.y - this.dragTarget.y
        };

        this.pointerMoveHandler = (event) => this.onDragMove(event);
        this.pointerUpHandler = () => this.onDragEnd();

        app.stage.on('pointermove', this.pointerMoveHandler);
        app.stage.on('pointerup', this.pointerUpHandler);
        app.stage.on('pointerupoutside', this.pointerUpHandler);
    }

    public onDragMove(event: FederatedPointerEvent) {
        if (this.dragTarget && this.dragTarget.dragOffset) {
            // Get pointer position in containerScene's local coordinates
            const pointerLocal = event.getLocalPosition(this.parentContainer);

            // Calculate new position
            let newX = pointerLocal.x - this.dragTarget.dragOffset.x;
            let newY = pointerLocal.y - this.dragTarget.dragOffset.y;

            // clamp position to increments of 10 pixels
            newX = Math.round(newX / 100) * 100;
            newY = Math.round(newY / 100) * 100;

            this.dropZones.forEach(zone => {
                const zoneCenterX = zone.getBounds().x + zone.getBounds().width / 2;
                const zoneCenterY = zone.getBounds().y + zone.getBounds().height / 2;

                const distance = Math.hypot(newX - zoneCenterX, newY - zoneCenterY);

                console.log(distance);

                if (distance < 50) {
                    zone.alpha = 0.5;
                } else {
                    zone.alpha = 1;
                }

            });

            // Clamp X and Y so the sprite stays inside parentContainer
            // const halfWidth = this.dragTarget.width * this.dragTarget.anchor.x;
            // const halfHeight = this.dragTarget.height * this.dragTarget.anchor.y;

            // newX = Math.max(-halfWidth, Math.min(this.parentContainer.width - halfWidth, newX));
            // newY = Math.max(-halfHeight, Math.min(this.parentContainer.height - halfHeight, newY));

            this.dragTarget.position.set(newX, newY);
        }
    }

    public onDragEnd() {
        if (this.dragTarget) {
            if (this.pointerMoveHandler) {
                app.stage.off('pointermove', this.pointerMoveHandler);
                this.pointerMoveHandler = undefined;
            }
            if (this.pointerUpHandler) {
                app.stage.off('pointerup', this.pointerUpHandler);
                app.stage.off('pointerupoutside', this.pointerUpHandler);
                this.pointerUpHandler = undefined;
            }
            this.dragTarget.alpha = 1;
            this.dragTarget.dragOffset = null;
            this.dragTarget = undefined;
        }
    }

    public resize(width: number, height: number) {
        console.log(`ArtBoardToy: Resize not configured ${width} x ${height}`);
    }
}