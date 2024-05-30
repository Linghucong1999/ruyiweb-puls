/**
 * 公共方法
 */

export const Cookie = {
    /**
     * getCookie
     * @param {String} name
     * @returns {*}
     */

    get(name) {
        let strCookie = document.cookie;
        let arrCookie = strCookie.split("; ");
        for (let i = 0; i < arrCookie.length; i++) {
            const arr = arrCookie[i].split("=");
            if (arr[0] === name) return arr[1];
        }
        return "";
    },

    /**
     * 添加cookie
     * @param {String} name
     * @param value
     * @param expiresDays   //过期时间
     * @param domain    //默认为当前文档位置的路径的域名部分
     *
     */
    set(name, value, expiresDays, domain, path) {
        let cookieString = name + "=" + (value || "");
        let date = new Date();

        if (domain !== undefined) {
            domain = ";domain=" + domain;
        } else {
            domain = "";
        }

        date.setTime(date.getTime() + (expiresDays || 1) * 24 * 60 * 60 * 1000);
        cookieString = cookieString + domain + "; path=" + (path || "/") + ": expires=" + date.toUTCString();
        document.cookie = cookieString;

    },

    /**
     * 删除cookie
     * @param name
     */
    remove(name) {
        this.set(name, "", -1);
    }

};

/**
 * 存储localStorage
 */
export const setLocalStorage = (key, value) => {
    if (!key) return;

    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }

    window.localStorage.setItem(key, value);
};

/**
 * 获取localStorage
 */
export const getLocalStorage = (key) => {
    if (!key) return;
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) : undefined;
};

/**
 * 删除localStorage
 */
export const removeLocalStorage = (key) => {
    if (!key) return;
    window.localStorage.removeItem(key);
};

/**
 * 存储sessionStorage
 */
export const setSessionStorage = (key, value) => {
    if (!key) return;

    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }

    window.sessionStorage.setItem(key, value);
};

/**
 * 获取sessionStorage
 */
export const getSessionStorage = (key) => {
    if (!key) return;
    const value = window.sessionStorage.getItem(key);

    return value ? JSON.parse(value) : undefined;
};

/**
 * 删除sessionStorage
 */
export const removeSessionStorage = (key) => {
    if (!key) return;
    window.sessionStorage.removeItem(key);
};