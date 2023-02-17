export function Turn(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
        const result: Object = originalMethod.apply(this, args)
        let arr: {event: string, callback: Function}[] = []
        for (let key in result) {
            let callback: Function = null
            let event: string = result[key]
            if (key === 'left') {
                callback = () => {
                    const direction = -1
                    this.angle += direction / 20
                }
            } else if (key === 'right') {
                callback = () => {
                    const direction = 1
                    this.angle += direction / 20
                }
            }
            arr.push({event: event, callback: callback})
        }
        return arr || []
    }
    return descriptor
}
