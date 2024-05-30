/**
 * 账号相关操作模块
 */

import store from "@/store";
import router from "@/router";
import { login, register, getUserInfo, loginByEmail, sendEmailCode, resetPasswordFirstStep, resetPasswordSecondStep, getRsaPublicKey } from "@/api";

const userModel = {
    /**
     * 检测是否登录
     * @returns {Promise<void>}
     */
    async checkLoginState() {
        const userData = store.state.user;    //模块user的状态
        return !!userData.access_token;
    },

    /**
     * 检测用户登录是否过期,时长为半小时(算了，不检测了)
     * @returns {Promise<void>}
     */
    async checkLoginExpire() {
        const userData = store.state.user;
        const expiration_time = new Date().getTime();
        return (expiration_time - userData.expiration_time) >= 1800000;

    },

    /**
     * 获取RSA加密公钥
     */
    async getRSAkey() {
        const res = await getRsaPublicKey();
        return res.body;
    },

    /**
     * 登录
     *
     */
    async doLogin(data) {
        try {
            const res = await login(data);
            store.commit('updateAccessToken', res.body.access_token);
            store.commit('updateUserInfo', res.body.userInfo);
            return res;
        } catch (err) {
            return err.data.body;
        }
    },
    /**
     * 发送验证码
     * @returns {Promise<void>}
     */
    async sendEmailAndCode(data) {

        try {
            const res = await sendEmailCode(data);
            return res;
        } catch (err) {
            return err;
        }

    },

    /**
     * 邮箱登录
     *
     */
    async doLoginByEmail(data) {
        try {
            const res = await loginByEmail(data);
            store.commit('updateAccessToken', res.body.access_token);
            store.commit('updateUserInfo', res.body.userInfo);
            return res;
        } catch (err) {
            return err;
        }
    },

    /**
     * 注册
     */
    async doRegister(data) {
        try {
            const res = await register(data);
            store.commit('updateAccessToken', res.body.access_token);
            store.commit('updateUserInfo', res.body.userInfo);
            return res;
        } catch (err) {
            return err.data;
        }
    },

    /**
     * 获取用户信息
     */
    getUserInfoData() {
        return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
                store.commit('updateUserInfo', res.body);
                resolve(res.body);
            }).catch(err => {
                reject(err);
            });
        });
    },

    /**
     * 退出登录
     */
    async doLogout() {
        // 清除store中的user token
        store.commit('updateAccessToken', '');
        window.sessionStorage.setItem('beforeLoginUrl', '');
        userModel.goLogin();
    },

    /**
     * 跳转登录
     */
    async goLogin() {
        //将路由保存在缓存中，用于登录完成后跳转
        const indexOf = window.location.href.indexOf('#/');
        const currentUrl = window.location.href.slice(indexOf + 1, window.location.href.length);
        window.sessionStorage.setItem('beforeLoginUrl', currentUrl);
        store.commit('updateAccessToken', '');
        router.push({ name: 'Login' });
    },

    async goBeforeLoginUrl() {
        // 获取sessionStorage中的beforeLoginUrl
        const url = window.sessionStorage.getItem('beforeLoginUrl');
        // 判断beforeLoginUrl是否存在，或者是否包含/login
        if (!url || ['/login'].includes(url)) {
            // 如果不存在或者包含/login，则跳转到根路由
            router.push('/');
        } else {
            // 如果存在，则跳转到beforeLoginUrl路由，并将beforeLoginUrl设置为空
            router.push(url);
            window.sessionStorage.setItem('beforeLoginUrl', '');
        }
    },

    /**
     * 通过邮箱重置密码
     */
    async doResetPasswordByEmail(data) {
        try {
            const res = await resetPasswordFirstStep(data);
            store.commit('updateAccessToken', res.body.access_token);
            return res;
        } catch (err) {
            return err;
        }
    },

    /**
     * 邮箱通过后，重置密码
     */
    async doResetPasswordSecondStep(data) {
        try {
            const res = await resetPasswordSecondStep(data);
            store.commit('updateAccessToken', '');
            return res;
        } catch (err) {
            return err;
        }
    }
};

export default userModel;