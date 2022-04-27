export function allStorage() {
    const keys = Object.keys(localStorage);

    return keys;
}

export function getMaxSize() {}

export function set(data: any) {
    try {
        localStorage.setItem("A", JSON.stringify(data));
        // localStorage.setItem("B", JSON.stringify(data));
        // localStorage.setItem("C", JSON.stringify(data));
        // localStorage.setItem("D", JSON.stringify(data));
        // localStorage.setItem("E", JSON.stringify(data));
        // localStorage.setItem("F", JSON.stringify(data));
        // localStorage.setItem("G", JSON.stringify(data));
        // localStorage.setItem("H", JSON.stringify(data));
        // localStorage.setItem("I", JSON.stringify(data));
        // localStorage.setItem("J", JSON.stringify(data));
        // localStorage.setItem("K", JSON.stringify(data));

        console.log("success"); //ALERT INFO Successful
    } catch (e) {
        if (e instanceof DOMException) {
            console.log(e, e.name);
        }
    }
}
