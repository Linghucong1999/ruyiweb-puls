/**
 * 用户相关的api
 */
import $axios from "@/service/httpServer";

// 获取RSA加密公钥
export const getRsaPublicKey = () => $axios.get("/ruyi/auth/rsa/login/key");

//登录
export const login = data => $axios.post("/ruyi/auth/login", data);

//通过邮箱登录
export const loginByEmail = data => $axios.post("/ruyi/auth/login/email", data);

//发送验证码
export const sendEmailCode = data => $axios.post("/ruyi/auth/send/email/code", data);

//注册
export const register = data => $axios.post("/ruyi/auth/register", data);

//获取用户信息
export const getUserInfo = () => $axios.get("/ruyi/user/info");

//修改用户昵称
export const updateUserNickname = data => $axios.post("/ruyi/user/updata/name", data);

//修改密码
export const updateUserPassword = data => $axios.post("/ruyi/user/updata/password", data);

//重置密码步骤第一步，验证邮箱
export const resetPasswordFirstStep = data => $axios.post("/ruyi/email/password/reset/first", data);

//邮箱验证通过后重置密码
export const resetPasswordSecondStep = data => $axios.post("/ruyi/email/password/reset/second", data);

//修改头像
export const updateUserAvatar = data => $axios.post("/ruyi/user/updata/avater", data);
export const updataUserAvatarURL = "/ruyi/user/updata/avater";

//关键词搜索用户
export const getUserListByKeywords = data => $axios.get('/ruyi/user/getUserList', data);