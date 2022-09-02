<template>
    <div>
        <q-btn
            color="primary"
            rounded
            no-caps
            @click="dialog = true"
        >
            Fill taxes
        </q-btn>
        <q-dialog v-model="dialog">
            <q-card class="dialog-width">
                <q-card-section>
                    <div class="text-h6">Taxes form</div>
                </q-card-section>
                <q-card-section>
                    <template
                        v-for="tax in taxes"
                        :key="tax.category.uid"
                    >
                        <div
                            v-if="!isStaticTax(tax.category)"
                            class="row q-mb-md"
                        >
                            <div class="col-12">
                                {{ tax.category.name }}
                            </div>
                            <div class="col-6">
                                <q-input
                                    v-model.number="tax.previousMonthReading"
                                    type="number"
                                    outlined
                                    :disable="hasPreviousMonthTaxes"
                                    label="Previous month reading"
                                />
                            </div>
                            <div class="col-6 q-pl-sm">
                                <q-input
                                    v-model.number="tax.currentMonthReading"
                                    type="number"
                                    outlined
                                    label="Current month reading"
                                    @update:model-value="calculateTax($event, tax)"
                                />
                            </div>
                        </div>
                    </template>
                    <div class="row">
                        <div class="col-12">
                            Other
                        </div>
                        <div class="col-6">
                            <q-input
                                v-model.number="otherTaxesAmount"
                                outlined
                                type="number"
                                label="Amount"
                            >
                                <template #prepend>
                                    <span>€</span>
                                </template>
                            </q-input>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-card flat class="bg-teal-2">
                        <q-card-section>
                            <div class="text-h6 q-mb-md">Summary</div>
                        </q-card-section>
                        <q-card-section>
                            <p
                                v-for="tax in taxes"
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
                                {{ Number(otherTaxesAmount) }} €
                            </p>
                            <q-separator class="q-mb-md" />
                            <p class="flex">
                                <strong>Total</strong>
                                <q-space />
                                <strong>{{ totalTaxesPrice }} €</strong>
                            </p>
                            <p class="flex">
                                <strong>Total per person</strong>
                                <q-space />
                                <strong>{{ totalTaxesPerPersonPrice }} €</strong>
                            </p>
                        </q-card-section>
                    </q-card>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                        color="primary"
                        rounded
                        no-caps
                        :loading="loading"
                        :disable="!canSaveTaxes"
                        @click="save"
                    >
                        Save
                    </q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import axios from "axios";
import moment from "moment";
import TaxModel from "../models/TaxModel";
import TaxCategoryType from "../types/TaxCategoryType";
import TaxType from "../types/TaxType";
import UserType from "../types/UserType";
import MonthlyTaxesType from "../types/MonthlyTaxesType";
import { generateUid } from "../utils";
import constants from "../constants";

export default defineComponent({
    name: 'TaxesFormDialog',
    props: {
        taxCategories: {
            type: Array as PropType<TaxCategoryType[]>,
            required: true,
        },
        users: {
            type: Array as PropType<UserType[]>,
            required: true,
        },
    },
    data: () => ({
        otherTaxesAmount: null as number | null,
        dialog: false,
        loading: false,
        taxes: [] as TaxType[],
        hasPreviousMonthTaxes: false,
    }),
    computed: {
        totalTaxesPrice(): number {
            let taxesPrice = this.taxes.reduce((accumulator: number, tax: TaxType) => {
                accumulator += tax.finalPrice;

                return accumulator;
            }, 0);

            if (this.otherTaxesAmount) {
                taxesPrice += this.otherTaxesAmount;
            }

            return Number(taxesPrice.toFixed(2));
        },
        totalTaxesPerPersonPrice(): number {
            const price = this.totalTaxesPrice / this.users.length;

            return Math.round(price);
        },
        canSaveTaxes(): boolean {
            if (this.otherTaxesAmount) {
                return this.taxes.every((tax: TaxType) => tax.finalPrice > 0) && this.otherTaxesAmount > 0;
            }

            return false;
        },
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {
            const previousMonthDate: string = moment().subtract(1, 'month').format('YYYY-MM');

            axios.get(`${constants.API_URL}/monthly-taxes`, {
                params: {
                    date: previousMonthDate,
                },
            }).then(({ data }) => {
                if (data.length) {
                    this.hasPreviousMonthTaxes = true;

                    this.taxes = this.taxCategories.map((taxCategory: TaxCategoryType) => {
                        const [previousMonthData] = data;

                        const previousMonthTax: TaxType = previousMonthData.taxes.find((tax: TaxType) => tax.category.identifier === taxCategory.identifier);

                        return new TaxModel({
                            uid: generateUid(),
                            category: taxCategory,
                            previousMonthReading: previousMonthTax.currentMonthReading,
                            currentMonthReading: null,
                            finalPrice: this.isStaticTax(taxCategory) ? taxCategory.unitPrice : 0,
                        });
                    });
                } else {
                    this.taxes = this.taxCategories.map((taxCategory: TaxCategoryType) => new TaxModel({
                        uid: generateUid(),
                        category: taxCategory,
                        previousMonthReading: null,
                        currentMonthReading: null,
                        finalPrice: this.isStaticTax(taxCategory) ? taxCategory.unitPrice : 0,
                    }));
                }
            });

            this.otherTaxesAmount = null;
        },
        isStaticTax(taxCategory: TaxCategoryType): boolean {
            return constants.STATIC_TAX_CATEGORIES.includes(taxCategory.identifier);
        },
        calculateTax(value: any, tax: TaxType): void {
            if (!tax.previousMonthReading || !tax.currentMonthReading || (tax.previousMonthReading > tax.currentMonthReading)) return;

            const readingDifference: number = tax.currentMonthReading - tax.previousMonthReading;
            const finalPrice: number = (readingDifference * tax.category.unitPrice) + tax.category.fixedPrice;

            tax.finalPrice = Number(finalPrice.toFixed(2));
        },
        save() {
            const payload: MonthlyTaxesType = {
                date: moment().format('YYYY-MM'),
                taxes: this.taxes,
                otherTaxesAmount: this.otherTaxesAmount,
                totalTaxesPrice: this.totalTaxesPrice,
                totalTaxesPerPersonPrice: this.totalTaxesPerPersonPrice,
            };

            this.loading = true;

            setTimeout(() => {
                axios.post(`${constants.API_URL}/monthly-taxes`, payload).then(() => {
                    this.dialog = false;

                    this.initialize();

                    // show success message
                }).finally(() => {
                    this.loading = false;
                });
            }, 1000);
        },
    },
});
</script>

<style lang="scss" scoped>
.dialog-width {
    width: 900px;
    max-width: 900px;
}
</style>
