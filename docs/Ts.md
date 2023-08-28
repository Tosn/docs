```bash
ts-node-dev --respawn --transpile-only app.ts
```

![TS type 层级](/Users/tosn.zhang/Desktop/2022/docs/docs/images/types.png)

never作为泛型传入会直接跳出判断

```ts
type Tmp = never extends string ? 1 : 2; // 1
type Tmp2<T> = T extends string ? 1 : 2;
type Tmp2Result = Tmp2<never>; // never
```

# Utility Types

- Awaited<Type>（released 4.5）

> This type is meant to model operations like `await` in `async` functions, or the `.then()` method on `Promise`s - specifically, the way that they recursively unwrap `Promise`s.

```ts
type Awaited<T> = T extends null | undefined
	? T : T extends object & { then(onfulfilled: infer F): any } ?
		F extends ((value: infer V, ...args: any) => any) ?
			Awaited<V> :
		never :
	T;
```

- Partial<Type>

> Constructs a type with all properties of `Type` set to optional. This utility will return a type that represents all subsets of a given type.

```ts
type Partical<T> = {
  [P in keyof T]?: T[P] | undefined
}
```

- Required<Type>

> Constructs a type consisting of all properties of `Type` set to required. The opposite of [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype).

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

- Readonly<Type>

> Constructs a type with all properties of `Type` set to `readonly`, meaning the properties of the constructed type cannot be reassigned.

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

- Record<Keys, Type>

> Constructs an object type whose property keys are `Keys` and whose property values are `Type`. This utility can be used to map the properties of a type to another type.

```ts
type Record<K extends string | number | symbol, T> = {
  [P in K]: T
}

// demo
interface CatInfo {
  age: number;
  breed: string;
}
type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
}
```

- Pick<Type, Keys>

> Constructs a type by picking the set of properties `Keys` (string literal or union of string literals) from `Type`.

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

- Omit<Type, Keys>

> Constructs a type by picking all properties from `Type` and then removing `Keys` (string literal or union of string literals).

```ts
type Omit<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[p]
}
```

- Exclude<UnionType, ExcludedMembers>

> Constructs a type by excluding from `UnionType` all union members that are assignable to `ExcludedMembers`.

```ts
type Exclude<T, U> = T extends U ? never : T
```

- Extract<Type, Union>

> Constructs a type by extracting from `Type` all union members that are assignable to `Union`.

```ts
type Extract<T, U> = T extends U ? T : never
```

- NonNullable<Type>

> Constructs a type by excluding `null` and `undefined` from `Type`.

```ts
type NonNullable<T> = T & {}
```

- Parameters<Type>

> Constructs a tuple type from the types used in the parameters of a function type `Type`.

```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// demo
declare function f1(arg: {a: number; b: string}): void;
type T = Parameters<typeof f1>;
/*
	type T = [arg: {
		a: number;		
		b: string;
	}]
*/
```



### 集合

```ts
// 并集
export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;
```

![集合类型](/Users/tosn.zhang/Desktop/2022/docs/docs/images/aggregate.png)

### class

修饰符

- public 类、子类、其他地方均可访问
- protected 类、子类可以访问
- private 类自身可以访问



类型守卫

```ts
function foo (input: string | number) {
  if (typeof input === 'string') {
    input.replace('Tosn', 'Tp')
  }
  if (typeof input === 'number') {
    input += input
  }
}

// 逻辑代码和业务代码分离 定义一个如下函数判断输入是否是string

function isString (input: unknown): boolean {
  return typeof input === 'string'
}

// 修改上面foo函数
function foo (input: string| number) {
  if (isString(input)) {
    input.replace('Tosn', 'Tp') // 报错 Property 'replace' does not exist on type 'string | number', xxxx
  }
 	...
}
// 可以发现这边isString函数判断后，里面的内容并没有推导成string类型,因为 isString 这个函数在另外一个地方，内部的判断逻辑并不在函数 foo 中。这里的类型控制流分析做不到跨函数上下文来进行类型的信息收集.这时候用is关键字来显性的提供类型信息
 
function isString (input: unknown): input is string {
  return typeof input === 'string'
}
// input is string 意思就是如果满足内部表达式 那么input的类型就是string,这里需要注意的是 类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查，也就是 实际input类型是string，这里你写input is number 也不会报错，类似于断言语句
```

**标准类型系统**

```ts
type USD = number;
type CNY = number;
const CNYCount: CNY = 200;
const USDCount: USD = 200;

function addCNY (source: CNY, input: CNY): CNY {
  return source + input
}

addCNY(CNYCount, USDCount); // 这个时候发现传入美元和人民币都可以 因为都是number类型 显然这样是不对的



// -------------------

declare class TagProtector<T extends string> {
  protected __tag__: T;
}

type Nominal<T, U extends string> = T & TagProtector<U>;

type CNY = Nominal<number, 'CNY'>;
type USD = Nominal<number, 'USD'>;
const CNYCount: CNY = 200 as CNY;
const USDCount: USD = 200 as USD;

addCNY(CNYCount, USDCount); // error, argument of type 'USD' is not assignable to parameter of type 'CNY' xx
```

