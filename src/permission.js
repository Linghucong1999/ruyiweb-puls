/**
 * 路由权限相关管理
 */
import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import userModel from '@/libs/userModel';

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    //检测是否需要用户登录验证
    if (to.meta.noNeedLogin) {
        next();
        return;
    }
    if (to.name === 'Password') {   //排除Password需要登录校验
        next();
        return;
    }

    //用户登录状态拦截
    const loginStatus = await userModel.checkLoginState();
    if (!loginStatus) {
        userModel.goLogin();
        return false;
    }

    //登录成功后获取用户信息
    try {
        await userModel.getUserInfoData();
        // next();
    } catch (err) {
        if (!err.data.status) {
            userModel.doLogout();
            return;
        }
    }

    //检测用户登录是否过期
    // let loginExpire = await userModel.checkLoginExpire();
    // if (loginExpire) {
    //     userModel.doLogout();
    //     return false;
    // }

    next();
});

router.afterEach(() => {
    NProgress.done();
});