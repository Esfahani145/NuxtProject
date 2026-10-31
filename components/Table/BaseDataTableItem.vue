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

    <span v-else-if="column.type === 'price'" class="table-price-cell">
        <v-icon x-small color="success" class="ml-1">mdi-cash</v-icon>
        <span class="font-weight-bold">
            {{ $helper.formatPrice(getValue) }}
        </span>
        <span class="table-price-unit">
            تومان
        </span>
    </span>

    <v-chip
        v-else-if="column.type === 'chip'"
        small
        color="primary"
        text-color="white"
        class="table-badge-chip"
    >
        {{ getValue }}
    </v-chip>

    <v-chip
        v-else-if="column.type === 'boolean'"
        small
        :color="getValue ? 'succes' : 'error'"
        text-color="white"
        :class="['table-status-chip', getValue ? 'status-active' : 'status-inactive']"
    >
        <v-icon left x-small>
            {{ getValue ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
        {{ getValue ? 'فعال' : 'غیرفعال' }}
    </v-chip>


    <div v-else-if="column.type === 'actions'" class="d-flex align-center justify-center">
        <v-menu v-if="availableActions.length" offset-y left>
            <template v-slot:activator="{ on, attrs }">
                <BaseButton
                    icon
                    text
                    small
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
                            {{ action_icons[action] }}
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>
                        {{ action_labels[action] }}
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
            action_labels: {
                view: 'مشاهده',
                edit: 'ویرایش',
                delete: 'حذف'
            },

            action_icons: {
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
            const configured_actions = typeof this.column.actions === 'function' ? this.column.actions(this.item) : this.column.actions

            if (Array.isArray(configured_actions)) {
                return configured_actions.filter(action => ['view', 'edit', 'delete'].includes(action))
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