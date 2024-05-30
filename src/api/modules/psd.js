import $axios from '@/service/httpServer.js';

// 上传psd文件解析
export const psdUplod = data => $axios.postFile('/ruyi/psd/upload', data);