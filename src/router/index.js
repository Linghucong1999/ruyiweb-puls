import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/login'),
            meta: {
                hideHeader: true,
                trust: true,
                noNeedLogin: true,
            }
        },
        {
            path: '/password',
            name: 'Password',
            component: () => import('@/pages/password/password'),
        },
        {
            path: '/',
            name: 'Layout',
            component: () => import('@/pages/layout'),
            redirect: { name: 'Home' },
            children: [
                {
                    path: 'home',
                    name: 'Home',
                    component: () => import('@/pages/home/index'),
                    redirect: { name: 'pageList' },
                    children: [
                        {
                            path: 'page-list',
                            name: 'pageList',
                            component: () => import('@/pages/home/page-list.vue'),
                        },
                        {
                            path: 'my-template',
                            name: 'myTemplate',
                            component: () => import('@/pages/home/my-template.vue'),
                        },
                        {
                            path: 'page-data',
                            name: 'pageData',
                            component: () => import('@/pages/home/page-data.vue'),
                        },
                        {
                            path: 'page-data-detail',
                            name: 'pageDataDetail',
                            component: () => import('@/pages/home/page-data-detail.vue'),
                        },
                        {
                            path: 'template-list',
                            name: 'templateList',
                            component: () => import('@/pages/home/template-list.vue'),
                        }
                    ]
                },
                {
                    path: 'edit',
                    name: 'Edit',
                    component: () => import('@/pages/editor/index.vue'),
                }
            ]
        },

    ]
});