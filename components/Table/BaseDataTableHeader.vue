<template>
    <div class="filter-cell-wrapper">        
        <div v-if="column.filterable === false" class="filter-column-title">
            <v-icon v-if="column.icon" small>{{ column.icon }}</v-icon>
            <span>{{ column.text }}</span>
        </div>

        <BaseInput
            v-if="column.filterable !== false && (!column.filterType || column.filterType === 'text')"
            :value="value"
            dense
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
            dense
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
                    flat
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
                    flat
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
                    <div class="date-range-fields" >
                        <BaseButton
                            icon
                            c-class="date-filter-icon-button"
                            @click.stop="applyDateFilter"
                        >
                            <v-icon size="24">
                                mdi-magnify
                            </v-icon>
                        </BaseButton>

                        <BaseDatePicker
                            ref="fromDatePicker"
                            :value="value && value.from ? value.from : ''"
                            placeholder="از تاریخ"
                            dense
                            flat
                            class="compact-field date-picker-field uniform-filter"
                            :disabled="column.filterDisabled"
                            :clearable="column.filterClearable !== false"
                            @click.stop
                            @input="handleFromDateInput"
                            @keyup.enter.native="applyDateFilter"
                        />

                        <BaseDatePicker
                            ref="toDatePicker"
                            :value="value && value.to ? value.to : ''"
                            placeholder="تا تاریخ"
                            dense
                            flat
                            class="compact-field date-picker-field uniform-filter"
                            :disabled="column.filterDisabled"
                            :clearable="column.filterClearable !== false"
                            @click.stop
                            @input="handleToDateInput"
                            @keyup.enter.native="applyDateFilter"
                        />
                            <BaseButton
                                icon
                                c-class="date-filter-icon-button"
                                @click.stop="resetDateFilter"
                            >
                                <v-icon size="20">
                                    mdi-filter-remove-outline
                                </v-icon>
                            </BaseButton>
                    </div>
                </template>
            </template>
        </div>

        <BaseSelect
            v-else-if="column.filterable !== false && column.filterType === 'select'"
            :value="value"
            :items="column.filterOptions || []"
            flat
            :placeholder="column.filterPlaceholder || column.text"
            :clearable="column.filterClearable !== false"
            :disabled="column.filterDisabled"
            prepend-inner-icon="mdi-filter-variant"
            :menu-props="dateMenuProps"
            class="compact-field select-field date-type-select uniform-filter"
            @click.stop
            @input="handleSelectFilter"
            @keyup.enter.native="$emit('apply-filter')"
            @click:prepend-inner.stop="$emit('apply-filter')"
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

    watch: {
        value: {
            deep: true,
            handler(value) {
                if (value && typeof value === 'object' && value.type) {
                    this.dateFilterType = value.type
                    this.showSelectList = false
                } else {
                    this.dateFilterType = ''
                    this.showSelectList = true
                }
            }
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
                contentClass: 'base-select-menu',
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

            const columnKey = typeof this.column.value === 'function'
                ? (this.column.key || this.column.text)
                : this.column.value

            this.$emit('filter-type-change', {columnKey, type})
            this.$emit('input', { type, from: '', to: '' })

            this.$nextTick(() => {
                const target_picker = type === 'between'
                    ? this.$refs.fromDatePicker
                    : this.$refs.datePicker

                if (target_picker) {
                    target_picker.openDatePicker()
                }
            })
        },

        handleSelectFilter(selectedValue) {
            this.$emit('input', selectedValue)
        },

        toggleSelectList() {
            if (this.dateFilterType === 'between') {
                this.resetDateFilter()
                return
            }
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
            const column_key = typeof this.column.value === 'function' ? (this.column.key || this.column.text) : this.column.value
            this.dateFilterType = ''
            this.showSelectList = true
            this.$emit('filter-type-change', {columnKey: column_key, type: ''})
            this.$emit('input', {type: '' ,  from: '',  to: ''})
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
            const pervious_to = (this.value && this.value.to) || ''
            
            const new_value = {
                type: 'between',
                from: date,
                to: pervious_to
            }

            this.$emit('input', new_value)
            if (date && !pervious_to) {
                this.$nextTick(() => {
                    if (this.$refs.toDatePicker) {
                        this.$refs.toDatePicker.openDatePicker()
                    }
                })
            }
        },

        handleToDateInput(date) {
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 9px;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 8px 7px;
    box-sizing: border-box;
}

.filter-cell-wrapper ::v-deep .v-input {
    width: 100%;
    min-width: 0;
    margin-top: 0;
    font-size: 13px;
}

.filter-cell-wrapper ::v-deep .v-input__control {
    min-height: 38px;
}

.filter-cell-wrapper ::v-deep .v-input__slot {
    border-radius: 8px !important;
}

.filter-column-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    width: 100%;
    min-height: 22px;
    font-size: 13px;
    font-weight: 800;
    white-space: nowrap;
}

.date-filter-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0 auto;
    box-sizing: border-box;
}

.date-filter-wrapper .date-picker-field,
.date-filter-wrapper .date-type-select {
    flex: 1 1 0;
    width: 0 !important;
    min-width: 0;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
}

.date-filter-wrapper.date-filter-between {
    height: 40px;
    margin: 0;
}

.date-range-fields {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    height: 40px;
    min-width: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.date-range-fields .date-picker-field {
    flex: 1 1 0;
    align-self: center;
    width: 0 !important;
    min-width: 0 !important;
    max-width: none !important;
    height: 40px;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box;
}

.date-range-fields .date-picker-field ::v-deep .v-input,
.date-range-fields .date-picker-field ::v-deep .v-input__control,
.date-range-fields .date-picker-field ::v-deep .v-input__slot {
    width: 100%;
    min-width: 0;
    margin: 0 !important;
    box-sizing: border-box;
}

.date-range-fields .date-picker-field ::v-deep .v-input {
    padding: 0 !important;
}

.date-range-fields .date-picker-field ::v-deep .v-input__slot {
    padding: 0 6px !important;
}

.date-range-fields .date-picker-field ::v-deep .v-text-field__details {
    display: none !important;
}

.date-range-fields .date-picker-field ::v-deep .v-text-field__control {
    margin: 0 !important;
}

.date-range-fields ::v-deep .date-filter-icon-button {
    flex: 0 0 32px;
    width: 32px;
    min-width: 32px;
    height: 36px;
    margin: 0;
    padding: 0;
}

.date-filter-icon-button {
    display: inline-flex;
    flex: 0 0 32px;
    align-items: center;
    justify-content: center;
    width: 32px;
    min-width: 32px;
    height: 36px;
    margin: 0;
    padding: 0;
    font-size: 20px;
}
</style>
