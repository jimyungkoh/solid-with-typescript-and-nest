# solid-with-typescript-and-nest
**[목차 보기](https://github.com/jimyungkoh/solid-with-typescript-and-nest)**
## 단일 책임 원칙 (Single Responsibility Principle)
* 한 클래스는 하나의 책임만 가져야 한다.
```typescript
// before
class User {
  name: string;
  password: string;
  email: string;

  grade: string;

  constructor(name: string, password: string, email: string) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.grade = "BASIC";
  }

  introduce(): string {
    return `hello! my name is ${name}!`
  }

  setUserPassword(password: string): void {
    this.password = password;
  }

  setGrade(grade: string) {
    this.grade = grade;
  }

  // ...
}
```
```typescript
//after
enum Grade {
  BASIC, VIP
}

class User {
  name: string;
  password: string;
  email: string;

  grade: Grade;

  constructor(name: string, password: string, email: string) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.grade = Grade.BASIC;
  }

  // ...
}

class UserService {

  introduce(user: User): string {
    return `hello! my name is ${user.name}!`
  }

  setUserPassword(user: User, password: string): void {
    user.password = password;
  }

  setGrade(user: User, grade: Grade) {
    user.grade = grade;
  }

  //...
}
```