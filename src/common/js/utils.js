/**
 * 生成uuid
 * @returns {string}
 */
export const createUUID = function () {
    let date = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        date += performance.now();
    }

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
};

/**
 * 深拷贝
 * @param {*} obj 拷贝对象
 * @param {*} cache 缓存数组
 */
export const deepClone = function (obj, cache = []) {
    if (obj === null || typeof obj !== 'object') return obj;
    const hit = cache.filter(c => c.original === obj)[0];
    if (hit) {
        return hit.copy;
    }
    const copy = Array.isArray(obj) ? [] : {};
    cache.push({
        original: obj,
        copy
    });
    Object.keys(obj).forEach(key => {
        copy[key] = deepClone(obj[key], cache);
    });
    return copy;
};