<script>
import buttonTemplate from "./button.vue";
export default {
    name: "Home",
    data() {
        return {
            highScore : 0,
        }
    },  
    components: {
        buttonTemplate,
    },
    props : {
        
    },
    mounted() {
        this.highScore = localStorage.getItem('highscore') || 0
    }
};
</script>

<template>
    <div class="absolute flex flex-col justify-center inset-x-0 inset-y-0 mx-auto mt-16 mb-32 scale-global">
        <div class="mx-auto">
            <img src="../assets/img/title.png" alt="Header Title" class="w-[22rem]" />
        </div>
        <p
            class="text-2xl leading-loose text-white text-center font-semibold mx-auto my-4"
        >
            High Score:<br /><span class="text-5xl">{{ highScore }}</span>
        </p>
        <buttonTemplate v-on:click="$emit('buttonStartClick')" class="mx-auto mt-10" label="Start" />
    </div>
</template>