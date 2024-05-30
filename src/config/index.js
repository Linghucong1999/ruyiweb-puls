/**
 * 公共配置文件
 */

const configDict = {
    development: {
        baseURL: 'http://127.0.0.1:8018'
    },
    production: {
        baseURL: 'https://ruyiweb.vercel.app'
    }
};

const currentConfigKey = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'development';

const configObj = {
    isDevelop: (isDev || isTest),
    ...configDict[currentConfigKey],

    //H5模式宽高
    canvasH5Width: 375,
    canvasH5Height: 644,
    pageModeList: [
        {
            value: 'H5',
            label: 'H5',
            disabled: false
        },
        //  {
        //     value: 'longPage',
        //     label: 'WebAPP',
        //     disabled: false
        // }, {
        //     name: 'relativePage',
        //     label: '排版图文',
        //     disabled: true,
        // }, {
        //     value: 'PC',
        //     label: 'PC页面',
        //     disabled: true,
        // }
    ],
};

export default configObj;