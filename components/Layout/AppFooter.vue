<template>
    <v-footer padless color="transparent" class="mt-auto pa-0">
        <v-card flat tile width="100%" class="glass-footer text-center py-4">
            <v-container class="py-0">
                <div dir="rtl" class="d-flex flex-column flex-md-row align-center justify-space-between white--text">
                    <div class="mb-2 mb-md-0 font-weight-medium">
                        تمامی حقوق این سیستم محفوظ است © {{ current_year }}
                    </div>

                    <div class="d-flex align-center">
                        <NuxtLink to="/products" class="white--text text-decoration-none mx-2 hover-link">
                            فروشگاه
                        </NuxtLink>
                        <span class="grey--text text--lighten-1">•</span>
                        <NuxtLink to="/news" class="white--text text-decoration-none mx-2 hover-link">
                            اخبار
                        </NuxtLink>
                    </div>
                </div>
            </v-container>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: 'AppFooter',

    data() {
        return {
            current_year: new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
.glass-footer {
    background-color: #0f172a !important;
    border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.hover-link {
    transition: color 0.2s ease;
}

.hover-link:hover {
    color: #3b82f6 !important;
}
</style>