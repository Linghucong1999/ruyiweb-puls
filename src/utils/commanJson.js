import configObj from '@/config/index';
export const sideBarMenus = [
    {
        label: '组件列表',
        value: 'componentLibs',
        elementUiIcon: 'el-icon-s-operation'
    },
    {
        label: '页面管理',
        value: 'pageManage',
        elementUiIcon: 'el-icon-document'
    },
    {
        label: '模板库',
        value: 'templateLibs',
        elementUiIcon: 'el-icon-s-promotion'
    },
];

export const operationDataList = [
    {
        title: "发布",
        eventType: "publish",
        extraClassName: "",
        iconClass: "el-icon-upload",
    },
    {
        title: "发布模板市场",
        eventType: "publishTemplate",
        extraClassName: "",
        iconClass: "el-icon-s-shop",
    },
    {
        title: "复制链接",
        eventType: "copyUrl",
        extraClassName: "",
        iconClass: "el-icon-connection",
    },
    {
        title: "设为我的模板",
        eventType: "setTemplate",
        extraClassName: "",
        iconClass: "el-icon-document-copy",
    },
    {
        title: "页面数据",
        eventType: "viewPageData",
        extraClassName: "",
        iconClass: "el-icon-document",
    },
    {
        title: "协作设置",
        eventType: "cooperation",
        extraClassName: "",
        iconClass: "el-icon-s-operation",
    },
    {
        title: "删除",
        eventType: "delete",
        extraClassName: "error",
        iconClass: "el-icon-delete",
    },
    {
        title: "退出协作",
        eventType: "unCooperation",
        extraClassName: "error",
        iconClass: "el-icon-right",
    },
];

export const elementConfig = [
    {
        title: '基础组件',
        // 每个组件设置props来展示哪些编辑项
        components: [
            {
                elName: 'ruyi-text',
                title: '文字',
                icon: 'iconfont iconwenben',
                valueType: '',   // 标识数据类型，用于表单组件
                defaultStyle: {
                    height: 40,
                    lineHeight: 40,
                }
            },
            {
                elName: 'ruyi-image',
                title: '图片',
                icon: 'iconfont icontupian',
                valueType: '',
                defaultStyle: {
                    height: 200,
                }
            },
            {
                elName: 'ruyi-image-carousel',
                title: '图片轮播',
                icon: 'iconfont iconshouyelunbotu',
                valueType: '', // 标识数据类型，用于表单组件,
                defaultStyle: {
                    height: 210
                }
            },
            {
                elName: 'ruyi-button',
                title: '按钮',
                icon: 'iconfont iconanniuzu',
                valueType: '',
                defaultStyle: {
                    width: 140,
                    height: 40,
                    borderColor: '#1890FF',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderRadius: 4,
                    lineHeight: 40,
                },
            },
            {
                elName: 'ruyi-rectangle',
                title: '矩形边框',
                icon: 'iconfont iconjuxing',
                valueType: '',
                defaultStyle: {
                    width: 120,
                    height: 100,
                    borderColor: '#1890FF',
                    borderStyle: 'solid',
                    borderWidth: 1,
                }
            },
            {
                elName: 'ruyi-divider',
                title: '分割线',
                icon: 'iconfont iconfengexian',
                valueType: '',
                defaultStyle: {
                    color: '#fafafa',
                }
            },
            {
                elName: 'ruyi-iframe',
                title: '内嵌iframe',
                icon: 'iconfont iconiframetianjia',
                valueType: '',
                defaultStyle: {
                    width: configObj.canvasH5Width,
                    height: 300,
                    paddingTop: 10,
                    paddingBottom: 10,
                }
            },
            {
                elName: 'map',
                title: '地图',
                icon: 'iconfont iconditu',
                valueType: '',
                defaultStyle: {
                    width: 300,
                    height: 200,
                    paddingTop: 10,
                    paddingBottom: 10,
                }
            },
            {
                elName: 'video',
                title: '视频',
                icon: 'iconfont iconshipin',
                valueType: '',
                defaultStyle: {
                    width: configObj.canvasH5Width,
                    height: 300,
                    paddingTop: 10,
                    paddingBottom: 10,
                }
            },
        ]
    },
    {
        title: '表单组件',
        components: [
            {
                elName: 'input',
                title: '单行文本',
                icon: 'iconfont iconwenbenkuang',
                defaultStyle: {
                    border: '1px solid #ccc',
                },
                valueType: '',
            },
            // {
            //     elName: 'el-radio',
            //     title: '单选框',
            //     icon: 'iconfont iconplus-radio',
            // },
            // {
            //     elName: 'ruyi-checkbox',
            //     title: '复选框',
            //     icon: 'iconfont iconduoxuan',
            // },
            {
                elName: 'ruyi-date-picker',
                title: '日期选择器',
                icon: 'iconfont iconriqi',
                defaultStyle: {
                    height: 60,
                }
            },
            {
                elName: 'ruyi-time-select',
                title: '时间选择器',
                icon: 'iconfont iconshijian',
                defaultStyle: {
                    height: 60,
                }
            },
            {
                elName: 'ruyi-date-time-select',
                title: '日期时间选择器',
                icon: 'iconfont iconriqishijian',
                defaultStyle: {
                    height: 60,
                }
            },
            {
                elName: 'ruyi-number-input',
                title: '数字输入框',
                icon: 'iconfont iconfuhao-shuzishurukuang',
                defaultStyle: {
                    height: 60,
                }
            },
            {
                elName: 'ruyi-textarea',
                title: '文本域',
                icon: 'iconfont iconwenben',
                defaultStyle: {
                    height: 120,
                }
            }
        ]
    },
    {
        title: '功能组件',
        components: [
            {
                elName: 'ruyi-bg-music',
                title: '音乐',
                icon: 'iconfont iconyinlemusic217',
                valueType: '',
                defaultStyle: {
                    height: 52,
                    width: 52,
                }
            }
        ]
    },
    {
        title: '业务组件',
        components: [],
    }
];

export const menuOptions = [
    {
        title: '复制',
        icon: 'iconfont iconfuzhi',
        value: 'copy'
    }, {
        title: '删除',
        icon: 'iconfont iconshanchu',
        value: 'delete'
    }, {
        title: '字体放大',
        icon: 'iconfont iconzitifangda',
        value: 'fontA+',
    }, {
        title: '字体缩小',
        icon: 'iconfont iconzitisuoxiao',
        value: 'fontA-',
    }, {
        title: '字体加粗',
        icon: 'iconfont iconzitijiacu',
        value: 'fontB',
    }, {
        title: '图层上移',
        icon: 'iconfont iconziyuan1',
        value: 'layerUp',
    }, {
        title: '图层下移',
        icon: 'iconfont iconxiayiyiceng',
        value: 'layerDown',
    }, {
        title: '图层置顶',
        icon: 'iconfont iconcontrol-top',
        value: 'layerTop',
    }, {
        title: '图层置底',
        icon: 'iconfont iconcontrol-bottom',
        value: 'layerBottom'
    }
];

export const alignTypeList = [
    {
        title: '左对齐',
        icon: 'iconfont iconzuoduiqi',
        type: 'l',
    },
    {
        title: '上对齐',
        icon: 'iconfont iconshangduiqi',
        type: 't',
    },
    {
        title: '右对齐',
        icon: 'iconfont iconyouduiqi',
        type: 'r',
    },
    {
        title: '下对齐',
        icon: 'iconfont iconxiaduiqi',
        type: 'b',
    },
    {
        title: '垂直居中对齐',
        icon: 'iconfont iconchuizhijuzhongduiqi',
        type: 'tb',
    },
    {
        title: '水平居中对齐',
        icon: 'iconfont iconshuipingjuzhongduiqi',
        type: 'lr',
    }
];

export const borderStyleList = [
    {
        label: '实线',
        value: 'solid'
    },
    {
        label: '虚线',
        value: 'dashed',
    },
    {
        label: '点状',
        value: 'dotted',
    },
    {
        label: '双实线',
        value: 'double',
    },
];

export const emailCode = [
    { value: '@qq.com' },
    { value: '@126.com' },
    { value: '@163.com' },
    { value: '@sina.com' },
    { value: '@sohu.com' },
    { value: '@yahoo.com.cn' },
    { value: '@gmail.com' },
    { value: '@hotmail.com' },
    { value: '@139.com' },
    { value: '@189.cn' },
    { value: '@21cn.com' },
    { value: '@wo.com.cn' },
    { value: '@yeah.net' },
    { value: '@263.net' },
    { value: '@eyou.com' },
    { value: '@foxmail.com' },
    { value: '@sogou.com' },
    { value: '@188.com' },
    { value: '@2345.net' },
    { value: '@yeah.net' },
];