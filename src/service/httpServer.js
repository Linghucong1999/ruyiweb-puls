import axios from 'axios';
import store from '@/store/index';
import $config from '@/config/index';
import { Cookie } from '@/common/js/mUtils';
import qs from 'qs';

//生产环境需要配置axios.defaults.baseURL,开发环境使用proxy代理即可
if (process.env.NODE_ENV !== 'development') {
    axios.defaults.baseURL = $config.baseURL;
}

axios.defaults.headers['Content-Type'] = 'applicathion/json;charset=utf-8';
axios.defaults.timeout = 70000;

//请求拦截器
axios.interceptors.request.use(config => {
    //每次请求都加上token
    config.headers.Authorization = store.getters.authorization;
    // 设置请求头中的x-csrf-token值为从cookie中获取的x-csrf-token
    config.headers['x-csrf-token'] = Cookie.get('x-csrf-token');
    return config;
}, error => {
    return Promise.reject(error);
});

//响应拦截器异常处理
axios.interceptors.response.use(response => {
    if (response.data.status) {
        return Promise.resolve(response.data);
    } else {
        store.dispatch('showMessage', {
            type: 'error',
            data: response.data.message ? response.data.message : "服务器连接失败",
        });
        return Promise.reject(response);
    }
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求';
                break;
            case 401:
                error.message = '未授权，请重新登录';
                break;
            case 403:
                error.message = '拒绝访问';
                break;
            case 404:
                error.message = '请求错误,未找到该资源';
                break;
            case 405:
                error.message = '请求方法未允许';
                break;
            case 408:
                error.message = '请求超时';
                break;
            case 500:
                error.message = '服务器端出错';
                break;
            case 501:
                error.message = '网络未实现';
                break;
            case 502:
                error.message = '网络错误';
                break;
            case 503:
                error.message = '服务不可用';
                break;
            case 504:
                error.message = '网络超时';
                break;
            default:
                error.message = `连接错误${error.response.message}`;
        }
    } else {
        error.message = "连接到服务器失败";
    }
    store.dispatch('showMessage', {
        type: 'error',
        data: error.message || error.response.message,
    });
    return Promise.reject(error.response);
});

/**
 * 下载文件
 */
const downloadFile = url => {
    window.open(url);
};

export default {
    //get请求
    get(url, param, responseType, header) {
        return axios({
            method: 'get',
            url,
            params: param || {},
            headers: {
                ...(header || {})
            },
            responseType: responseType,
        });
    },

    //post请求
    post(url, param, header) {
        return axios({
            method: 'post',
            url,
            data: param || {},
            headers: {
                ...(header || {}),
                'Content-type': 'application/json;charset=UTF-8'
            }
        });
    },
    postFormData(url, param, header) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(param) || {},
            headers: {
                ...(header || {}),
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
    },
    postFile(url, param, header) {
        return axios({
            method: 'post',
            url,
            data: param,
            headers: {
                ...(header || {}),
                'Content-type': 'multipart/form-data',
            }
        });
    },
    put(url, param, header) {
        return axios({
            method: 'put',
            url,
            data: param || {},
            headers: {
                ...(header || {}),
                'Content-type': 'application/json;charset=UTF-8'
            }
        });
    },
    delete(url, param, header) {
        return axios({
            method: 'delete',
            url,
            params: param || {},
            headers: {
                ...(header || {}),
            }
        });
    },
    //导出文件
    getFile(url, param) {
        const tempParam = {
            ...(param || {})
        };

        //拼接地址
        const list = [];
        for (let key in tempParam) {
            list.push(key.toString() + '=' + tempParam[key]);
        }
        url = $config.baseURL + url + '?' + list.join('&');
        url = encodeURI(url);
        downloadFile(url);
    }
};