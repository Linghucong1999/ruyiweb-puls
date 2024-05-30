import $axios from '@/service/httpServer';

// 检测用户登录状态
export const checkLogin = (data) => $axios.post('/ruyi/auth/get/user/status', data);

// 用户退出登录清除Token
export const logoutClearToken = () => $axios.get('/ruyi/auth/logout');