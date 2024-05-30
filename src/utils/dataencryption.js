import { JSEncrypt } from 'jsencrypt';
// 数据加密
export const encryption = (data, publicKey) => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const result = encrypt.encrypt(data);
    return result;
};

// blob转换回文件
export const blobToFile = (blob, fileName) => {
    blob.lastModifiedDate = new Date();
    blob.name = fileName || new Date().getTime();
    return blob;
};