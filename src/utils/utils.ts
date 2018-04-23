export function wrap(min: number, max: number, x: number) {
    return (((x - min) % (max - min)) + (max - min)) % (max - min) + min;
}