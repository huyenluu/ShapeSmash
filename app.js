import * as PIXI from "pixi.js";
import { ShapeManager } from "./shapes.js";
import UIManager from "./UIManager.js";
import "./style.css";

class App {
  constructor() {
    this.app = new PIXI.Application({
      width: 800,
      height: 480,
      backgroundColor: 0x2c3e50,
      view: document.createElement("canvas"),
    });
    document.getElementById("canvas").appendChild(this.app.view);
    this.shapeManager = new ShapeManager(this.app);
    this.uiManager = new UIManager();

    this.app.ticker.add(this.update.bind(this));
    this.app.view.addEventListener("click", this.onClick.bind(this));
    this.setupMask();

    // Add custom cursor styles
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

  update(delta) {
    this.shapeManager.spawnShape();
    this.shapeManager.updateShapes(delta);

    const shapeCount = this.shapeManager.shapesCount();
    const totalArea = Math.floor(this.shapeManager.getTotalArea());

    this.uiManager.updateUI(shapeCount, totalArea);
  }
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
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});

export default App;
