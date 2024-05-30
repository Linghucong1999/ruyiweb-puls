/**
 * 防抖
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate 是否立即执行
 * @returns
 */
export const debounce = (func, wait, immediate = false) => {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};