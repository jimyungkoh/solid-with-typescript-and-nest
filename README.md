# solid-with-typescript-and-nest
## 인터페이스 분리 원칙 (Interface segregation principle)
- 특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다.
- 인터페이스를 분리하면 인터페이스의 역할이 분명해지고 대체 가능성이 높아진다.
```typescript
// before
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
```

```typescript
// after
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
```