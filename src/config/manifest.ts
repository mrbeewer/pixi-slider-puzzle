export const manifest = {
    bundles: [
        {
            name: "loading",
            assets: [
                {
                    alias: "logo",
                    src: "assets/bunny.png",
                },
            ],
        },
        {
            name: "controls",
            assets: [
                {
                    alias: "flipHorizontal",
                    src: "assets/symmetry-horizontal.svg",
                },
                {
                    alias: "flipVertical",
                    src: "assets/symmetry-vertical.svg",
                },
                {
                    alias: "rotateCW",
                    src: "assets/arrow-clockwise.svg",
                },
                {
                    alias: "rotateCCW",
                    src: "assets/arrow-counterclockwise.svg",
                },
                {
                    alias: "scaleDown",
                    src: "assets/arrows-angle-contract.svg",
                },
                {
                    alias: "scaleUp",
                    src: "assets/arrows-angle-expand.svg",
                },
            ],
        },
        {
            name: "toy",
            assets: [
                {
                    alias: "bunny",
                    src: "assets/bunny.png",
                },
            ],
        },
    ]
};