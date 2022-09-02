<template>
    <q-card>
        <q-card-section class="flex">
            <q-skeleton animation="wave" type="rect" width="200px" />
            <q-space />
            <q-skeleton animation="wave" type="QBtn" />
        </q-card-section>
        <q-card-section>
            <q-markup-table flat>
                <thead>
                <tr>
                    <th class="text-left" style="width: 150px">
                        <q-skeleton animation="wave" type="text" />
                    </th>
                    <th class="text-right">
                        <q-skeleton animation="wave" type="text" />
                    </th>
                    <th class="text-right">
                        <q-skeleton animation="wave" type="text" />
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="n in 2" :key="n">
                    <td class="text-left">
                        <q-skeleton animation="wave" type="text" />
                    </td>
                    <td class="text-right">
                        <q-skeleton animation="wave" type="text" />
                    </td>
                    <td class="text-right">
                        <q-skeleton animation="wave" type="text" />
                    </td>
                </tr>
                </tbody>
            </q-markup-table>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SkeletonTable',
});
</script>
