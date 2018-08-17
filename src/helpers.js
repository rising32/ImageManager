export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    let id = '';

    for (let i = 0; i < 5; i++) {
        id += s4()
    }

    return id
}