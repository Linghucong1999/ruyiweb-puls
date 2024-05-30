import Text from './commponent/text.vue';
import ImageSRC from './commponent/imageSrc.vue';
import ImageListSRC from './commponent/imageSrcList.vue';
import URL from './commponent/url.vue';
import musicSrc from './commponent/musicSrc.vue';

export default {
    [Text.name]: Text,
    [ImageSRC.name]: ImageSRC,
    [ImageListSRC.name]: ImageListSRC,
    [URL.name]: URL,
    [musicSrc.name]: musicSrc,
};