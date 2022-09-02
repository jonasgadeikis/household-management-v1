<template>
    <div>
        <q-btn
            color="primary"
            rounded
            no-caps
            @click="dialog = true"
        >
            New expense
        </q-btn>
        <q-dialog v-model="dialog">
            <q-card class="dialog-width">
                <q-card-section>
                    <div class="text-h6">New expense</div>
                </q-card-section>
                <q-card-section>
                    <q-input
                        v-model="expense.name"
                        outlined
                        label="Expense name"
                        class="q-mb-md"
                    />
                    <q-input
                        v-model.number="expense.amount"
                        outlined
                        label="Expense amount"
                        type="number"
                    />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                        color="primary"
                        no-caps
                        rounded
                        :loading="loading"
                        :disable="!expense.name || !expense.amount"
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
import { defineComponent } from "vue";
import axios from "axios";
import UserType from "../types/UserType";
import ExpenseType from "../types/ExpenseType";
import ExpenseModel from "../models/ExpenseModel";
import constants from "../constants";

export default defineComponent({
    emits: [
        'expense:saved',
    ],
    data: () => ({
        dialog: false,
        loading: false,
        user: {
            id: 1,
            name: 'User 1',
            active: true,
            roles: [],
        } as UserType,
        expense: new ExpenseModel() as ExpenseType,
    }),
    methods: {
        save(): void {
            this.loading = true;
            this.expense.username = this.user.name;

            setTimeout(() => {
                axios.post(`${constants.API_URL}/expenses`, this.expense).then(() => {
                    this.expense = new ExpenseModel();

                    this.$emit('expense:saved');
                    this.dialog = false;
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
    width: 600px;
    max-width: 600px;
}
</style>
