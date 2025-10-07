import { LayoutContainer } from "@pixi/layout/components";
import { FancyButton } from "@pixi/ui";
import { Assets, Graphics, Point, Sprite, Text, TextStyle } from "pixi.js";

interface ButtonData {
    label: string;
    icon: string;
}

export class Controls extends LayoutContainer {
    // Attributes
    public btnWidth = 220;
    public btnHeight = 40;
    public btnRadius = 5;
    public btnFill = 'white';

    // Other
    public toy: Sprite | undefined;
    private rotationIncrement: number = 10;
    private scaleIncrement: number = 0.1
    private scaleMinimum: number = 0.3;
    private animations;


    constructor(toy: Sprite) {
        super();

        this.toy = toy;

        this.layout = {
            position: 'absolute',
            top: 0,
            width: 'auto',
            maxWidth: '100%',
            height: 'auto',
            padding: 0,
            marginTop: 5,
            gap: 0,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'center',
            borderWidth: 0,
            borderColor: `#fff`,
            backgroundColor: 'black'
        }

        this.alpha = 1;
        this.label = "controls";
        this.eventMode = "passive";
        this.zIndex = 1000;

        // Default button animations
        this.animations = {
            hover: {
                props: {
                    scale: {
                        x: 1.05,
                        y: 1.05,
                    },
                },
                duration: 100,
            },
            pressed: {
                props: {
                    scale: {
                        x: 0.9,
                        y: 0.9,
                    }
                },
                duration: 100,
            }
        }

        this.prepare();
    }

    public prepare() {

        const extraPadding: number = 45;

        // Section
        let buttonData = [
            { label: 'Flip horizontally', icon: 'flipHorizontal' },
            { label: 'Flip vertically', icon: 'flipVertical' },
        ];

        this.btnWidth = this.maxTextWidth(buttonData) + extraPadding;

        let layoutSection = this.createSectionContainer();
        this.addChild(layoutSection);
        layoutSection.addChild(this.createButtonFlipH(buttonData[0].label, buttonData[0].icon));
        layoutSection.addChild(this.createButtonFlipV(buttonData[1].label, buttonData[1].icon));

        // Section
        buttonData = [
            { label: 'Rotate CW', icon: 'rotateCW' },
            { label: 'Rotate CCW', icon: 'rotateCCW' },
        ];
        this.btnWidth = this.maxTextWidth(buttonData) + extraPadding;

        layoutSection = this.createSectionContainer();
        this.addChild(layoutSection);
        layoutSection.addChild(this.createButtonRotateCW(buttonData[0].label, buttonData[0].icon));
        layoutSection.addChild(this.createButtonRotateCCW(buttonData[1].label, buttonData[1].icon));

        // Section
        buttonData = [
            { label: 'Grow', icon: 'scaleUp' },
            { label: 'Shrink  ', icon: 'scaleDown' },
        ];
        this.btnWidth = this.maxTextWidth(buttonData) + extraPadding;

        layoutSection = this.createSectionContainer();
        this.addChild(layoutSection);
        layoutSection.addChild(this.createButtonScaleUp(buttonData[0].label, buttonData[0].icon));
        layoutSection.addChild(this.createButtonScaleDown(buttonData[1].label, buttonData[1].icon));

    }

    /**
     * Create a Fancy Button with a LayoutContainer wrapper
     * 
     * @param btnText Visible button text
     * @param btnIcon Displayed button icon (from Assets)
     * @returns {Container, FancyButton} An object containing both the container and the button
     */
    private createButton(btnText: string, btnIcon: string) {
        // Create the container
        const container = new LayoutContainer({
            layout: {
                width: this.btnWidth,
                height: this.btnHeight,
                justifyContent: 'flex-end',
                padding: 0
            }
        });

        // Create the text object
        const style = this.getTextStyle();
        const text = new Text({
            text: btnText,
            style
        });

        // Calculate the text offset
        const textOffset = this.btnWidth / 2 - text.width / 2 - 10;

        // Calculate the icon offset
        const iconOffset = new Point((this.btnWidth / 2 - 25), 0);

        // Create tbe button views
        const defaultview = new Graphics()
            .roundRect(0, 0, this.btnWidth, this.btnHeight, this.btnRadius)
            .fill(this.btnFill);

        // Create the button
        const button = new FancyButton({
            defaultView: defaultview,
            text: text,
            textOffset: new Point(-textOffset, 0),
            padding: 10,
            anchor: 0.5,
            animations: this.animations,
            icon: Assets.get(btnIcon),
            iconOffset: iconOffset,
        });

        // Position
        button.x += button.width / 2;
        button.y += button.height / 2;

        // Add to container
        container.addChild(button);

        return { container: container, button: button };
    }

    private createButtonFlipH(label: string, icon: string) {
        // Create button
        const { container, button } = this.createButton(label, icon);

        // Configure click
        button.onPress.connect(() => {
            console.log(`${button.text} pressed!`);
            if (this.toy) this.toy.scale.y = -this.toy.scale.y;
        });

        // Return container
        return container;
    }

    private createButtonFlipV(label: string, icon: string) {
        // Create button
        const { container, button } = this.createButton(label, icon);

        // Configure click
        button.onPress.connect(() => {
            console.log(`${button.text} pressed!`);
            if (this.toy) this.toy.scale.x = -this.toy.scale.x;
        });

        // Return container
        return container;
    }

    private createButtonRotateCCW(label: string, icon: string) {
        // Create button
        const { container, button } = this.createButton(label, icon);

        // Configure click
        button.onPress.connect(() => {
            console.log(`${button.text} pressed!`);
            if (this.toy) this.toy.angle -= this.rotationIncrement;
        });

        // Return container
        return container;
    }

    private createButtonRotateCW(label: string, icon: string) {
        // Create button
        const { container, button } = this.createButton(label, icon);

        // Configure click
        button.onPress.connect(() => {
            console.log(`${button.text} pressed!`);
            if (this.toy) this.toy.angle += this.rotationIncrement;
        });

        // Return container
        return container;
    }

    private createButtonScaleDown(label: string, icon: string) {
        // Create button
        const { container, button } = this.createButton(label, icon);

        // Configure click
        button.onPress.connect(() => {
            console.log(`${button.text} pressed!`);
            if (this.toy) {
                // Deal with negative (flipped) scale
                const scaleXNeg = (this.toy.scale.x < 0) ? -1 : 1;
                const scaleYNeg = (this.toy.scale.y < 0) ? -1 : 1;

                // Apply the increment
                this.toy.scale.x = scaleXNeg * (Math.abs(this.toy.scale.x) - this.scaleIncrement);
                this.toy.scale.y = scaleYNeg * (Math.abs(this.toy.scale.y) - this.scaleIncrement);

                // Don't let it be 0
                if (Math.abs(this.toy.scale.x) < this.scaleMinimum) this.toy.scale.x = scaleXNeg * this.scaleMinimum;
                if (Math.abs(this.toy.scale.y) < this.scaleMinimum) this.toy.scale.y = scaleYNeg * this.scaleMinimum;
            }
        });

        // Return container
        return container;
    }

    private createButtonScaleUp(label: string, icon: string) {
        // Create button
        const { container, button } = this.createButton(label, icon);

        // Configure click
        button.onPress.connect(() => {
            console.log(`${button.text} pressed!`);
            if (this.toy) {
                // Deal with negative (flipped) scale
                const scaleXNeg = (this.toy.scale.x < 0) ? -1 : 1;
                const scaleYNeg = (this.toy.scale.y < 0) ? -1 : 1;

                // Apply the increment
                this.toy.scale.x = scaleXNeg * (Math.abs(this.toy.scale.x) + this.scaleIncrement);
                this.toy.scale.y = scaleYNeg * (Math.abs(this.toy.scale.y) + this.scaleIncrement);

                // Don't let it be 0
                if (Math.abs(this.toy.scale.x) < this.scaleMinimum) this.toy.scale.x = scaleXNeg * this.scaleMinimum;
                if (Math.abs(this.toy.scale.y) < this.scaleMinimum) this.toy.scale.y = scaleYNeg * this.scaleMinimum;
            }
        });

        // Return container
        return container;
    }

    private createSectionContainer() {
        return new LayoutContainer({
            layout: {
                width: 'auto',
                height: 'auto',
                padding: 5,
                gap: 5,
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignContent: 'center',
                borderWidth: 0,
                borderColor: `#fff`,
                // backgroundColor: "grey"
            }
        });
    }

    private getTextStyle() {
        return new TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0x000000,
            align: 'center'
        });
    }

    private maxTextWidth(buttonData: ButtonData[]) {
        const style = this.getTextStyle();
        return Math.max(...buttonData.map(data => {
            const styledText = new Text({ text: data.label, style });
            return styledText.width;
        }));
    };

    public resize(width: number, height: number) {
        // Update the layout container size so children using percentages/intrinsic sizes recalculate
        this.layout = {
            width: width,
            // height: height,
        };
    }
}