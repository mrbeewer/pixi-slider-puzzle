import { ProgressBar } from "@pixi/ui";
import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { app } from "../main";
import { LayoutContainer, LayoutContainerOptions } from "@pixi/layout/components";
import gsap from "gsap";

export class LoadScreen extends Container {
    private progressBar: ProgressBar;
    private loadingText: Text;
    private mainContainer: Container;

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

        // const container = new LayoutContainer({
        //     layout: {
        //         width: 300,
        //         height: 300,
        //         overflow: 'scroll',
        //         padding: 10,
        //         gap: 10,
        //         backgroundColor: 0x202020,
        //         borderColor: 0xffffff,
        //         borderRadius: 12,
        //     },
        // });
    }
}