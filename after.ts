interface Driveable {
  startEngine(): void;
  drive(): void;
}

interface Flyable {
  startEngine(): void;
  fly(): void;
}

class Car implements Driveable {
  public startEngine(): void {
    console.log("Engine started for car 🚗🚗🚗");
  }
  public drive(): void {
    console.log("Car is driving 🚗");
  }
}

class Plane implements Flyable {
  public startEngine(): void {
    console.log("Engine started for plane 🛬");
  }
  public fly(): void {
    console.log("Plane is flying 🛫");
  }
}