# solid-with-typescript-and-nest
[목차 보기](https://github.com/jimyungkoh/solid-with-typescript-and-nest)
## 개방-폐쇄 원칙 (Open/closed principle)
- 소프트웨어 개체는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다.
- 다형성을 활용해 인터페이스(역할)를 구현한 새로운 클래스(구현체)를 만들어 새로운 기능을 구현하면 개방 폐쇄 원칙을 준수할 수 있다.
```typescript
// before
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
```
```typescript
// after
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public area(): number {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class AreaCalculator {
  private shapes: Shape[];

  constructor(shapes: Shape[]) {
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
```