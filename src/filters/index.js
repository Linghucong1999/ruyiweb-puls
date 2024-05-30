/**
 * 封装过滤器
 */
import dayjs from "dayjs";

const filter = {
    //日期格式化
    dateFormat: function (value) {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    },

    /**
     * 根据value获取label
     * @param {*} value
     * @param {*} list
     * @param {*} label
     */
    getLabelText(value, list, label = 'label') {
        const data = list.find(item => item.value === value);
        if (data) {
            return data[label];
        } else {
            return '';
        }
    }
};

export default filter;