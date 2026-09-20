<template>
    <v-btn
        :absolute="absolute"
        :active-class="activeClass"
        :block="block"
        :bottom="bottom"
        :color="color"
        :depressed="depressed"
        :disabled="disabled"
        :elevation="elevation"
        :fixed="fixed"
        :height="height"
        :left="left"
        :loading="loading"
        :max-height="maxHeight"
        :max-width="maxWidth"
        :min-height="minHeight"
        :min-width="minWidth"
        :outlined="outlined"
        :plain="plain"
        :right="right"
        :rounded="rounded"
        :shaped="shaped"
        :target="target"
        :text="text"
        :tile="tile"
        :small="small"
        :to="to"
        :top="top"
        :type="type"
        :width="width"
        :x-large="xLarge"
        :x-small="xSmall"
        :class="[{ 'white--text': whiteText }, 'text-none', cClass]"
        @click="$emit('click', $event)"
    >
        <slot></slot>
    </v-btn>
</template>

<script>
export default {
    name: 'BaseButton',

    props: {
        absolute: { 
            type: Boolean, 
            default: false 
        },
        fixed: {
            type: Boolean, 
            default: false 
        },
        small: { 
            type: Boolean, 
            default: false 
        },
        top: { 
            type: Boolean, 
            default: false 
        },
        bottom: { 
            type: Boolean, 
            default: false 
        },
        left: { 
            type: Boolean, 
            default: false 
        },
        right: { 
            type: Boolean, 
            default: false 
        },
        target: { 
            type: String, 
            default: undefined 
        },
        to: {
            type: [String, Object], 
            default: undefined 
        },
        color: { 
            type: String, 
            default: 'orange darken-4' 
        },
        activeClass: { 
            type: String, 
            default: undefined 
        },
        outlined: { 
            type: Boolean, 
            default: false 
        },
        plain: { 
            type: Boolean, 
            default: false 
        },
        rounded: { 
            type: Boolean, 
            default: true 
        },
        elevation: { 
            type: [Number, String], 
            default: undefined },
        shaped: { 
            type: Boolean, 
            default: false 
        },
        text: { 
            type: Boolean, 
            default: false 
        },
        tile: { 
            type: Boolean, 
            default: false 
        },
        depressed: { 
            type: Boolean, 
            default: true 
        },
        block: { 
            type: Boolean, 
            default: true 
        },
        xLarge: { 
            type: Boolean, 
            default: true 
        },
        xSmall: {
            type: Boolean, 
            default: false 
        },
        height: { 
            type: [Number, String], 
            default: undefined 
        },
        width: { 
            type: [Number, String], 
            default: undefined 
        },
        maxHeight: { 
            type: [Number, String], 
            default: undefined 
        },
        maxWidth: { 
            type: [Number, String], 
            default: undefined 
        },
        minHeight: { 
            type: [Number, String], 
            default: undefined 
        },
        minWidth: { 
            type: [Number, String], 
            default: undefined 

        },
        disabled: { 
            type: Boolean, 
            default: false 

        },
        loading: { 
            type: Boolean, 
            default: false 

        },
        type: { 
            type: String, 
            default: 'button' 

        },
        cClass: { 
            type: [String, Array, Object], 
            default: '' 

        },
        whiteText: {
            type: Boolean, 
            default: true 

        }
    }
}
</script>