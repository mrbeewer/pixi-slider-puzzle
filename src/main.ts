import { Application, Assets } from "pixi.js";
import "@pixi/layout";
import { manifest } from "./config/manifest";
import { MainScreen } from "./screens/MainScreen";
import { LoadScreen } from "./screens/LoadScreen";

// This structure is heavily based on
// https://github.com/CyberDex/pixi-game-ui

// PixiJS app Application instance
export const app = new Application();

// Loaded Assets
export let loadedAssets = {
  nativity: undefined
};

// Expose the app to PixiJS Devtools (browser extension)
(globalThis as any).__PIXI_APP__ = app;

// Globals
let loadingScreen: LoadScreen;
let mainScreen: MainScreen;


async function init() {
  // Initialize
  await app.init({
    // resolution: Math.max(window.devicePixelRatio, 2),
    resizeTo: window,
    backgroundColor: "blue",
  });

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  // Add the canvas to the body (index.html)
  document.body.appendChild(app.canvas);

  // Tie in our resize listener
  window.addEventListener('resize', resize);

  // Run the first resize
  resize();

  // Initialize our assets
  await Assets.init({ manifest: manifest });

  // Preload loading
  await Assets.loadBundle('loading');
  // await Assets.loadBundle('toy');

  // Load and add the loading screen
  loadingScreen = new LoadScreen();
  await app.stage.addChild(loadingScreen);

  // Load our assets
  // Initialize variables
  type BundleWeights = Record<string, number>;
  type BundleProgress = Record<string, number>;
  const bundles: string[] = ['controls', 'toy'];
  const bundleWeights: BundleWeights = {
    controls: 1,
    toy: 1,
  };
  const bundleProgress: BundleProgress = {};
  const totalWeight: number = Object.values(bundleWeights).reduce((a, b) => a + b, 0);

  // Loop through the bundles, load, and update progress
  for (const bundle of bundles) {
    await Assets.loadBundle(bundle, (progress: number) => {
      bundleProgress[bundle] = progress;
      updateGlobalProgress();
    });
  }

  function updateGlobalProgress(): void {
    let weightedProgress = 0;

    for (const bundle of bundles) {
      const progress = bundleProgress[bundle] ?? 0;
      weightedProgress += progress * bundleWeights[bundle];
    }

    const normalized = weightedProgress / totalWeight;
    const percent = Math.round(normalized * 100);

    console.log(`Global Progress: ${percent}%`);
    loadingScreen.onLoad(percent);
  }

  // Swap the containers

  // Load in main screen
  mainScreen = new MainScreen();

  // Put the main screen before the loading screen (children are rendered in order)
  await app.stage.addChildAt(mainScreen, 0);

  // Hide the loading screen with a delay
  setTimeout(() => {
    loadingScreen.hide();
  }, 1000);
}

// Resizing function for the app
function resize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  app.renderer.canvas.style.width = `${windowWidth}px`;
  app.renderer.canvas.style.height = `${windowHeight}px`;
  window.scrollTo(0, 0);

  // Resize the renderer and keep stage hitArea in sync
  app.renderer.resize(windowWidth, windowHeight);
  app.stage.hitArea = app.screen;

  // Notify screens so their LayoutContainers can recalculate sizes
  if (loadingScreen) loadingScreen.resize(windowWidth, windowHeight);
  if (mainScreen) mainScreen.resize(windowWidth, windowHeight);
}

window.onload = init;
