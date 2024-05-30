/**
 * 页面API
 */

import $axios from '@/service/httpServer';

// 新增页面
export const createPage = params => $axios.post('/ruyi/page/create', params);

// 获取所有页面
export const getAllPage = params => $axios.get('/ruyi/page/getMyPages', params);

// 获取页面详情
export const getPageDetail = params => $axios.get('/ruyi/page/getPageDetail', params);

// 更新页面元素
export const updatedPage = params => $axios.post('/ruyi/page/update', params);

// 删除页面
export const deletePage = params => $axios.post('/ruyi/page/delete', params);

// 复制页面
export const copyPage = params => $axios.post('/ruyi/page/copy', params);

// 发布页面
export const publish = params => $axios.post('/ruyi/page/setPublish', params);

// 设置为模板
export const setTemplatePage = params => $axios.post('/ruyi/page/setTemplate', params);

// 协作人列表
export const getCooperationListByPageID = params => $axios.get('/ruyi/page/getCooperationList', params);

// 添加协作人
export const addCooperation = params => $axios.post('/ruyi/page/addCooperation', params);

// 删除协作人
export const deleteCooperation = params => $axios.post('/ruyi/page/deleteCooperation', params);

// 获取我的模板库
export const getMyTemplates = params => $axios.get('/ruyi/template/getMyTemplates', params);

// 获取模板市场模板
export const getPublishTemplates = params => $axios.get('/ruyi/template/getPublishTemplates', params);