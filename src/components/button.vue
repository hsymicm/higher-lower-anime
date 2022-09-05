<template>
    <button :class="[isHigherLower ? 'higherlower-button' : (isSecondary ? 'secondary-button' : 'primary-button')]">
        {{ label }}<font-awesome-icon :class="[isHigher ? 'text-green' : 'text-red', isHigherLower ? '' : 'hidden', 'ml-4']" :icon="isHigher? 'caret-up' : 'caret-down'"  :transform="isHigher? 'down-1' : 'up-1'" size="xl" />
    </button>
</template>

<script>
export default {
    props: {
        label : {
            type : String,
            default : "Label",
        },
        isPrimary : {
            type : Boolean,
            default : true,
        },
        isSecondary : {
            type : Boolean,
            default : false,
        },
        isHigherLower : {
            type : Boolean,
            default : false,
        },
        isHigher : Boolean,
    }
}
</script>