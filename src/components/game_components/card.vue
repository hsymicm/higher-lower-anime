<script>
import buttonTemplate from "../button.vue"
import gsap from "gsap"

export default {
    data() {
        return {
            choiceState : true,
            type : {
                "Popularity" : 'views',
                "Favorites" : 'likes',
                "Score" : ''
            },
            tweened : 0,
            number : 0,
        }
    },
    watch : {
        number(val) {
            gsap.to(this, { duration: 0.5, tweened: Number(val) || 0})
        }
    },
    methods : {
        setState(bool) {
            this.choiceState = !this.choiceState
            if(bool) this.$emit('choiceButtonClicked', 'higher')
            else this.$emit('choiceButtonClicked', 'lower')
        },
        formatNum(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
        },
        handleTitle(dict) {
            const title = dict.title.english === null ? dict.title.romaji : dict.title.english
            const length = 80
            return title.length > length ? dict.synonyms[0] : title
        }, 

    },
    components :{
        buttonTemplate,
    },
    props: {
        animeTitle : {
            type: Object,
            required: true,
        },
        dataNumber : {
            type: Number,
            default : 999999
        },
        imgSource : String,
        hideButton : {
            type: Boolean,
            default: true,
        },
        showData : {
            type: Boolean,
            default : true,
        },
        dataType : {
            type: String,
            default: 'Popularity'
        }
    },
}
</script>

<template>
    <div class="rounded-3xl bg-slate h-[38rem]">
        <div class="relative rounded-t-3xl w-[25rem] h-[32rem]">
            <div class="absolute bottom-0 left-0 z-20 px-10 py-8">
                <p class=" text-white font-bold text-2xl leading-relaxed">
                    {{ handleTitle(animeTitle) }}
                </p>
            </div>

            <div class="absolute opacity-75 
            bg-gradient-to-t from-slate-dark via-transparent to-transparent 
            z-10 h-full w-full"></div>

            <img class="absolute rounded-t-3xl 
            w-[25rem] h-[32rem] object-cover" 
            :src="imgSource" alt="coverImg">

        </div>
        <div class="w-[25rem] h-24 px-10">
            <div class="relative top-[50%] translate-y-[-50%]">
                <div v-if="!showData && choiceState" class="flex flex-row justify-center">
                    <buttonTemplate v-on:click="setState(true)" class="m-3" v-bind:isHigherLower="true" label="Higher" v-bind:isHigher="true" />
                    <buttonTemplate v-on:click="setState(false)" class="m-3" v-bind:isHigherLower="true" label="Lower" />
                </div>

                <transition
                    enter-active-class="duration-300 ease-out"
                    enter-from-class="transform opacity-0"
                    leave-active-class="duration-300 ease-in"
                    leave-to-class="transform opacity-0"
                >
                    <p v-if="showData || !choiceState" class="text-2xl text-white font-semibold">
                        Popularity: 
                        <span v-bind="this.number = dataNumber" class="text-green">
                            {{ formatNum(tweened.toFixed(0)) }} views
                        </span>
                    </p>
                </transition>
            </div>
        </div>
    </div>
</template>
