<script>
import cardTemplate from '@/components/game_components/card.vue'
import buttonTemplate from '@/components/button.vue'
import arr from '@/modules/data1.json'

const getIndex = () => {
    return Math.floor(Math.random() * arr.length)
}

function preloadImage(src) {
    const img = new Image()
    img.src = src
} 

export default {
    name: "Game",
    components: {
        buttonTemplate,
        cardTemplate,
    },
    data() {
        return {
            isGameOver : false,
            curScore : 0,
            highScore : 0,
            firstIndex : 0,
            secondIndex : 0,
            card1Data : {},
            card2Data : {},
            choiceState : '',
            mode : '',
        }
    },
    props: {
        gameMode : {
            type : Object,
            required : true,
        },
    },
    created() {
        this.mode = Object.keys(this.gameMode)[0]
        this.highScore = localStorage.getItem(this.mode) ?? 0
        this.firstIndex = getIndex()
        while(true){
            this.secondIndex = getIndex()
            if(this.secondIndex != this.firstIndex) break
        }
        const arr1 = arr[this.firstIndex]
        const arr2 = arr[this.secondIndex]
        for(const image of [arr1, arr2]) {
            preloadImage(image?.cover?.url)
        }
        this.card1Data = arr1
        this.card2Data = arr2
        },
    methods: {
        loadCard() {
            let newIndex = 0
            while(true){
                newIndex = getIndex()
                if(newIndex != this.secondIndex) break
            }
            this.firstIndex = this.secondIndex
            this.secondIndex = newIndex
            const newArr = arr[this.secondIndex]
            preloadImage(newArr?.cover?.url)            
        },
        updateCard() {
            this.card1Data = arr[this.firstIndex]
            this.card2Data = arr[this.secondIndex]
        },
        checkChoice(check) {
            const data1 = this.card1Data[this.mode]
            const data2 = this.card2Data[this.mode]
            let choice = ''
            if(data1 < data2) choice = 'higher'
            else choice = 'lower'
            if(check === choice) {
                this.choiceState = 'correct' 
                this.curScore++
                if(this.curScore > this.highScore) localStorage.setItem(this.mode, parseInt(this.curScore))
                this.highScore = localStorage.getItem(this.mode)
                this.loadCard()
                setTimeout(() => {this.updateCard(), this.choiceState = ''}, 2000)
            } else {
                this.choiceState = 'wrong' 
                setTimeout(() => {this.isGameOver = !this.isGameOver, this.choiceState = ''}, 2000)
            }
        },
        resetAllData() {
            this.$emit('resetAll')
        },
    },
};
</script>

<template>
    <div class="absolute flex flex-col justify-center inset-x-0 inset-y-0 mt-16 mb-32">
        <div class="flex flex-row justify-center align-middle scale-global">
    
            <!-- FIRST CARD -->
            <cardTemplate v-if="!isGameOver"
            :info="card1Data"
            :data-type="gameMode"
            />

            <!-- MIDDLE PART -->
            <div class="flex flex-col grow-0 justify-end w-[24rem] h-[38rem]">
                
                <!-- DISPLAY VS -->
                <div v-if="!isGameOver" :class="[
                    choiceState === 'correct' ? 'bg-green' : (
                        choiceState === 'wrong' ? 'bg-red' : 'bg-white'), 
                    'mx-auto mt-32 mb-12 w-24 h-24 rounded-full transition-colors duration-300'
                    ]">
                    <div class="relative top-[50%] translate-y-[-50%]">
                        <p v-if="choiceState === ''" class="text-center text-5xl font-extrabold text-slate">VS</p>
                        <font-awesome-icon v-if="choiceState === 'correct'" 
                        class="relative left-[50%] translate-x-[-50%] text-5xl text-white" 
                        icon="check" transform="down-1" />
                        <font-awesome-icon v-if="choiceState === 'wrong'" 
                        class="relative left-[50%] translate-x-[-50%] text-5xl text-white" 
                        icon="xmark" />
                    </div>
                </div>
                
                <!-- DISPLAY GAME OVER MENU -->
                <transition
                    enter-active-class="duration-300 ease-out"
                    enter-from-class="transform opacity-0"
                    leave-active-class="duration-300 ease-in"
                    leave-to-class="transform opacity-0"
                >
                    <div v-if="isGameOver" class="flex flex-col justify-center">
                        <p class="my-6 text-5xl text-center text-white font-extrabold">Wrong Guess!</p>
                        <buttonTemplate v-on:click="resetAllData" class="mx-auto my-4" label="Try Again" v-bind:isSecondary="true" />
                        <buttonTemplate v-on:click="$emit('buttonHomeClick')" class="mx-auto mb-10" label="Home" />
                    </div>
                </transition>

                <!-- DISPLAY PLAYER SCORE -->
                <p class="text-2xl leading-loose 
                text-white text-center font-semibold mx-auto my-4">
                    High Score:<br />
                    <span class="text-5xl">{{ highScore }}</span>
                </p>
                <p class="text-2xl leading-loose 
                text-white text-center font-semibold mx-auto mt-4 mb-12">
                    Current Score:<br />
                    <span class="text-5xl">{{ curScore }}</span>
                </p>
            </div>

            <!-- SECOND CARD -->
            <cardTemplate :key="card2Data" v-if="!isGameOver" v-on:choiceButtonClicked="checkChoice"
            :info="card2Data"
            :data-type="gameMode"
            :hide-button=false
            :show-data=false />

        </div>
    </div>
</template>
