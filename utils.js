const Utils = {
  calculateArea(type, dimensions) {
    switch (type) {
      case "triangle":
        return 0.5 * dimensions.base * dimensions.height;
      case "square":
        return dimensions.side * dimensions.side;
      case "circle":
        return Math.PI * Math.pow(dimensions.radius, 2);
      case "star":
        // Approximation: treating the star as a regular pentagon
        return (
          (Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(dimensions.side, 2)) / 4
        );
      default:
        console.error(`Shape type ${type} not recognized`);
        return 0;
    }
  },
};

export default Utils;
