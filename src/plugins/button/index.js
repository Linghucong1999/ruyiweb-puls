import Component from './src/index.vue';
Component.install = Vue => {
    Vue.Commponent(Component.name, Component);
};

export default Component;