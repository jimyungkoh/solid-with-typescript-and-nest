# solid-with-typescript-and-nest
## 리스코프 치환 원칙 (Liskov substitution principle)
- 프로그램 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.
- 다형성에서 하위 클래스는 인터페이스 규약을 다 지켜야 한다.
```typescript
// before
class Animal {
  public move(): void {
    console.log("Animal can move");
  }
}

class Cat extends Animal {
  public move(): void {
    console.log("newnewnewnew 🐈");
  }
}

class Fish extends Animal {
  public move(): void {
    console.log("꿈틀꿈틀 🐟");
  }
}
```
```typescript
// after
class Animal {
  public move(): void {
    console.log("Animal can move");
  }
}

class Cat extends Animal {
  public move(): void {
    console.log("Cats can walk and run 🐈");
  }
}

class Fish extends Animal {
  public move(): void {
    console.log("Fish can swim 🐟");
  }
}
```