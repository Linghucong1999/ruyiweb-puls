import { createUUID, deepClone } from '@/common/js/utils';
import { cloneDeep, merge } from 'lodash';
import $config from '@/config/index';
const elementConfig = {
    // 组件
    elName: '', //组件名
    animations: [], //动画
    commonStyle: {
        //通用样式
        position: 'absolute',
        width: $config.canvasH5Width,
        height: 30,
        top: 200,
        left: 0,
        rotate: 0,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        borderWidth: 0,
        borderColor: '',
        borderStyle: 'solid',
        borderRadius: 0,
        boxShadow: '',
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#000000',
        backgroundColor: '',
        backgroundImage: '',
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        fontFamily: 'Arial',
        opacity: 1,
        zIndex: 1,
    },
    events: [],   //事件
    propsValue: {}, //属性值
    value: '',  //绑定值
    valueType: 'String' //值类型
};

//页面配置信息字段
const pageConfig = {
    name: '',
    elements: [],
    commonStyle: {
        backgroundColor: '',
        backgroundImage: '',
        backgroundSize: '100%',
        backgroundRepeat: "no-repeat",
    },
    config: {},
};

//项目配置信息字段
const projectConfig = {
    name: '',
    title: '未命名场景',
    description: '无代码平台，构建页面从未如此简单',
    coverImage: '',
    auther: '',
    script: '',
    width: $config.canvasH5Width,
    height: $config.canvasH5Height,
    pages: [],
};

const getPageConfig = () => {
    return {
        uuid: createUUID(),
        ...cloneDeep(pageConfig),
    };
};

const copyPage = (data) => {
    const pageData = cloneDeep(data);
    pageData.uuid = createUUID();
    pageData.elements = pageData.elements.map(item => {
        return copyElement(item);
    });
    return pageData;
};
const getProjectConfig = () => {
    const project = cloneDeep(projectConfig);
    const onePage = getPageConfig();
    project.pages.push({ ...onePage });
    return project;
};

const getElementConfig = (element, extendStyle = {}) => {
    const elementData = cloneDeep(element);
    const type = elementData.valueType || 'String';
    const dict = {
        'String': '',
        'Array': [],
        'Object': {},
        'Boolean': false,
        'Number': 0,

    };
    const elementConfigData = cloneDeep(elementConfig);
    const config = {
        uuid: createUUID(),
        ...elementConfigData,
        elName: elementData.elName,
        propsValue: deepClone(elementData.needProps || {}),
    };

    // 样式
    config.commonStyle = merge(config.commonStyle, elementData.defaultStyle);
    config.commonStyle = merge(config.commonStyle, extendStyle);
    config.value = element.defaultValue || dict[type];
    config.valueType = type;
    return config;
};

/**
 * 获取元素样式
 */
const getCommonStyle = (styleObj, scalingRatio = 1) => {
    const needUnitStr = ['width', 'height', 'top', 'left', 'borderWidth', 'borderRadius', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth', 'padding', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'fontSize', 'constterSpacing', 'lineHeight'];
    const style = {};

    for (let key in styleObj) {
        if (needUnitStr.includes(key)) {
            style[key] = (styleObj[key] * scalingRatio) + 'px';
        } else {
            style[key] = styleObj[key];
        }
    }
    style.transform = `rotate(${style.rotate}deg)`;
    style.backgroundImage = style.backgroundImage ? `url(${style.backgroundImage})` : '';

    return style;
};

// 复制元素
const copyElement = (element, extendStyle = {}) => {
    const el = cloneDeep(element);
    el.uuid = createUUID();
    el.commonStyle = merge(el.commonStyle, extendStyle);
    // 加上一点偏移量，以作区分
    el.commonStyle.top = el.commonStyle.top + 30;
    // el.commonStyle.left = element.commonStyle.left + 10;
    return el;
};
export default {
    elementConfig,
    pageConfig,
    projectConfig,
    getPageConfig,
    getProjectConfig,
    getElementConfig,
    getCommonStyle,
    copyElement,
    copyPage,
};