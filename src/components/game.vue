<script>
import cardTemplate from '@/components/game_components/card.vue'
import buttonTemplate from '@/components/button.vue'
import arr from '@/modules/data.json'

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
            first_index : 0,
            second_index : 0,
            card1Data : {},
            card2Data : {},
            choiceState : '',
        }
    },
    props: {
        gameMode : {
            type : String,
            required : true,
        },
    },
    created() {
        const mode = this.gameMode.toLowerCase()
        this.highScore = localStorage.getItem(mode) ?? 0
        this.first_index = getIndex()
        while(true){
            this.second_index = getIndex()
            if(this.second_index != this.first_index) break
        }
        const arr1 = arr[this.first_index]
        const arr2 = arr[this.second_index]
        for(const image of [arr1, arr2]) {
            preloadImage(image?.coverImage?.large)
        }
        this.card1Data = arr1
        this.card2Data = arr2
        },
    methods: {
        loadCard() {
            let new_index = 0
            while(true){
                new_index = getIndex()
                if(new_index != this.second_index) break
            }
            this.first_index = this.second_index
            this.second_index = new_index
            const new_arr = arr[this.second_index]
            preloadImage(new_arr?.coverImage?.large)            
        },
        updateCard() {
            this.card1Data = arr[this.first_index]
            this.card2Data = arr[this.second_index]
        },
        checkChoice(check) {
            const mode = this.gameMode.toLowerCase()
            const data1 = this.card1Data[mode]
            const data2 = this.card2Data[mode]
            let choice = ''
            if(data1 < data2) choice = 'higher'
            else choice = 'lower'
            if(check === choice) {
                this.choiceState = 'correct' 
                this.curScore++
                if(this.curScore > this.highScore) localStorage.setItem(mode, parseInt(this.curScore))
                this.highScore = localStorage.getItem(mode)
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
            v-bind:info="card1Data"
            :data-type="gameMode"
            />

            <!-- MIDDLE PART -->
            <div class="flex flex-col grow-0 justify-end w-[24rem] h-[38rem]">
                <!-- DISPLAY VS -->
                <div v-if="!isGameOver" :class="[
                    choiceState === 'correct' ? 'bg-green' : (choiceState === 'wrong' ? 'bg-red' : 'bg-white'), 
                    'mx-auto mt-32 mb-12 w-24 h-24 rounded-full transition-colors duration-300'
                    ]">
                    <div class="relative top-[50%] translate-y-[-50%]">
                        <p v-if="choiceState === ''" class="text-center text-5xl font-extrabold text-slate">VS</p>
                        <font-awesome-icon v-if="choiceState === 'correct'" class="relative left-[50%] translate-x-[-50%] text-5xl text-white" icon="check" transform="down-1" />
                        <font-awesome-icon v-if="choiceState === 'wrong'" class="relative left-[50%] translate-x-[-50%] text-5xl text-white" icon="xmark" />
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
            v-bind:info="card2Data"
            :data-type="gameMode"
            v-bind:hide-button=false
            v-bind:show-data=false />

        </div>
    </div>
</template>
