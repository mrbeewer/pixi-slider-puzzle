import { ProgressBar } from "@pixi/ui";
import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { app } from "../main";
import { LayoutContainer, LayoutContainerOptions } from "@pixi/layout/components";
import gsap from "gsap";

export class LoadScreen extends Container {
    private progressBar: ProgressBar;
    private loadingText: Text;
    private mainContainer: Container;
    private logo: Sprite;

    constructor() {
        super();

        this.mainContainer = new LayoutContainer({
            layout: {
                width: app.screen.width,
                height: app.screen.height,
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                flexDirection: "column",
                backgroundColor: "#171b48",
                gap: 20,
            },
        });

        this.logo = this.addLogo();
        this.progressBar = this.addProgressBar();
        this.loadingText = this.addText();

    }

    private addLogo() {
        // Get the texture
        const texture = Assets.get("logo");

        // Create the sprite
        this.logo = new Sprite({
            texture: texture,
            anchor: 0.5,
            scale: 0.6,
            alpha: 1,
        });

        const logoContainer = new LayoutContainer({
            layout: {
                width: app.screen.width / 4,
                height: "intrinsic",
                maxHeight: 200,
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                flexDirection: "row",
            },
        });

        // Adjust x position to center
        this.logo.x += this.logo.width / 2;

        // Add to container
        logoContainer.addChild(this.logo);
        this.mainContainer.addChild(logoContainer);

        return this.logo;
    }

    private addProgressBar() {
        // Create the container
        const progressBarContainer = new LayoutContainer({
            layout: {
                width: "intrinsic",
                height: "intrinsic",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                flexDirection: "row",
            },
        });

        this.mainContainer.addChild(progressBarContainer);

        // Build the progress bar
        const width = app.screen.width / 4;
        const height = 35;
        const radius = 25;
        const borderColor = "#fff";
        const border = 3;
        const backgroundColor = "blue";
        const fillColor = "red";

        const bg = new Graphics()
            .roundRect(0, 0, width, height, radius)
            .fill(borderColor)
            .roundRect(
                border,
                border,
                width - border * 2,
                height - border * 2,
                radius,
            )
            .fill(backgroundColor);
        
        const fill = new Graphics()
            .roundRect(0, 0, width, height, radius)
            .fill(borderColor)
            .roundRect(
                border,
                border,
                width - border * 2,
                height - border * 2,
                radius,
            )
            .fill(fillColor);

        this.progressBar = new ProgressBar({
            bg,
            fill,
            progress: 0
        });

        progressBarContainer.addChild(this.progressBar);

        return this.progressBar;
    }

    private addText() {
        // Create our text style
        const style = new TextStyle({
            align: "center",
            fontFamily: "Arial",
            fontSize: 36,
            fontStyle: "italic",
            fontWeight: "bold",
            fill: "white",
            stroke: { color: "blue", width: 5, join: "round" },
            dropShadow: {
                color: "black",
                blur: 4,
                angle: Math.PI / 6,
                distance: 6,
            },
            wordWrap: true,
            wordWrapWidth: 440,
        });

        // Create the text element
        this.loadingText = new Text({
            text: "Slider Puzzle\n\nLoading...",
            style,
        });

        // Create the container
        const textContainer = new LayoutContainer({
            layout: {
                width: "intrinsic",
                height: "intrinsic",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                flexDirection: "row",
            },
        });

        // Add to containers
        this.mainContainer.addChild(textContainer);
        textContainer.addChild(this.loadingText);

        return this.loadingText;
    }
}