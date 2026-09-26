<template>
    <div class="clean-tech-bg">
        <div class="grid-pattern"></div>

        <div class="circuit-ring ring-1"></div>
        <div class="circuit-ring ring-2"></div>

        <div class="dark-shape shape-left">
            <v-icon size="240" color="background">mdi-cloud-lock-outline</v-icon>
        </div>

        <div class="dark-shape shape-right">
            <v-icon size="260" color="background">mdi-database-network-outline</v-icon>
        </div>

        <div class="dark-shape shape-top-right">
            <v-icon size="180" color="background">mdi-shield-check-outline</v-icon>
        </div>

        <div class="content-relative">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppBackground'
}
</script>

<style scoped>
.clean-tech-bg {
    position: relative;
    background-color: #f8fafc;
    min-height: calc(100vh - 120px);
    width: 100%;
    overflow: hidden;
}

.grid-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(#1e293b 1.6px, transparent 1.6px),
        linear-gradient(to right, rgba(30, 41, 59, 0.06) 1px, transparent 1px);
    background-size: 28px 28px, 56px 56px;
    opacity: 0.85;
    pointer-events: none;
    z-index: 1;
}

.circuit-ring {
    position: absolute;
    border: 2px dashed rgba(30, 41, 59, 0.22);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
}

.ring-1 {
    width: 680px;
    height: 680px;
    top: -180px;
    right: 3%;
}

.ring-2 {
    width: 600px;
    height: 600px;
    bottom: -160px;
    left: 3%;
}

.dark-shape {
    position: absolute;
    opacity: 0.16;
    pointer-events: none;
    z-index: 1;
}

.shape-left {
    top: 80px;
    left: 3%;
    transform: rotate(-12deg);
}

.shape-right {
    bottom: 60px;
    right: 3%;
    transform: rotate(12deg);
}

.shape-top-right {
    top: 40px;
    right: 12%;
    transform: rotate(15deg);
}

.content-relative {
    position: relative;
    z-index: 2;
}
</style>