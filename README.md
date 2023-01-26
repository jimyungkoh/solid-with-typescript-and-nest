# solid-with-typescript-and-nest
## 의존관계 역전 원칙 (Dependency inversion principle)
- 의존관계 역전 원칙은 "추상화에 의존해야지 구체화에 의존하면 안된다"는 원칙이다.
- 즉, 구현 클래스에 의존하는 것이 아닌 인터페이스에 의존해야 한다는 얘기다.
- 이 과정에서 의존성 주입을 사용해 고수준 모듈(예: controller)이 저수준 모듈(예: 서비스)에 직접 의존하는 것을 피할 수 있다.
  - 우선, 의존성 주입은 의존관계 역전 원칙을 준수하는 '방법'이고 의존관계 역전 == 의존성 주입은 아니다.
  - Nest에서 IOC(Inversion Of Control) 컨테이너 역할인 module 클래스를 사용함으로써 의존관계 역전 원칙을 준수할 수 있다.
  - 의존성 주입을 사용하면 고수준 모듈은 저수준 모듈의 인터페이스에 의존함으로써 구현체가 뭔지도 모르고 주입받을 수 있다.
  
의존관계 역전 원칙을 준수하면

**"극단적으로 2개의 저수준 모듈이 있고 그중 하나에 의존하는 10만 개의 고수준 모듈이 있을 때, 저수준 모듈 변경시 10만 번의 코드 변경이 일어나는 것을 IOC 컨테이너에서 모듈을 갈아 끼움으로써 한번의 코드 변경으로 해결할 수 있다"**

### 예시
Nest에서 의존관계 역전 원칙을 어떻게 준수할 수 있을까?

음... 적절한 예시가 떠오르지 않지만,

app.service가 getHello() 메서를 가진 인터페이스이고 app.controller가 getHello를 이용하는 고수준 모듈이라고 생각해보자.

우리는 잘 배운('Well-Educated') 개발자다. controller가 추상화(인터페이스)인 app.service에만 의존하면서 IOC 컨테이너인 app.module에서 그 구현체를 주입받게 하고 싶다.

예를 들면, getHello()가 환영 인사를 한국어로 건낼 수도, 영어로 건낼 수도, 일본어로 건낼 수도 있게 말이다!

단계별 코드를 보면서 의존관계 역전 원칙을 준수한 코드를 완성해보자.

1. 인터페이스 app.service.ts와 구현체들(app.ko.service.ts, app.en.service.ts, app.jp.service.ts)를 만든다.
```typescript
// getHello()라는 인사 메서드를 가진 인터페이스 AppService
export interface AppService {
  getHello();
}
```
```typescript
// 인터페이스인 AppService를 구현해 한국말로 인사하는 getHello()를 가진 클래스 AppKoService 
import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppKoService implements AppService {
  getHello(): string {
    return '안녕하세요!';
  }
}
```
```typescript
// 인터페이스인 AppService를 구현해 영어로 인사하는 getHello()를 가진 클래스 AppEnService 
import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppEnService implements AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```
```typescript
// 인터페이스인 AppService를 구현해 일본어로 인사하는 getHello()를 가진 클래스 AppJpService 
import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppJpService implements AppService {
  getHello(): string {
    return 'イラッシャイマセ!';
  }
}
```

2. app.module.ts(Inversion Of Control Container) 클래스 작성

Nest의 공식 문서 [클래스 프로바이더와 클래스 사용](https://docs.nestjs.com/fundamentals/custom-providers#class-providers-useclass)에 따르면, provide에 토큰 값(AppService)을 지정 해주면 해당 토큰을 주입받는 고수준 모듈에서 useClass에 명시된 객체를 주입받는다고 설명되어 있다.

provide의 값으로 들어갈 토큰 value는 고수준 모듈이 의존하고 있는 추상화(AppService)에 일치해야 한다.

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppKoService } from './app.ko.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      // provide: "제공할 추상화 인터페이스명"
      provide: 'AppService',
      // useClass: "제공할 추상화 인터페이스의 구현체"
      useClass: AppKoService,
    },
  ],
})
export class AppModule {}

```

이제 고수준 모듈에서 토큰 값을 사용해보자!


3. app.controller.ts(고수준 모듈) 작성

@Inject 데코레이터에 주입을 원하는 토큰 value를 넣어 AppService 타입인 변수 appService가 모듈에 명시된 useClass인 구현체를 주입받을 수 있게 만들면 끝이다.

이제 AppController는 구현체가 뭔지 모르는 상태에서도 의존성을 주입받아 다양한 언어의 인사를 '컨트롤러 내부 코드 수정 없이' 수행할 수 있게 되었다!

```typescript
import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(@Inject("AppService") private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

**한국어 인사 구현체 주입**

```typescript
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'AppService',
      useClass: AppKoService,
    },
  ],
})
export class AppModule {}
```

![한국어 인사 구현체 주입](https://user-images.githubusercontent.com/30682847/214906242-70c2f95a-227b-4a27-b171-c26ff6598226.png)

**영어 인사 구현체 주입**

```typescript
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'AppService',
      useClass: AppEnService,
    },
  ],
})
export class AppModule {}
```

![영어 인사 구현체 주입](https://user-images.githubusercontent.com/30682847/214905971-41b22de7-3025-41fb-972e-eb8205c13c8f.png)

**일본어 인사 구현체 주입**

```typescript
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'AppService',
      useClass: AppJpService,
    },
  ],
})
export class AppModule {}
```

![일본어 인사 구현체 주입](https://user-images.githubusercontent.com/30682847/214906357-a769ff89-59df-4c28-982c-f6727c65dcc2.png)
