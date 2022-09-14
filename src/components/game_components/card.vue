<script>
import buttonTemplate from "@/components/button.vue"
import gsap from "gsap"

export default {
    name: "Card",
    data() {
        return {
            choiceState : true,
            type : {
                "popularity" : 'views',
                "favourites" : 'likes',
                "score" : ''
            },
            tweened : 0,
            number : 0,
            hover : false,
        }
    },
    watch : {
        number(val) {
            gsap.to(this, { duration: 0.5, tweened: Number(val) ?? 0})
        }
    },
    methods : {
        setState(bool) {
            this.choiceState = !this.choiceState
            if(bool) this.$emit('choiceButtonClicked', 'higher')
            else this.$emit('choiceButtonClicked', 'lower')
        },
        formatNumber(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
        },
        handleTitle({english, romaji}) {
            const string = english === null ? romaji : english
            const length = 80
            return string.length > length ? string.substring(0, length - 2) + ".." : string
        },
        getColor(hex) {
            // IF UNDEFINED RETURN WHITE
            if(!hex) return '#fff'

            // HEX TO DECIMAL
            let rgb = parseInt(hex.substring(1) , 16)
            
            // CONVERT TO RGB
            let r = ((rgb >> 16) & 0xff) / 255
            let g = ((rgb >>  8) & 0xff) / 255
            let b = ((rgb >>  0) & 0xff) / 255
            
            // EXTRACT HUE
            let max = Math.max(r, g, b)
            let min = Math.min(r, g, b)
            let h = (max + min) / 2

            if(max == min){
                // ACHROMATIC
                h = 0
            }else{
                let d = max - min;
                switch(max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break
                    case g: h = (b - r) / d + 2; break
                    case b: h = (r - g) / d + 4; break
                }
                h /= 6
            }
            return `hsl(${Math.round(360*h)}, ${90}%, ${75}%)`
        }
    },
    components :{
        buttonTemplate,
    },
    props: {
        hideButton : {
            type: Boolean,
            default: true,
        },
        showData : {
            type: Boolean,
            default : true,
        },
        dataType : {
            type: Object,
            required: true,
        },
        info : {
            type: Object, 
            required: true,
        },
    },
}
</script>

<template>
    <div class="rounded-3xl bg-slate h-[38rem]">
        
        <div class="relative rounded-t-3xl w-[25rem] h-[32rem]" 
        v-on:mouseover="hover = true" v-on:mouseleave="hover = false">
            
            <div class="bottom-0 absolute left-0 z-20 px-10 py-8">
                <p class=" text-white font-bold text-2xl leading-relaxed">
                    {{ handleTitle(info?.title) }}
                </p>
                <ul class="flex flex-row flex-grow-0 flex-wrap mt-4 mb-2" v-if="hover && info?.genres.length > 0">
                    <li 
                    v-bind:style="{ backgroundColor: getColor(info?.cover?.color) }" 
                    class="text-slate font-semibold text-lg px-4 py-1 mb-2 mr-2 rounded-xl" 
                    v-for="data of info?.genres">
                        {{ data }}
                    </li>
                </ul>
            </div>

            <div 
            v-if="hover" 
            :class="[
                info?.score >= 75 ? 'bg-green' : info?.score < 50 ? 'bg-red' : 'bg-orange',
                'absolute top-0 right-0 z-30 rounded-tr-3xl rounded-bl-3xl']">
                <p class="text-white font-semibold text-3xl mx-5 my-4">{{ info?.score ?? 'NA'}}</p>
            </div>

            <div :class="[
                hover ? 'opacity-[0.60] bg-slate-dark' : 'opacity-75 bg-gradient-to-t from-slate-dark via-transparent to-transparent', 
                'absolute rounded-t-3xl z-10 h-full w-full'
                ]">
            </div>
        
            <img class="absolute rounded-t-3xl 
            w-[25rem] h-[32rem] object-cover" 
            :src="`@/assets/img/coverImg/${info?.cover?.filename}`" alt="image">  
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
                        {{ Object.keys(dataType)[0].charAt(0).toUpperCase() + Object.keys(dataType)[0].slice(1) }}: 
                        <span v-bind="number = info?.[Object.keys(dataType)[0]]" class="text-green">
                            {{ `${formatNumber(tweened.toFixed(0))} ${Object.values(dataType)[0]}` }}
                        </span>
                    </p>
                </transition>
            </div>
        </div>
    </div>
</template>

