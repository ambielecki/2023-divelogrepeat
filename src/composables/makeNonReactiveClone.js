export function makeNonReactiveClone(object) {
    return JSON.parse(JSON.stringify(object));
}