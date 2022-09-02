<template>
    <q-layout>
<!--        <q-header>-->
<!--            <q-toolbar class="bg-primary text-white">-->
<!--                <q-toolbar-title>-->
<!--                    Household management-->
<!--                </q-toolbar-title>-->
<!--            </q-toolbar>-->
<!--        </q-header>-->
        <q-drawer
            v-model="drawer"
            show-if-above
            :width="250"
            :breakpoint="500"
            bordered
            class="bg-grey-3"
        >
            <q-scroll-area class="fit">
                <q-list>
                    <q-item
                        class="q-my-sm rounded-borders"
                        dense
                        clickable
                        :to="{ name: 'dashboard-view' }"
                        active-class="bg-secondary text-white"
                    >
                        <q-item-section>Dashboard</q-item-section>
                    </q-item>
                    <q-item
                        class="q-my-sm"
                        dense
                        clickable
                        :to="{ name: 'taxes-view' }"
                        active-class="bg-secondary text-white"
                    >
                        <q-item-section>Taxes</q-item-section>
                    </q-item>
                    <q-item
                        class="q-my-sm"
                        dense
                        clickable
                        :to="{ name: 'expenses-view' }"
                        active-class="bg-secondary text-white"
                    >
                        <q-item-section>Expenses</q-item-section>
                    </q-item>
                    <q-item
                        class="q-my-sm"
                        dense
                        clickable
                        :to="{ name: 'cleaning-view' }"
                        active-class="bg-secondary text-white"
                    >
                        <q-item-section>Cleaning</q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>
        <q-page-container>
            <q-page padding>
                <RouterView v-slot="{ Component }">
                    <Transition name="page" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data: () => ({
        drawer: true,
    }),
});
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
