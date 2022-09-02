<template>
    <q-card>
        <q-card-section>
            <div class="text-h6">{{ taxCategory.name }}</div>
        </q-card-section>
        <q-card-section>
            <div class="row">
                <div :class="taxCategory.fixedPrice ? 'col-6' : 'col-12'">
                    <q-input
                        outlined
                        disable
                        label="Unit price"
                        :model-value="taxCategory.unitPrice"
                    >
                        <template #prepend>
                            <span>€</span>
                        </template>
                        <template #append>
                            <span v-html="taxCategory.unit" />
                        </template>
                    </q-input>
                </div>
                <div
                    v-if="taxCategory.fixedPrice"
                    class="col-6 q-pl-sm"
                >
                    <q-input
                        outlined
                        disable
                        label="Fixed price"
                        :model-value="taxCategory.fixedPrice"
                    >
                        <template #prepend>
                            <span>€</span>
                        </template>
                    </q-input>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TaxCategoryType from "../../types/TaxCategoryType";

export default defineComponent({
    name: 'TaxCategoryPricing',
    props: {
        taxCategory: {
            type: Object as PropType<TaxCategoryType>,
            required: true,
        },
    },
});
</script>
