<template>
    <v-card class="d-flex flex-column justify-space-between w-100 pa-6 rounded-2xl elevation-2 position-relative h-100">
        <div
            v-if="product.badge"
            class="compact-badge position-absolute rounded-pill font-weight-bold grey lighten-3 blue-grey--text text--darken-4 px-3 py-1 font-size-12"
        >
            {{ product.badge }}
        </div>

        <div class="d-flex flex-column flex-grow-1 w-100 pt-8">
            <div class="d-flex align-center mb-4">
                <v-avatar color="blue lighten-5" size="52" class="ml-4 icon-avatar-box flex-shrink-0">
                    <v-icon color="blue darken-1" size="26">{{ product.icon || 'mdi-cube-outline' }}</v-icon>
                </v-avatar>
                <div class="overflow-hidden">
                    <h3 class="font-weight-bold mb-1 text-truncate blue-grey--text text--darken-4 ">
                        {{ product.name }}
                    </h3>
                    <span class="font-weight-bold d-block text-truncate blue--text text--darken-1 font-size-14">
                        {{ product.category || 'سرویس سازمانی' }}
                    </span>
                </div>
            </div>

            <p class="card-desc mb-6 font-weight-regular flex-grow-1 blue-grey--text text--darken-4 line-clamp-3">
                {{ product.description }}
            </p>

            <div v-if="product.features && product.features.length" class="mb-6">
                <div v-for="(feat, featureIndex) in product.features" :key="featureIndex" class="d-flex align-center mb-2 font-weight-medium blue-grey--text text--darken-4">
                    <v-icon small color="success" class="ml-2 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-truncate">{{ feat }}</span>
                </div>
            </div>
        </div>

        <div class="mt-auto">
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center justify-space-between">
                <div>
                    <span class="d-block font-weight-bold blue-grey--text text--lighten-1">تعرفه سرویس</span>
                    <span class="font-weight-black blue-grey--text text--darken-4">{{ product.price ? $helper.formatPrice(product.price) : 'تماس بگیرید' }}</span>
                </div>

                <BaseButton
                    v-if="showRemoveFavorite"
                    icon
                    color="error"
                    elevation="0"
                    c-class="ml-2 rounded-lg"
                    @click="$emit('remove-favorite', product)"
                    :x-large="false"
                    :block="false"
                >
                    <v-icon>mdi-heart-remove-outline</v-icon>
                </BaseButton>

                <BaseButton
                    color="primary"
                    elevation="0"
                    :block="false"
                    :x-large="false"
                    c-class="font-weight-bold px-4 rounded-lg"
                    @click="$emit('product_click', product.id)"
                >
                    مشاهده محصول
                    <v-icon small class="mr-1">mdi-arrow-left</v-icon>
                </BaseButton>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            // required: true
            default: () => ({})
        },
        showRemoveFavorite: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.icon-avatar-box {
    border: 1px solid #bfdbfe !important;
}

.card-desc {
    line-height: 1.6;
    min-height: 4.8em;
}

.compact-badge {
    top: 16px;
    right: 24px;
    width: fit-content;
    white-space: nowrap;
    border: 1px solid #cbd5e1 !important;
    line-height: 1.2;
}
</style>