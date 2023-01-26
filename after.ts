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
