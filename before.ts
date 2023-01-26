class Rectangle {
  private width: number;
  private height: number;
  public shape: string = "rectangle";

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public area(): number {
    return this.width * this.height;
  }
}

class Circle {
  private radius: number;
  public shape: string = "circle";

  constructor(radius: number) {
    this.radius = radius;
  }

  public area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class AreaCalculator {
  private shapes: Circle [] | Rectangle[];

  constructor(shapes: Circle[] | Rectangle[]) {
    this.shapes = shapes;
  }

  public sum(): number {
    let area = 0;

    for (const shape of this.shapes) {
      area += shape.area();
    }

    return area;
  }
}
