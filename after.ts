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