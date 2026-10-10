<template>
    <v-img
        v-if="column.type === 'image'"
        :src="getValue"
        max-width="48"
        max-height="48"
        contain
        class="mx-auto"
    />

    <span v-else-if="column.type === 'product'" class="font-weight-bold slate-dark--text">
        {{ getValue }}
    </span>

    <span v-else-if="column.type === 'price'">
        <span class="font-weight-bold">
            {{ $helper.formatPrice(getValue) }}
        </span>

        <span> تومان </span>
    </span>

    <v-chip v-else-if="column.type === 'chip'" small color="primary" text-color="white">
        {{ getValue }}
    </v-chip>

    <v-icon v-else-if="column.type === 'boolean'" :color="getValue ? 'success' : 'error'">
        {{ getValue ? 'mdi-check-circle' : 'mdi-close-circle' }}
    </v-icon>

    <div v-else-if="column.type === 'actions'" class="d-flex align-center justify-center">
        <v-menu v-if="availableActions.length" offset-y left>
            <template v-slot:activator="{ on, attrs }">
                <BaseButton
                    icon
                    text
                    small
                    :block="false"
                    :x-large="false"
                    :white-text="false"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop
                >
                    <v-icon small>
                        mdi-dots-vertical
                    </v-icon>
                </BaseButton>
            </template>

            <v-list dense>
                <v-list-item v-for="action in availableActions" :key="action" @click.stop="handleAction(action)">
                    <v-list-item-icon>
                        <v-icon small>
                            {{ actionIcons[action] }}
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>
                        {{ actionLabels[action] }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>

    <span v-else>
        {{ getValue }}
    </span>
</template>

<script>
export default {
    name: 'BaseDataTableItem',

    props: {
        item: {
            type: Object,
            required: true
        },
        column: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            actionLabels: {
                view: 'مشاهده',
                edit: 'ویرایش',
                delete: 'حذف'
            },

            actionIcons: {
                view: 'mdi-eye',
                edit: 'mdi-pencil',
                delete: 'mdi-delete'
            }
        }
    },

    computed: {
        getValue() {
            if (typeof this.column.value === 'function') {
                return this.column.value(this.item)
            }

            return this.item[this.column.value]
        },

        availableActions() {
            const configuredActions = typeof this.column.actions === 'function' ? this.column.actions(this.item) : this.column.actions

            if (Array.isArray(configuredActions)) {
                return configuredActions.filter(action => ['view', 'edit', 'delete'].includes(action))
            }

            const actions = []
            if (this.column.showView) {
                actions.push('view')
            }

            if (this.column.showEdit) {
                actions.push('edit')
            }

            if (this.column.showDelete) {
                actions.push('delete')
            }
            return actions
        }
    },

    methods: {
        handleAction(action) {
            if (!this.availableActions.includes(action)) {
                return
            }

            this.$emit(action, this.item)
        }
    }
}
</script>