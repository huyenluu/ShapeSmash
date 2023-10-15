import { config } from "./config";
class UIManager {
  constructor() {
    this.shapesPerSecondText = document.getElementById("shapesPerSecond");
    this.gravityValueText = document.getElementById("gravityValue");
    this.updateGravityValue(config.initialGravity);
    this.updateShapesPerSecond(config.initialShapesPerSecond);
  }

  updateShapesPerSecond(value) {
    this.shapesPerSecondText.innerText = value;
  }

  updateGravityValue(value) {
    this.gravityValueText.innerText = value.toFixed(1); // Display with one decimal place
  }

  updateUI(shapeCount, totalArea) {
    document.getElementById(
      "shapeCount"
    ).innerText = `Shape Count: ${shapeCount}`;
    document.getElementById(
      "shapesArea"
    ).innerText = `Total Area: ${totalArea}px²`;
  }
}

export default UIManager;
