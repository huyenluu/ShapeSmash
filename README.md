# ShapeSmash - PIXI.js Game

ShapeSmash is a fun and interactive web game built with [PIXI.js](https://pixijs.io/), a powerful 2D rendering engine for the web. The game involves dynamically generated shapes that fall under gravity, and it allows users to interact with them by clicking. The game also provides a UI to manipulate the gravity and the rate of shape generation.

[Live demo](https://shape-smash-three.vercel.app/)

## Features

- **Dynamic Shape Generation**: Shapes are generated dynamically and fall due to gravity.
- **Interactivity**: Click on shapes to interact with them.
- **UI Controls**: Control the gravity and shape generation rate through UI buttons.
- **Responsive**: Adapts to various screen sizes, ensuring a fun experience on all devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>=14.x.x)
- [npm](https://www.npmjs.com/) (>=6.x.x)

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/shapesmash-pixi-js.git
   cd shapesmash-pixi-js
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Start the Development Server**

   ```sh
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload if you make edits.

### Building for Production

To build the app for production, run the following command:

```sh
npm run build
```

The build will be available in the `dist` folder.

### Previewing the Production Build

To preview the production build, run:

```sh
npm run preview
```

## Game Mechanics

- **Shapes**: Various shapes (circle, square, triangle, star) are generated and fall from the top of the canvas.
- **Gravity**: Shapes are influenced by gravity, which can be adjusted through the UI.
- **Shape Generation**: The rate at which shapes are generated can also be controlled via the UI.

## Code Structure

- **ShapeFactory**: A utility class to create different shapes with random colors.
- **FallingShape**: Represents a shape that can fall, and it's clickable.
- **ShapeManager**: Manages the creation, removal, and updating of shapes in the application.

## Technologies Used

- [PIXI.js](https://pixijs.io/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
