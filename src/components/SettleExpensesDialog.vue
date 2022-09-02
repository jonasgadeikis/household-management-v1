<template>
    <div>
        <q-btn
            color="primary"
            rounded
            no-caps
            @click="dialog = true"
        >
            Settle expenses
        </q-btn>
        <q-dialog v-model="dialog">
            <q-card class="dialog-width">
                <q-card-section>
                    <div class="text-h6">
                        Settle expenses
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-table
                        :columns="columns"
                        :rows="expensesPerUser"
                        row-key="uid"
                        hide-pagination
                        flat
                    >
                        <template #body-cell-difference="{ value }">
                            <q-td class="text-right" :class="{ 'text-positive': value > 0, 'text-negative': value < 0 }">
                                {{ value }} €
                            </q-td>
                        </template>
                        <template #bottom-row>
                            <q-td>
                                Total
                            </q-td>
                            <q-td class="text-right">
                                <strong>{{ calculateExpensesSum(expenses) }} €</strong>
                            </q-td>
                        </template>
                    </q-table>
                </q-card-section>
                <q-card-actions>
                    <q-space />
                    <q-btn
                        color="primary"
                        no-caps
                        rounded
                        :loading="loading"
                        @click="settle"
                    >
                        Settle
                    </q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import axios from "axios";
import ExpenseType from '../types/ExpenseType';
import UserType from "../types/UserType";
import UserExpensesType from "../types/UserExpensesType";
import constants from "../constants";
import {generateUid} from "../utils";

export default defineComponent({
    emits: [
        'expenses:settled',
    ],
    props: {
        expenses: {
            type: Array as PropType<ExpenseType[]>,
            required: true,
        },
        users: {
            type: Array as PropType<UserType[]>,
            required: true,
        }
    },
    data: () => ({
        dialog: false,
        loading: false,
    }),
    computed: {
        totalExpensesSum(): number {
            return this.calculateExpensesSum(this.expenses);
        },
        totalExpensesSumForUser(): number {
            const sum = this.totalExpensesSum / this.users.length;

            return Number(sum.toFixed(2));
        },
        expensesPerUser(): UserExpensesType[] {
            const expensesPerUser = [] as UserExpensesType[];

            this.users.forEach((user: UserType) => {
                const userExpenses = this.expenses.filter((expense: ExpenseType) => user.name === expense.username);
                const userExpensesSum = this.calculateExpensesSum(userExpenses);
                const difference = userExpensesSum - this.totalExpensesSumForUser;

                expensesPerUser.push({
                    uid: generateUid(),
                    username: user.name,
                    totalAmount: userExpensesSum,
                    difference: Number(difference.toFixed(2)),
                });
            });

            return expensesPerUser;
        },
        columns(): any[] {
            return [
                {
                    name: 'username',
                    required: true,
                    label: 'Full name',
                    align: 'left',
                    field: 'username',
                },
                {
                    name: 'totalAmount',
                    required: true,
                    label: `Total amount spent`,
                    field: 'totalAmount',
                    format: (value: string) => `${value} €`,
                },
                {
                    name: 'difference',
                    required: true,
                    label: 'Difference',
                    field: 'difference',
                },
            ];
        },
    },
    methods: {
        calculateExpensesSum(expenses: ExpenseType[]): number {
            const sum = expenses.reduce((accumulator: number, expense: ExpenseType) => {
                accumulator += expense.amount ?? 0;

                return accumulator;
            }, 0);

            return Number(sum.toFixed(2));
        },
        settle(): void {
            this.loading = true;

            setTimeout(async() => {
                await Promise.all(this.expenses.map((expense: ExpenseType) => {
                    expense.settled = true;

                    return axios.patch(`${constants.API_URL}/expenses/${expense.id}`, expense);
                }));

                this.$emit('expenses:settled');
                this.loading = false;
                this.dialog = false;

                // show success message
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
