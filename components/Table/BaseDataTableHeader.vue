<template>
    <div class="filter-cell-wrapper ">
        <BaseInput
            v-if="column.filterable !== false && (!column.filterType || column.filterType === 'text')"
            :value="value"
            hide-details
            dense
            outlined
            flat
            :placeholder="column.filterPlaceholder || column.text"
            :disabled="column.filterDisabled"
            :clearable="column.filterClearable !== false"
            prepend-inner-icon="mdi-magnify"
            class="compact-field uniform-filter"
            @click.stop
            @input="$emit('input', $event)"
            @keyup.enter.native="$emit('apply-filter')"
            @click:prepend-inner="$emit('apply-filter')"
        />

        <BaseInput
            v-else-if="column.filterable !== false && column.filterType === 'number'"
            :value="value"
            hide-details
            dense
            outlined
            flat
            :placeholder="column.filterPlaceholder || column.text"
            :disabled="column.filterDisabled"
            :clearable="column.filterClearable !== false"
            prepend-inner-icon="mdi-magnify"
            type="number"
            class="compact-field uniform-filter"
            @click.stop
            @input="$emit('input', $event)"
            @keyup.enter.native="$emit('apply-filter')"
            @click:prepend-inner="$emit('apply-filter')"
        />



        <div v-else-if="column.filterable !== false && column.filterType === 'date-range'" class="date-filter-wrapper" :class="{ 'date-filter-between': dateFilterType === 'between' }" @click.stop>
            <template v-if="showSelectList">
                <BaseSelect
                    ref="typeSelect"
                    :value="null"
                    :items="dateFilterOptions"
                    dense
                    outlined
                    flat
                    hide-details
                    placeholder="نوع فیلتر"
                    prepend-inner-icon="mdi-chevron-down"
                    :menu-props="dateMenuProps"
                    class="compact-field select-field date-type-select uniform-filter"
                    @click.stop
                    @input="handleSelectType"
                />
            </template>

            <template v-else>
                <BaseDatePicker
                    v-if="dateFilterType === 'equal' || dateFilterType === 'after' || dateFilterType === 'before'"
                    ref="datePicker"
                    :value="value && value.from ? value.from : ''"
                    placeholder="انتخاب تاریخ"
                    dense
                    outlined
                    flat
                    hide-details
                    class="compact-field date-picker-field uniform-filter"
                    prepend-inner-icon="mdi-chevron-down"
                    append-icon="mdi-magnify"
                    :disabled="column.filterDisabled"
                    :clearable="column.filterClearable !== false"
                    @click.stop
                    @input="handleSingleDateInput"
                    @keyup.enter.native="applyDateFilter"
                    @click:prepend-inner="toggleSelectList"
                    @click:append.stop="applyDateFilter"
                />

                <template v-else-if="dateFilterType === 'between'">
                    <BaseDatePicker
                        ref="fromDatePicker"
                        :value="value && value.from ? value.from : ''"
                        placeholder="از تاریخ"
                        dense
                        outlined
                        flat
                        hide-details
                        class="compact-field date-picker-field uniform-filter"
                        prepend-inner-icon="mdi-chevron-down"
                        append-icon="mdi-magnify"
                        :disabled="column.filterDisabled"
                        :clearable="column.filterClearable !== false"
                        @click.stop
                        @input="handleFromDateInput"
                        @keyup.enter.native="applyDateFilter"
                        @click:prepend-inner="toggleSelectList"
                        @click:append.stop="applyDateFilter"
                    />

                    <BaseDatePicker
                        ref="toDatePicker"
                        :value="value && value.to ? value.to : ''"
                        placeholder="تا تاریخ"
                        dense
                        outlined
                        flat
                        hide-details
                        class="compact-field date-picker-field uniform-filter"
                        prepend-inner-icon="mdi-chevron-down"
                        append-icon="mdi-magnify"
                        :disabled="column.filterDisabled"
                        :clearable="column.filterClearable !== false"
                        @click.stop
                        @input="handleToDateInput"
                        @keyup.enter.native="applyDateFilter"
                        @click:prepend-inner="toggleSelectList"
                        @click:append.stop="applyDateFilter"
                    />
                </template>
            </template>
        </div>

        <BaseSelect
            v-else-if="column.filterable !== false && column.filterType === 'select'"
            :value="value"
            :items="column.filterOptions || []"
            dense
            outlined
            flat
            hide-details
            :placeholder="column.filterPlaceholder || column.text"
            :clearable="column.filterClearable !== false"
            :disabled="column.filterDisabled"
            prepend-inner-icon="mdi-filter-variant"
            item-text="text"
            item-value="value"
            :menu-props="dateMenuProps"
            class="compact-field select-field date-type-select uniform-filter"
            @click.stop
            @input="$emit('input', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'BaseDataTableHeader',

    props: {
        header: {
            type: Object,
            default: () => ({})
        },
        column: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: [String, Number, Array, Boolean, Object],
            default: ''
        }
    },

    data() {
        return {
            dateFilterType: '',
            showSelectList: false
        }
    },

    computed: {
        dateFilterOptions() {
            return [
                { text: 'برابر با', value: 'equal' },
                { text: 'بعد از', value: 'after' },
                { text: 'قبل از', value: 'before' },
                { text: 'بین', value: 'between' }
            ]
        },

        dateMenuProps() {
            return {
                offsetY: true,
                closeOnContentClick: true,
                contentClass: 'base-select-menu date-filter-menu',
                maxHeight: 200
            }
        }
    },

    mounted() {
        if (this.value && typeof this.value === 'object' && this.value.type) {
            this.dateFilterType = this.value.type
            this.showSelectList = false
        } else {
            this.showSelectList = true
        }
    },

    methods: {
        handleSelectType(type) {
            if (!type) {
                this.showSelectList = true
                return
            }

            this.showSelectList = false
            this.dateFilterType = type
            this.$emit('input', {type, from: '', to: ''})

            this.$nextTick(() => {
                const target_picker = type === 'between'
                    ? this.$refs.fromDatePicker
                    : this.$refs.datePicker

                if (target_picker) {
                    target_picker.openDatePicker()
                }
            })
        },

        toggleSelectList() {
            this.showSelectList = !this.showSelectList
        },

        openCalendar() {
            if (this.$refs.datePicker) {
                this.$refs.datePicker.openDatePicker()
            }
        },

        openFromCalendar() {
            if (this.$refs.fromDatePicker) {
                this.$refs.fromDatePicker.openDatePicker()
            }
        },

        openToCalendar() {
            if (this.$refs.toDatePicker) {
                this.$refs.toDatePicker.openDatePicker()
            }
        },


        applyDateFilter() {
            this.$emit('apply-filter')
        },

        resetDateFilter() {
            this.$emit('input', {type: this.dateFilterType, from: '', to: ''})
            this.$emit('apply-filter')
        },

        handleSingleDateInput(date) {
            if (!date) {
                this.resetDateFilter()
                return
            }

            this.$emit('input', {
                type: this.dateFilterType,
                from: date,
                to: ''
            })
        },

        handleFromDateInput(date) {
            if (!date) {
                this.resetDateFilter()
                return
            }

            const newVal = {
                type: 'between',
                from: date,
                to: (this.value && this.value.to) || ''
            }

            this.$emit('input', newVal)

            if (!newVal.to) {
                this.$nextTick(() => {
                    if (this.$refs.toDatePicker) {
                        this.$refs.toDatePicker.openDatePicker()
                    }
                })
            }
        },

        handleToDateInput(date) {
            if (!date) {
                this.resetDateFilter()
                return
            }

            this.$emit('input', {
                type: 'between',
                from: (this.value && this.value.from) || '',
                to: date
            })
        }
    }
}
</script>

<style scoped>
.filter-cell-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
    padding: 2px 0;
    box-sizing: border-box;
}

.select-field {
    width: 100% !important;
    min-width: 0;
    box-sizing: border-box;
}

.date-filter-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    position: relative;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0 auto;
    box-sizing: border-box;
}

.date-filter-wrapper.date-filter-between {
    max-width: 100%;
}

.date-filter-wrapper .date-picker-field,
.date-filter-wrapper .date-type-select {
    flex: 1 1 0%;
    width: 0 !important;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
}
</style>