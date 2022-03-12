import { TypedEventEmitter, promisifyEvent } from "../src";

type EventTypes = {
  foo: (someNum: number) => void;
};
class TypedEmitter extends TypedEventEmitter<EventTypes> {
  emitFoo(someNum: number) {
    this.emit("foo", someNum);
  }
}

describe("promisifyEvent", () => {
  it("Should wait for an event to be emitted", async () => {
    const x = new TypedEmitter();
    const testNumber = Math.random() * 10;
    setTimeout(() => x.emitFoo(testNumber), 100);
    const [num] = await promisifyEvent(x, "foo");
    expect(num).toEqual(testNumber);
  });
});
