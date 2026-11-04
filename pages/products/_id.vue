
<template>
    <div class="create-item-page pa-4 pa-md-6">
        <BaseHero
            type="users"
            variant="animated"
            title="ویرایش اطلاعات محصول"
            badge-text="مدیریت محصولات"
            icon="mdi-package-variant"
            base-icon="mdi-text-box-multiple"
            subtitle="اطلاعات محصول را ویرایش کنید"
        />

        <ProductForm
            :product-id="$route.params.id"
        />
    </div>
</template>

<script>
import BaseHero from '~/components/Hero/BaseHero.vue'
import ProductForm from '~/components/Products/ProductForm.vue'

export default {
    name: 'EditProductPage',

    components: {
        BaseHero,
        ProductForm
    }
}
</script>
