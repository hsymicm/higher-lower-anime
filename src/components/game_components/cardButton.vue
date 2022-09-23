<template>
    <button class="higherlower-button">
        {{ label }}<font-awesome-icon :class="[isHigher ? 'text-green' : 'text-red', 'ml-4']" :icon="isHigher? 'caret-up' : 'caret-down'"  :transform="isHigher? 'down-1' : 'up-1'" size="xl" />
    </button>
</template>

<script>
export default {
    props: {
        label : {
            type : String,
            default : "Text",
        },
        isHigher : Boolean,
    }
}
</script>