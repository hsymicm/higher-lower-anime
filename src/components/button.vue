<template>
    <button :class="[isSecondary ? 'secondary-button' : 'primary-button',]">
        <p v-if="label">{{ label }}</p><font-awesome-icon v-if="logoType" :class="[logoColor ?? '', 'h-full']" :icon="logoType" />
    </button>
</template>

<script>
export default {
    props: {
        label : String,
        isPrimary : {
            type : Boolean,
            default : true,
        },
        isSecondary : {
            type : Boolean,
            default : false,
        },
        logoType : {
            type : String,
            default : undefined,
        },
        logoColor : {
            type : String,
            default: undefined,
        }
    }
}
</script>