# @oof2win2/promisify-event
A npm package to help with event promisification and typed events.

Usage of `promisifyEvent`:
```ts
import EventEmitter from "events"
import {promisifyEvent} from "@oof2win2/promisify-event"

class Example extends EventEmitter {
	emitFoo(x: number) {
		this.emit("foo", x)
	}
}

const run = async () => {
	const example = new Example()
	setTimeout(() => example.emitFoo(1), 100)
	// data will be [1], as 1 is the first argument of the event
	const data = await promisifyEvent(example, "foo")
}
run()
```

Usage of `typedEventEmitter`:
```ts
type EventTypes = {
	foo: (someNum: number) => void
}
class Example extends TypedEventEmitter<EventTypes> {
	emitFoo(someNum: number) {
		this.emit("foo", someNum)
	}
}
const run = async () => {
	const example = new Example()
	example.on("foo", (someNum) => console.log(someNum)) // someNum will be type of number, as it is declared in the types
	setTimeout(() => example.emitFoo(1), 100)
	// data will be [1], as 1 is the first argument of the event
	const data = await promisifyEvent(example, "foo")
}
run()
```