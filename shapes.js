import * as PIXI from "pixi.js";
import "@pixi/graphics-extras";
import Utils from "./utils";

const COLORS = [
  0xffc1a1, // Pastel Red
  0xffccb1, // Pastel Orange
  0xffffcc, // Pastel Yellow
  0xccffcc, // Pastel Green
  0xccffff, // Pastel Blue
  0xccb5ff, // Pastel Purple
  0xffccff, // Pastel Pink
];
const SHAPE_TYPE = ["triangle", "square", "circle", "star"];

// create a shape with a random colors with a dinamic type and calculates its area
// shape type can be any values from SHAPE_TYPE array
class ShapeFactory {
  static createShape(type) {
    const shape = new PIXI.Graphics();
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    shape.beginFill(randomColor);
    let area;

    switch (type) {
      case "triangle":
        shape.drawPolygon([0, 0, 60, 0, 30, 45]);
        area = Utils.calculateArea("triangle", { base: 60, height: 45 });
        break;
      case "square":
        shape.drawRect(0, 0, 50, 50);
        area = Utils.calculateArea("square", { side: 50 });
        break;
      case "circle":
        shape.drawCircle(0, 0, 30);
        area = Utils.calculateArea("circle", { radius: 30 });
        break;
      case "star":
        shape.drawStar(0, 0, 5, 35, 0);
        area = Utils.calculateArea("star", { side: 35 }); // Approximation
        break;
      default:
        console.error(`Shape type ${type} not recognized`);
    }

    shape.endFill();

    return {
      shape,
      area,
    };
  }
}

// managing individual shape that can move along the y-axis
class FallingShape extends PIXI.Graphics {
  constructor(x, y, type) {
    super();
    this.x = x;
    this.y = y;
    this.vx = 0; // velocity in x
    this.vy = 0; // velocity in y

    const shapeObj = ShapeFactory.createShape(type);
    const shape = shapeObj.shape;
    this.area = shapeObj.area;
    this.addChild(shape);

    // Make the shape interactive and clickable
    this.eventMode = "static";
    this.cursor = "hover";
  }

  update(delta) {
    this.y += this.vy * delta;
    this.x += this.vx * delta;
  }
  getArea() {
    return this.area;
  }
}

// manages the creation, removal, and updating of all shapes in the PIXI application
class ShapeManager {
  constructor(app) {
    this.app = app;
    this.shapes = [];
    this.lastSpawnTime = 0;
    this.maxShapeWidth = 60;
    this.maxShapeHeight = 50;
    this.gravity = 1;
    this.shapeSpawnInterval = 1000;
    this.shapeClicked = false;
    this.shapesPerSecond = 1;
    this.setShapeSpawnInterval();
  }

  setGravity(value) {
    this.gravity = value;
    this.shapes.forEach((shape) => {
      shape.vy = this.gravity;
    });
  }

  setShapeSpawnInterval() {
    this.shapeSpawnInterval = 1000 / this.shapesPerSecond; // in ms
  }

  createAndManageShape(x, y) {
    if (this.shapeClicked) {
      return;
    }
    const randomShapeType =
      SHAPE_TYPE[Math.floor(Math.random() * SHAPE_TYPE.length)];
    const shape = new FallingShape(x, y, randomShapeType);
    shape.vy = this.gravity;
    this.app.stage.addChild(shape);
    this.shapes.push(shape);

    shape.on("pointerdown", (event) => {
      this.removeShape(shape);
      this.shapeClicked = true;
      event.stopPropagation();
    });
  }

  spawnShape(x, y) {
    if (x !== undefined && y !== undefined) {
      this.createAndManageShape(x, y);
      this.shapeClicked = false;
    } else if (Date.now() - this.lastSpawnTime > this.shapeSpawnInterval) {
      let randomX = Math.random() * this.app.screen.width;
      if (randomX < this.maxShapeWidth) {
        randomX = randomX + this.maxShapeWidth;
      } else if (randomX > this.app.screen.width - this.maxShapeWidth) {
        randomX = this.app.screen.width - this.maxShapeWidth * 2;
      }
      this.createAndManageShape(randomX, -this.maxShapeHeight);
      this.lastSpawnTime = Date.now();
    }
  }
  removeShape(shape) {
    this.app.stage.removeChild(shape);
    shape.destroy();
    this.shapes = this.shapes.filter((s) => s !== shape);
  }

  updateShapes(delta) {
    for (const shape of this.shapes) {
      shape.update(delta);
      if (shape.y > this.app.screen.height) {
        this.app.stage.removeChild(shape);
        shape.destroy();
        this.shapes = this.shapes.filter((s) => s !== shape);
      }
    }
  }
  shapesCount() {
    return this.shapes.length;
  }
  getTotalArea() {
    const shapes = this.shapes;
    const area = shapes.reduce((totalArea, currentShape) => {
      return totalArea + currentShape.getArea();
    }, 0);
    return area;
  }

  increaseShapesPerSecond() {
    this.shapesPerSecond++;
    this.setShapeSpawnInterval();
    const errorShapesElement = document.querySelector("#error-shapes");
    if (
      errorShapesElement &&
      !errorShapesElement.classList.contains("hidden")
    ) {
      errorShapesElement.classList.add("hidden");
    }
  }

  decreaseShapesPerSecond() {
    if (this.shapesPerSecond > 0) {
      // Prevent it from going below 1
      this.shapesPerSecond--;
      this.setShapeSpawnInterval();
    } else {
      document.querySelector("#error-shapes").classList.remove("hidden");
    }
  }

  increaseGravity() {
    this.setGravity(this.gravity + 0.1);
    const errorShapesElement = document.querySelector("#error-gravity");
    if (
      errorShapesElement &&
      !errorShapesElement.classList.contains("hidden")
    ) {
      errorShapesElement.classList.add("hidden");
    }
  }

  decreaseGravity() {
    if (this.gravity > 0.1) {
      this.setGravity(this.gravity - 0.1);
    } else {
      document.querySelector("#error-gravity").classList.remove("hidden");
    }
  }

}

export { ShapeFactory, FallingShape, ShapeManager };
