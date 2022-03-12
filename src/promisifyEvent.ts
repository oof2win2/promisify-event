import EventEmitter from "events"
import TypedEventEmitter from "./typedEventEmitter"

function promisifyEvent<
	T extends TypedEventEmitter<any>,
	E extends keyof T["_foo"]
>(eventEmitter: T, eventName: E): Promise<Parameters<T["_foo"][E]>>
function promisifyEvent<T extends EventEmitter, E extends string | symbol>(
	eventEmitter: T,
	eventName: E
): Promise<any[]>
function promisifyEvent(eventEmitter: any, eventName: any) {
	return new Promise<any>((resolve) => {
		eventEmitter.once(eventName, (...args: any[]) => {
			resolve(args)
		})
	})
}

export default promisifyEvent
