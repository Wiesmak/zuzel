export function KeyboardEvent(event: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value
        descriptor.value = function (...args: any[]) {
            const result: {event: string, callback: Function}[] = originalMethod.apply(this, args)
            for (let key of result) {
                Keyboard.register(event, key.event, key.callback)
            }
        }
    }
}

export default class Keyboard {
    static register(event: string, key: string, callback: Function) {
        document.addEventListener(event, (e: KeyboardEvent) => {
            if (e.key === key) {
                callback()
            }
        })
    }
}
