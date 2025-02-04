import { Bench } from "@funish/bench";

// Example 1: Basic benchmarking
console.log("\nExample 1: Basic benchmarking");
const bench1 = new Bench({ times: 1000, unit: "ms" });

// Test array operations
bench1
  .add("Array.push", () => {
    const arr: number[] = [];
    for (let i = 0; i < 1000; i++) arr.push(i);
  })
  .add("Array spread", () => {
    let arr: number[] = [];
    for (let i = 0; i < 1000; i++) arr = [...arr, i];
  });

bench1.print();

// Example 2: String operations benchmark
console.log("\nExample 2: String operations");
const bench2 = new Bench({ times: 10000, unit: "µs" });

const str = "Hello, world! ".repeat(1000);
bench2
  .add("String concatenation", () => {
    let result = "";
    for (let i = 0; i < 100; i++) {
      result += str[i];
    }
  })
  .add("Array join", () => {
    const arr: string[] = [];
    for (let i = 0; i < 100; i++) {
      arr.push(str[i]);
    }
    arr.join("");
  });

bench2.print();

// Example 3: Async operations
console.log("\nExample 3: Async operations");
const bench3 = new Bench({ times: 100, unit: "ms" });

bench3
  .add("Promise.resolve", () => {
    return Promise.resolve("test");
  })
  .add("new Promise", () => {
    return new Promise((resolve) => resolve("test"));
  });

bench3.print();

// Example 4: Object operations
console.log("\nExample 4: Object operations");
const bench4 = new Bench({ times: 10000, unit: "ns" });

const obj = { a: 1, b: 2, c: 3 };
bench4
  .add("Object.keys", () => {
    Object.keys(obj);
  })
  .add("Object.entries", () => {
    Object.entries(obj);
  })
  .add("Object spread", () => {
    const newObj = { ...obj };
  });

bench4.print();
