import Vue from "vue";
import Index from './index.vue';
const ComponentConstructor = Vue.extend(Index);
let instance;
const Component = function (pageId, callback) {
    instance = new ComponentConstructor({
        data: {
            pageId: pageId,
        }
    });
    instance.$mount();
    instance.callback = callback;
    document.body.appendChild(instance.$el);
    instance.visible = true;
    return instance;
};
export default Component;