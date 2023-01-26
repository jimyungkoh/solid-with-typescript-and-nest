interface Movable {
  startEngine(): void;
  drive(): void;
  fly(): void;
}

class Car implements Movable {
  public startEngine(): void {
    console.log("Engine started for car 🚗🚗🚗");
  }
  public drive(): void {
    console.log("Car is driving 🚗");
  }

  fly(): void {
  }
}

class Plane implements Movable {
  public startEngine(): void {
    console.log("Engine started for plane 🛬");
  }
  public fly(): void {
    console.log("Plane is flying 🛫");
  }

  drive(): void {
  }
}