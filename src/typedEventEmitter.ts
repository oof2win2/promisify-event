import EventEmitter from "events";

export type TypedEventEmitterTypes = Record<
  string | symbol,
  (...args: any[]) => void
>;

declare interface TypedEventEmitter<T extends TypedEventEmitterTypes> {
  _foo: T;
  addListener<E extends keyof T>(event: E, listener: T[E]): this;
  emit<E extends keyof T>(event: E, ...args: Parameters<T[E]>): boolean;
  listenerCount<E extends keyof T>(event: E): number;
  listeners<E extends keyof T>(event: E): Function[];
  on<E extends keyof T>(event: E, listener: T[E]): this;
  once<E extends keyof T>(event: E, listener: T[E]): this;
  prependListener<E extends keyof T>(event: E, listener: T[E]): this;
  prependOnceListener<E extends keyof T>(event: E, listener: T[E]): this;
  removeAllListeners(event?: keyof T): this;
  removeListener<E extends keyof T>(event: E, listener: T[E]): this;
  rawListeners<E extends keyof T>(event: E): Function[];
}

class TypedEventEmitter<T extends TypedEventEmitterTypes> extends EventEmitter {
  foo!: T;
}
export default TypedEventEmitter;
