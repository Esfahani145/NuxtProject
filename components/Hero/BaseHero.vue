<template>
    <v-card class="dark-gradient-banner rounded-xl overflow-hidden mb-8 elevation-3 position-relative" :class="{ 'user-hero-card': type === 'users' && variant === 'animated' }">
        <div v-if="variant === 'animated' && type !== 'users'" class="hero-motion-layer" aria-hidden="true">
            <div class="hero-motion-orbit hero-motion-orbit--one"></div>
            <div class="hero-motion-orbit hero-motion-orbit--two"></div>

            <div class="hero-motion-icon hero-motion-icon--one">
                <v-icon color="#93c5fd" size="26">
                    {{ type === 'products' ? 'mdi-cloud-outline' : 'mdi-newspaper-variant-outline' }}
                </v-icon>
            </div>

            <div class="hero-motion-icon hero-motion-icon--two">
                <v-icon color="#6ee7b7" size="24">
                    {{ type === 'products' ? 'mdi-server-outline' : 'mdi-bell-outline' }}
                </v-icon>
            </div>

            <div class="hero-motion-icon hero-motion-icon--three">
                <v-icon color="#c4b5fd" size="22">
                    {{ type === 'products' ? 'mdi-shield-check-outline' : 'mdi-bullhorn-outline' }}
                </v-icon>
            </div>
        </div>


        <template v-if="type === 'users' && variant === 'animated'">
            <div class="user-hero-pattern"></div>

            <v-row align="center" class="user-hero-content" no-gutters>
                <v-col cols="12" md="8" class="pa-5 pa-md-8">
                    <div class="hero-breadcrumb mb-6">
                        <v-icon small color="blue lighten-3">
                            mdi-view-dashboard-outline
                        </v-icon>
                        <span>پنل مدیریت</span>
                        <v-icon x-small>mdi-chevron-left</v-icon>
                        <span>مدیریت کاربران</span>
                        <v-icon x-small>mdi-chevron-left</v-icon>
                        <span class="user-breadcrumb-current">
                            {{ title || 'ایجاد کاربر جدید' }}
                        </span>
                    </div>

                    <div class="d-flex align-center mb-4">
                        <div class="user-hero-icon">
                            <v-icon color="white" size="32">
                                mdi-account-plus-outline
                            </v-icon>
                        </div>

                        <div class="mr-4">
                            <h1 class="user-hero-title font-size-24 mb-2">
                                {{ title || 'ایجاد کاربر جدید' }}
                            </h1>
                            <p class="user-hero-subtitle mb-0">
                                {{ subtitle || 'اطلاعات موردنیاز را وارد کنید تا حساب کاربری جدید ایجاد شود.' }}
                            </p>
                        </div>
                    </div>

                    <div class="user-hero-meta mt-6">
                        <span>
                            <v-icon small color="avatar">mdi-shield-check-outline</v-icon>
                            ثبت اطلاعات در سامانه
                        </span>
                        <span>
                            <v-icon small color="avatar">mdi-form-select</v-icon>
                            فرم اطلاعات کاربر
                        </span>
                    </div>
                </v-col>

                <v-col cols="12" md="4" class="px-5 pb-5 pa-md-4">
                    <div class="user-hero-illustration">
                        <div class="user-illustration-orbit"></div>
                        <div class="user-illustration-orbit user-illustration-orbit--two"></div>

                        <div class="user-illustration-main-icon">
                            <v-icon color="white" size="76">
                                mdi-account-details-outline
                            </v-icon>
                        </div>

                        <div class="user-floating-icon user-floating-icon--one">
                            <v-icon color="#60a5fa" size="24">
                                mdi-account-check-outline
                            </v-icon>
                        </div>

                        <div class="user-floating-icon user-floating-icon--two">
                            <v-icon color="#34d399" size="24">
                                mdi-shield-check-outline
                            </v-icon>
                        </div>

                        <div class="user-floating-icon user-floating-icon--three">
                            <v-icon color="#d97706" size="23">
                                mdi-card-account-details-outline
                            </v-icon>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </template>

        <v-row v-else no-gutters align="center" class="flex-row-reverse hero-standard-content">
            <v-col v-if="type === 'products'" cols="12" md="5" class="d-flex justify-center align-center pa-4 pa-md-0 position-relative overflow-hidden">
                <div class="hero-image-container">
                    <v-img
                        src="/images/background.png"
                        height="100%"
                        width="100%"
                        cover
                        alt="کاور سازمانی"
                        class="rounded-xl rounded-md-0"
                    />
                    <div class="hero-image-overlay position-absolute fill-height w-100 d-none d-md-block"></div>
                </div>
            </v-col>

            <v-col v-else cols="12" md="4" class="d-flex justify-center pa-6 pa-md-8">
                <v-avatar color="rgba(255, 255, 255, 0.05)" size="120" class="hero-icon-avatar">
                    <v-icon size="64" color="hero">
                        mdi-bullhorn-outline
                    </v-icon>
                </v-avatar>
            </v-col>

            <v-col cols="12" :md="type === 'products' ? 7 : 8" class="pa-6 pa-md-10">
                <div class="d-inline-flex align-center badge-chip px-3 py-1 rounded-pill mb-4">
                    <v-icon small color="hero" class="ml-2">
                        {{ type === 'products' ? 'mdi-shield-check' : 'mdi-newspaper-variant-outline' }}
                    </v-icon>

                    <span class="badge-text font-weight-bold">
                        {{
                            badgeText || (type === 'products' ? 'سرویس‌های ابری و زیرساخت' : 'اطلاع‌رسانی و رویدادها')
                        }}
                    </span>
                </div>

                <h1 class="hero-title white--text font-weight-black mb-4">
                    {{
                        title || (type === 'products' ? 'فروشگاه و لیست سرویس‌ها' : 'اخبار و اطلاعیه‌ها')
                    }}
                </h1>

                <p class="hero-subtitle grey--text text--lighten-4 mb-6 max-w-600">
                    {{
                        subtitle ||
                            (type === 'products'
                                ? 'ارائه برترین راهکارهای نرم‌افزاری و زیرساخت‌های ابری با بالاترین پایداری و امنیت.'
                                : 'آخرین به‌روزرسانی‌های امنیتی، ارتقای سرویس‌ها و اطلاعیه‌های رسمی سامانه را در این بخش دنبال کنید.')
                    }}
                </p>

                <div v-if="type === 'products'" class="search-box-container position-relative">
                    <div class="d-flex align-center search-row">
                        <BaseButton
                            color="info"
                            :depressed="false"
                            :elevation="0"
                            c-class="search-btn"
                            @click="$emit('search')"
                        >
                            <v-icon small>mdi-magnify</v-icon>
                        </BaseButton>

                        <BaseInput
                            :value="value"
                            placeholder="جستجو..."
                            dir="rtl"
                            variant="light"
                            clearable
                            :no-focus-style="true"
                            c-class="search-input"
                            @input="$emit('input', $event)"
                        />
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>


<script>
export default {
    name: 'BaseHero',

    props: {
        type: {
            type: String,
            default: 'products',
            validator: val => ['products', 'news', 'users'].includes(val)
        },
        value: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        },
        badgeText: {
            type: String,
            default: ''
        },
        variant: {
            type: String,
            default: 'default', validator: value => ['default', 'animated'].includes(value)
        }
    }
}
</script>

<style scoped>
.hero-image-container {
    height: 320px;
}

.badge-chip {
    background: rgba(59, 130, 246, 0.15) !important;
    border: 1px solid rgba(96, 165, 250, 0.3) !important;
}

.badge-text {
    color: #60a5fa !important;
}

.hero-title {
    line-height: 1.3 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
    line-height: 1.6 !important;
}

.hero-image-overlay {
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #0f172a 0%, rgba(15, 23, 42, 0.1) 100%);
}

.hero-icon-avatar {
    border: 1px dashed rgba(96, 165, 250, 0.3);
}

.search-box-container {
    z-index: 2;
    max-width: 520px;
}

.search-row {
    gap: 8px;
    direction: ltr;
}

.search-btn {
    border-radius: 12px !important;
    height: 48px !important;
    min-width: 48px !important;
    flex-shrink: 0;
    align-self: center;
}

.search-btn:hover {
    transform: translateY(-1px);
}

.search-box-container ::v-deep .search-input {
    flex: 1;
    min-width: 0;
    align-self: center;
}

.search-box-container ::v-deep .search-input .v-text-field__details {
    display: none !important;
}

.max-w-600 {
    max-width: 600px;
}

.user-hero-card {
    animation: user-fade-up 0.45s ease both;
}

.user-hero-pattern {
    position: absolute;
    top: -100px;
    left: 24%;
    width: 300px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    box-shadow:
        0 0 0 35px rgba(255, 255, 255, 0.025),
        0 0 0 70px rgba(255, 255, 255, 0.02);
    pointer-events: none;
}

.user-hero-content {
    position: relative;
    z-index: 1;
}

.hero-breadcrumb,
.user-hero-meta,
.user-hero-meta span {
    display: flex;
    align-items: center;
}

.hero-breadcrumb {
    flex-wrap: wrap;
    gap: 8px;
    color: #cbd5e1;
}

.user-breadcrumb-current,
.user-hero-title {
    color: #fff;
    font-weight: 800;
}

.user-hero-icon {
    display: grid;
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.1);
}

.user-hero-subtitle,
.user-hero-meta {
    color: #cbd5e1;
}

.user-hero-subtitle {
    line-height: 2;
}

.user-hero-meta {
    flex-wrap: wrap;
    gap: 20px;
}

.user-hero-meta span {
    gap: 6px;
}

.user-hero-illustration {
    position: relative;
    display: grid;
    height: 180px;
    place-items: center;
}

.user-illustration-orbit {
    position: absolute;
    width: 150px;
    height: 150px;
    border: 1px solid rgba(191, 219, 254, 0.25);
    border-radius: 50%;
}

.user-illustration-orbit--two {
    width: 120px;
    height: 120px;
    border-style: dashed;
    animation: user-rotate-orbit 28s linear infinite;
}

.user-illustration-main-icon {
    display: grid;
    width: 105px;
    height: 105px;
    place-items: center;
    border-radius: 25px;
    background: rgba(96, 165, 250, 0.25);
    transform: rotate(-5deg);
}

.user-floating-icon {
    position: absolute;
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 5px 15px rgba(2, 6, 23, 0.15);
    animation: user-float-icon 4s ease-in-out infinite;
}

.user-floating-icon--one {
    top: 8px;
    right: 12px;
}

.user-floating-icon--two {
    bottom: 8px;
    left: 5px;
    animation-delay: -1.5s;
}

.user-floating-icon--three {
    right: 0;
    bottom: 25px;
    animation-delay: -2.5s;
}

@keyframes user-fade-up {
    from {
        opacity: 0; 
        transform: translateY(10px);
    }
    to {
        opacity: 1; 
        transform: translateY(0);
    }
}

@keyframes user-float-icon {
    0%, 100% {transform: translateY(0);}
    50% {transform: translateY(-6px);}
}

@keyframes user-rotate-orbit {
    to {transform: rotate(360deg);}
}

.hero-motion-layer {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
}

.hero-standard-content {
    position: relative;
    z-index: 1;
}

.hero-motion-orbit {
    position: absolute;
    width: 260px;
    height: 260px;
    border: 1px solid rgba(147, 197, 253, 0.14);
    border-radius: 50%;
    pointer-events: none;
}

.hero-motion-orbit--one {
    top: -145px;
    right: 12%;
    box-shadow:
        0 0 0 28px rgba(147, 197, 253, 0.025),
        0 0 0 58px rgba(147, 197, 253, 0.02);
    animation: hero-orbit-float 9s ease-in-out infinite;
}

.hero-motion-orbit--two {
    right: 38%;
    bottom: -225px;
    width: 300px;
    height: 300px;
    border-style: dashed;
    animation: hero-orbit-rotate 35s linear infinite;
}

.hero-motion-icon {
    position: absolute;
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 24px rgba(2, 6, 23, 0.12);
    backdrop-filter: blur(8px);
    animation: hero-icon-float 4s ease-in-out infinite;
}

.hero-motion-icon--one {
    top: 22px;
    right: 48%;
}

.hero-motion-icon--two {
    right: 28%;
    bottom: 28px;
    animation-delay: -1.4s;
}

.hero-motion-icon--three {
    top: 42%;
    right: 5%;
    animation-delay: -2.3s;
}

.dark-gradient-banner {
    isolation: isolate;
}

@keyframes hero-icon-float {
    0%, 100% {transform: translateY(0) rotate(0);}
    50% {transform: translateY(-9px) rotate(3deg);}
}

@keyframes hero-orbit-float {
    0%, 100% {transform: translateY(0);}
    50% {transform: translateY(12px);}
}

@keyframes hero-orbit-rotate {
    to {transform: rotate(360deg);}
}

@media (prefers-reduced-motion: reduce) {
    .hero-motion-icon,
    .hero-motion-orbit { animation: none !important; }
}
</style>