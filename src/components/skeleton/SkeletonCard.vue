<template>
    <q-card>
        <q-card-section>
            <q-skeleton animation="wave" type="rect" width="200px" />
        </q-card-section>
        <q-card-section>
            <q-skeleton animation="wave" type="QInput" />
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'SkeletonCard',
});
</script>
