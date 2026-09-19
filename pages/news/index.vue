<template>
    <div class="light-news-page">
        <v-container fluid class="max-width-container py-8 px-4 px-md-8">
            <BaseHero type="news" />

            <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center">
                    <div class="blue-accent-line ml-3"></div>
                    <h2 class="text-h5 font-weight-bold grey--text text--darken-4">آخرین اطلاعیه‌ها</h2>
                </div>

                <span class="text-caption grey--text text--darken-1">تعداد اخبار: {{ newsList.length }}</span>
            </div>

            <v-row align="stretch">
                <v-col
                    v-for="(item, index) in newsList"
                    :key="item.id || index"
                    cols="12"
                    sm="6"
                    md="4"
                    class="d-flex"
                >
                    <NewsCard :item="item" @news_click="$goTo(`/news/${$event}`)" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import NewsCard from '~/components/News/NewsCard.vue'
import newsData from '~/static/data/data.json'

export default {
    name: 'NewsPage',

    components: {
        NewsCard
    },

    data() {
        return {
            newsList: newsData.newsList || []
        }
    },
}
</script>