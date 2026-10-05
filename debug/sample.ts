// Visual color coding test for Typescript

export class Test {
  private readonly _name: string = "test"

  constructor(private readonly _age: number) {
    // TODO
  }

  async run(timeout: number = 1_000): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, timeout))
    console.log("done")
  }

  get age(): number {
    return this._age
  }

  get name(): string {
    return this._name
  }
}

function f(): Record<string, unknown> {
  return {
    a: 1.1,
    b: "abc",
    c: true,
    d: null,
    e: undefined,
    f: () => {},
    g: new Test(1),
    h: [1, 2, 3],
    i: { a: 1, b: 2, c: 3 },
  }
}
void f
