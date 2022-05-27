interface OptionsParam {
    handleError?: (error: any) => void;
    type?: "json" | "text" | "blob";
    isEncodeURI?: boolean;
    mode?: string;
}

interface DataParam {
    [key: string]: number | string;
}

const isObject = (value: any) => {
    const type = typeof value;
    return value != null && !Array.isArray(value) && type === "object";
};

/**
 * Async Function send get http request
 * @param {string} url
 * @param {object} data
 * @param {OptionsParam} options
 * @returns result which server send
 *
 */
export const get = async (
    url: string,
    data?: DataParam,
    options?: OptionsParam
) => {
    let params: string[] = [];

    const handleError = options?.handleError;
    const type = options?.type;
    const isEncodeURI = options?.isEncodeURI;

    if (data !== undefined && isObject(data)) {
        params = Object.keys(data).map((key) => {
            return `${key}=${
                isEncodeURI ? encodeURIComponent(data[key]) : data[key]
            }`;
        });
    }

    return await fetch(`${url}?${params.join("&")}`)
        .then((res) => {
            const { ok, status } = res;

            if (!ok) {
                const errorMsg = `Network connect error, status is ${status}`;
                throw new Error(errorMsg);
            }

            if (type) {
                if (type === "text") {
                    return res.text();
                } else if (type === "blob") {
                    return res.blob();
                }
            }

            return res.json();
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log("Error", error);
            handleError && handleError(error);
        });
};

/**
 * Async function send post http request
 * @param {string} url
 * @param {DataParam} data
 * @param {OptionsParam} params
 * @returns result which server send
 */

export const post = async (
    url: string,
    data?: DataParam,
    options?: OptionsParam
) => {
    const handleError = options?.handleError;
    const type = options?.type;
    const isEncodeURI = options?.isEncodeURI;
    const body = isEncodeURI
        ? encodeURIComponent(JSON.stringify(data))
        : JSON.stringify(data);

    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    })
        .then((res) => {
            const { ok, status } = res;

            if (!ok) {
                const errorMsg = `Network connect error, status is ${status}`;
                throw new Error(errorMsg);
            }

            if (type) {
                if (type === "text") {
                    return res.text();
                } else if (type === "blob") {
                    return res.blob();
                }
            }

            return res.json();
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            handleError && handleError(error);
        });
};

export const upload = async (url: string, data: FormData) => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: null,
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res;
        });
};
