<template>
    <div>
        <skeleton-table v-if="loading" />
        <q-table
            v-else
            title="Expenses"
            :rows="expenses"
            :columns="columns"
            row-key="name"
        >
            <template #top>
                <div class="text-h6">Expenses</div>
                <q-space />
                <new-expense-dialog
                    class="q-ml-sm"
                    @expense:saved="getExpenses"
                />
            </template>
            <template #bottom>
                <q-space />
                <settle-expenses-dialog
                    :expenses="expenses"
                    :users="users"
                    @expenses:settled="getExpenses"
                />
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from 'axios';
import SettleExpensesDialog from '../components/SettleExpensesDialog.vue';
import NewExpenseDialog from '../components/NewExpenseDialog.vue';
import SkeletonTable from '../components/skeleton/SkeletonTable.vue';
import ExpenseModel from "../models/ExpenseModel";
import UserType from "../types/UserType";
import ExpenseType from "../types/ExpenseType";
import constants from "../constants";

export default defineComponent({
    components: {
        SettleExpensesDialog,
        NewExpenseDialog,
        SkeletonTable,
    },
    data: () => ({
        loading: false,
        expenses: [] as ExpenseType[],
        users: [] as UserType[],
    }),
    computed: {
        columns(): any[] {
            return [
                {
                    name: 'name',
                    required: true,
                    label: 'Name',
                    align: 'left',
                    field: 'name',
                },
                {
                    name: 'amount',
                    required: true,
                    label: 'Amount',
                    field: 'amount',
                    format: (value: string) => `${value} €`,
                },
                {
                    name: 'username',
                    required: true,
                    label: 'Full name',
                    field: 'username',
                },
            ];
        },
    },
    mounted() {
        this.loading = true;

        setTimeout(async () => {
            await Promise.all([
                this.getExpenses(),
                this.getUsers(),
            ]);

            this.loading = false;
        }, 1000);
    },
    methods: {
        getExpenses() {
            return axios.get(`${constants.API_URL}/expenses`, {
                params: {
                    settled: false,
                },
            }).then(({ data }) => {
                this.expenses = data.map((expense: ExpenseType) => new ExpenseModel(expense));
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
    },
});
</script>
