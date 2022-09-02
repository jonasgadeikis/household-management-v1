<template>
    <div>
        <div
            v-if="loading"
            class="row"
        >
            <div
                v-for="n in 6" :key="`skeleton-card-${n}`"
                class="col-4 q-pa-sm"
            >
                <skeleton-card />
            </div>
            <div class="col-12 q-pa-sm flex">
                <q-space />
                <q-skeleton animation="wave" type="QBtn" />
            </div>
            <div class="col-12 q-pa-sm">
                <skeleton-card />
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div
                    class="col-12 col-md-4 q-pa-sm"
                    v-for="taxCategory in taxCategories"
                    :key="taxCategory.uid"
                >
                    <tax-category-pricing :tax-category="taxCategory" />
                </div>
            </div>
            <div class="flex q-ma-sm">
                <q-space />
                <taxes-form-dialog
                    :tax-categories="taxCategories"
                    :users="users"
                />
            </div>
            <q-card class="q-ma-sm">
                <q-card-section>
                    <div class="text-h6">Monthly taxes</div>
                </q-card-section>
                <q-card-section>
                    <q-list>
                        <q-expansion-item
                            v-for="taxInformation in monthlyTaxes"
                            :label="taxInformation.date"
                        >
                            <q-card>
                                <q-card-section>
                                    <p
                                        v-for="tax in taxInformation.taxes"
                                        :key="tax.uid"
                                        class="flex"
                                    >
                                        {{ tax.category.name }}
                                        <q-space />
                                        {{ tax.finalPrice }} €
                                    </p>
                                    <p class="flex">
                                        Other
                                        <q-space />
                                        {{ Number(taxInformation.otherTaxesAmount) }} €
                                    </p>
                                    <q-separator class="q-mb-md" />
                                    <p class="flex">
                                        <strong>Total</strong>
                                        <q-space />
                                        <strong>{{ taxInformation.totalTaxesPrice }} €</strong>
                                    </p>
                                    <p class="flex">
                                        <strong>Total per person</strong>
                                        <q-space />
                                        <strong>{{ taxInformation.totalTaxesPerPersonPrice }} €</strong>
                                    </p>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-list>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import TaxCategoryPricing from "../components/taxes/TaxCategoryPricing.vue";
import TaxesFormDialog from "../components/TaxesFormDialog.vue";
import SkeletonCard from '../components/skeleton/SkeletonCard.vue';
import TaxCategoryModel from "../models/TaxCategoryModel";
import TaxCategoryType from "../types/TaxCategoryType";
import TaxCategoryRawType from '../types/TaxCategoryRawType';
import UserType from "../types/UserType";
import constants from "../constants";
import MonthlyTaxesType from "../types/MonthlyTaxesType";

export default defineComponent({
    components: {
        TaxCategoryPricing,
        TaxesFormDialog,
        SkeletonCard,
    },
    data: () => ({
        loading: false,
        taxCategories: [] as TaxCategoryType[],
        users: [] as UserType[],
        monthlyTaxes: [] as MonthlyTaxesType[],
    }),
    mounted() {
        this.loading = true;

        setTimeout(() => {
            Promise.all([
                this.getTaxCategories(),
                this.getUsers(),
                this.getMonthlyTaxes(),
            ]).finally(() => {
                this.loading = false;
            });
        }, 1000);
    },
    methods: {
        getTaxCategories() {
            return axios.get(`${constants.API_URL}/tax-categories`).then(({ data }) => {
                this.taxCategories = data.map((taxCategory: TaxCategoryRawType) => new TaxCategoryModel(taxCategory));
            });
        },
        getUsers() {
            return axios.get(`${constants.API_URL}/users`, {
                params: {
                    active: true,
                },
            }).then(({ data }) => {
                this.users = data;
            });
        },
        getMonthlyTaxes() {
            return axios.get(`${constants.API_URL}/monthly-taxes`).then(({ data }) => {
                this.monthlyTaxes = data;
            });
        }
    },
});
</script>
