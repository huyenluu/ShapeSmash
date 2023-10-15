import * as PIXI from "pixi.js";
import { ShapeManager } from "./shapes.js";
import UIManager from "./UIManager.js";
import "./style.css";

class App {
  constructor() {

    const originalWidth = 800; 
    const originalHeight = 480;
    this.app = new PIXI.Application({
      width: originalWidth,
      height: originalHeight,
      backgroundColor: 0x2c3e50,
      view: document.createElement("canvas"),
      resizeTo: window
    });

    document.getElementById("canvas").appendChild(this.app.view);

    // handle window resize and ajust canvas size for smaller screens
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));

    this.shapeManager = new ShapeManager(this.app);
    this.uiManager = new UIManager();

    // start canvas animation
    this.app.ticker.add(this.update.bind(this));
    this.app.view.addEventListener("click", this.onClick.bind(this));
    this.setupMask();

    this.app.renderer.events.cursorStyles.default = "crosshair";
    this.app.renderer.events.cursorStyles.hover = "pointer";

    this.uiManager = new UIManager();

    document.getElementById("increaseShapes").addEventListener("click", () => {
      this.shapeManager.increaseShapesPerSecond();
      this.uiManager.updateShapesPerSecond(this.shapeManager.shapesPerSecond);
    });

    document.getElementById("decreaseShapes").addEventListener("click", () => {
      this.shapeManager.decreaseShapesPerSecond();
      this.uiManager.updateShapesPerSecond(this.shapeManager.shapesPerSecond);
    });

    document.getElementById("increaseGravity").addEventListener("click", () => {
      this.shapeManager.increaseGravity();
      this.uiManager.updateGravityValue(this.shapeManager.gravity);
    });

    document.getElementById("decreaseGravity").addEventListener("click", () => {
      this.shapeManager.decreaseGravity();
      this.uiManager.updateGravityValue(this.shapeManager.gravity);
    });
  }

  // updates the state and UI on each frame of an animation
  // delta: amount of time that has passed since the last frame was rendered
  update(delta) {
    this.shapeManager.spawnShape();
    this.shapeManager.updateShapes(delta);

    const shapeCount = this.shapeManager.shapesCount();
    const totalArea = Math.floor(this.shapeManager.getTotalArea());

    this.uiManager.updateUI(shapeCount, totalArea);
  }

  // created a new shape when user clicked on the canvas view
  // also take in consideration the shape position in relative to the viewport
  onClick(event) {
    const rect = this.app.view.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.shapeManager.spawnShape(x, y);
  }

  setupMask() {
    const mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    mask.endFill();
    this.app.stage.mask = mask;
  }

  resize() {
    const margin = this.isSmallScreen() ? 20 : 0; // 20px margin for mobile, 0px for others
    const newWidth = window.innerWidth - 2 * margin;
    const newHeight = window.innerHeight - 2 * margin;
    this.app.renderer.resize(newWidth, newHeight)
  }

  isSmallScreen() {
    return window.innerWidth <= 840;
}

}

// initialize pixi application 
document.addEventListener("DOMContentLoaded", () => {
  new App();
});


export default App;
