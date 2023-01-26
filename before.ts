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