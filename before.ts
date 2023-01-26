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
