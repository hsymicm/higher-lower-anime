<script>
import homeComponent from '@/components/home.vue';
import footerComponent from '@/components/footer.vue';
import gameComponent from '@/components/game.vue';

export default {
  name : "App",
  data() {
    return {
      gameState : false,
      refresh : true,
      modes : [
        'Popularity',
        'Favourites',
      ],
      index: 0,
    }
  },
  methods : {
    setGameState() {
      this.gameState = !this.gameState
    },
    refreshGame() {
      this.refresh = !this.refresh
    },
    setMode(page) {
      const totalMode = this.modes.length
      let i = this.index
      page === "next" ? i++ : i--
      this.index = i < 0 ? totalMode - 1 : i % totalMode
    },
  },
  components : {
    homeComponent,
    footerComponent,
    gameComponent,
  },
}
</script>

<template>
  <!-- SCREEN -->
  <div class="bg-slate fixed h-screen w-screen m-0 p-0">
    <div class="absolute w-screen h-screen z-30">

      <!-- HOME BUTTON -->
      <a v-on:click="gameState = false" class="absolute z-[999] w-16 xl:w-24 3xl:w-28 top-[8vh] left-[6vw] transition-all hover:brightness-[1.5] active:brightness-[1.0] hover:cursor-pointer">
        <img src="./assets/img/home_icon.png" alt="Higher Lower Logo">
      </a>
      <!-- CONTENT -->
      <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 blur scale-[95%] translate-y-8"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-300 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="transform opacity-0 blur scale-[95%] translate-y-8"
      >
        <homeComponent v-if="!gameState" 
        :gameMode="modes[index]"
        v-on:buttonStartClick="setGameState"
        v-on:buttonModeClick="setMode" />
      </transition>
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0 blur scale-[95%] translate-y-8"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-300 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="transform opacity-0 blur scale-[95%] translate-y-8"
      >
        <gameComponent v-if="gameState" 
        :gameMode="modes[index]"
        v-on:buttonHomeClick="setGameState"
        v-on:resetAll="refreshGame" 
        :key="refresh" />
      </transition>
      
      <!-- FOOTER -->
      <footerComponent class="z-[999]"/>
    </div>
    <div class="absolute bg-gradient-to-t from-slate-dark to-transparent h-3/4 w-screen z-20 inset-x-0 top-0"></div>
    <div class="absolute bg-slate-dark h-[26%] w-screen z-20 inset-x-0 bottom-0"></div>
    <img src="./assets/img/header_bw.jpg" alt="Background Header" class="bg-cover object-cover w-full min-h-[75%] m-0 p-0">
  </div>
</template>