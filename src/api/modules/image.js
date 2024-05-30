/**
 * 图片库
 */
import $axios from '@/service/httpServer';

// 获取我的图片列表
export const getMyImages = data => $axios.get('/ruyi/imageLib/myImages', data);
// 上传图片
export const uploadImage = data => $axios.postFile('/ruyi/imageLib/upload', data);

export const uploadCommonImage = (data, id) => $axios.postFile(`/ruyi/imageCommon/upload/${id}`, data);