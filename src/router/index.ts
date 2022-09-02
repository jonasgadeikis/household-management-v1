import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import TaxesView from '../views/TaxesView.vue';
import ExpensesView from '../views/ExpensesView.vue';
import CleaningView from '../views/CleaningView.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'dashboard-view',
        component: DashboardView,
    },
    {
        path: '/taxes',
        name: 'taxes-view',
        component: TaxesView,
    },
    {
        path: '/expenses',
        name: 'expenses-view',
        component: ExpensesView,
    },
    {
        path: '/cleaning',
        name: 'cleaning-view',
        component: CleaningView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
