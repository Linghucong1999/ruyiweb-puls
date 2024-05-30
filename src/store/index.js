import { Message } from "element-ui";
import Vue from "vue";
import Vuex from "vuex";

//模块
import user from "./module/user";
import pageEditor from "./module/editor";

/**
 * 全局状态管理
 */
const state = {};

const actions = {
    /**
     * 显示提示message.type类型 message.data消息内容
     * @param message
     */
    showMessage(store, message) {
        Message({
            message: message.data || message.message,
            type: message.type,
            duration: 3000
        });
    }

};

const mutations = {};
const getters = {};

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules: {
        user,
        pageEditor,
    }
});

