<template>
    <v-row class="mb-8">
        <v-col v-for="(stat, i) in stats" :key="i" cols="12" sm="4">
            <v-card class="white-stat-card pa-5 rounded-xl elevation-1 d-flex align-center">
                <v-avatar color="avatar" size="52" class="ml-4 icon-avatar-box">
                    <v-icon color="accent" size="26">{{ stat.icon }}</v-icon>
                </v-avatar>
                <div>
                    <div class="font-weight-black slate-title-text">{{ stat.value }}</div>
                    <div class="font-weight-bold slate-sub-text">{{ stat.title }}</div>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ProductStats',
    props: {
        stats: {
            type: Array,
            // required: true,
            default: () => []
        }
    }
}
</script>

<style scoped>
.icon-avatar-box {
    border: 1px solid #bfdbfe !important;
}
</style>