<template>
    <v-card class="d-flex flex-column justify-space-between w-100 pa-6 rounded-2xl elevation-2 position-relative h-100 white-news-card">
        <div class="overflow-hidden rounded-lg mb-5">
            <v-img :src="item.image" height="180" cover alt="تصویر خبر" class="rounded-lg">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
            <div class="d-flex justify-end mt-2">
                <span class="news-category-badge rounded-pill font-weight-bold text-body-2 white--text px-3 py-1">
                    {{ item.category || 'اطلاعیه' }}
                </span>
            </div>
        </div>
        <div class="d-flex flex-column flex-grow-1">
            <div class="d-flex align-center mb-4 text-body-2 font-weight-medium blue-grey--text text--darken-2">
                <div class="d-flex align-center ml-4">
                    <v-icon small color="#64748b" class="ml-1">mdi-calendar-month-outline</v-icon>
                    <span>{{ item.date || '۱۵ شهریور ۱۴۰۳' }}</span>
                </div>
                <div class="d-flex align-center">
                    <v-icon small color="#64748b" class="ml-1">mdi-clock-outline</v-icon>
                    <span>{{ item.readTime || '۲ دقیقه مطالعه' }}</span>
                </div>
            </div>
            <h3 class="font-weight-bold text-subtitle-1 mb-3 overflow-hidden blue-grey--text text--darken-4 news-title">
                {{ item.title }}
            </h3>
            <p class="font-weight-regular text-body-1 mb-6 blue-grey--text text--darken-3 line-clamp-3 news-excerpt">
                {{ item.excerpt || item.description }}
            </p>
        </div>
        <div class="mt-auto">
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center font-weight-bold blue-grey--text text--darken-2">
                    <v-icon small color="#64748b" class="ml-1">mdi-account-circle-outline</v-icon>
                    {{ item.auth }}
                </div>
                <BaseButton
                    color="#0f172a"
                    elevation="0"
                    :block="false"
                    :x-large="false"
                    c-class="white--text font-weight-bold px-4 rounded-lg"
                    @click="$emit('news_click', item.id)"
                >
                    ادامه مطلب
                    <v-icon small class="mr-1">mdi-arrow-left</v-icon>
                </BaseButton>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'NewsCard',
    props: {
        item: {
            type: Object,
            // required: true
            default: () => ({})
        }
    }
}
</script>

<style scoped>
.news-title {
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 3em;
}

.news-excerpt {
    line-height: 1.6;
    text-overflow: ellipsis;
    min-height: 4.8em;
}

.news-category-badge {
    background-color: #0f172a;
    line-height: 1.2;
    display: inline-block;
}
</style>