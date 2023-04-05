import { Bench } from "../packages/bench/src";

const bench = new Bench();

bench
  .add("for loop", () => {
    let sum = 0;
    for (let i = 0; i < 100; i++) {
      sum += i;
    }
  })
  .add("while loop", () => {
    let sum = 0;
    let i = 0;
    while (i < 100) {
      sum += i;
      i++;
    }
  })
  .add("reduce", () => {
    const sum = Array.from({ length: 100 }, (_, i) => i).reduce(
      (a, b) => a + b,
      0
    );
  })
  .add("sort", () => {
    const sorted = Array.from({ length: 100 }, (_, i) => i).sort(
      (a, b) => a - b
    );
  });

bench.print();
