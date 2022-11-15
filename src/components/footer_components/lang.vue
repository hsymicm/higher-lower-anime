<script>
    export default {
        name: "lang",
        mounted() {
            this.$nextTick(() => document.querySelector(`#${this.prefLang}`).scrollIntoView())
        },
        data() {
            return {
                lang : {
                    // 'cn' : '中文', 
                    // 'ds' : 'Deutsch', 
                    'en' : 'English', 
                    'es' : 'Español', 
                    'fr' : 'Français', 
                    'id' : 'Indonesia',
                    'ja' : '日本語', 
                    'ko' : '한국어', 
                    // 'pr' : 'Português', 
                    'ru' : 'Pусский',
                },
            }
        },
        props : {
            prefLang : {
                type : String,
                default : 'en',
            }
        }
    }
</script>

<style>
    .scrollbar-style {
        cursor: pointer;
    }
    .scrollbar-style::-webkit-scrollbar {
        width: 4px;
    }
    .scrollbar-style::-webkit-scrollbar-track {
        background-color: rgb(54,54,54);
        border-radius: 2px;
    }
    .scrollbar-style::-webkit-scrollbar-thumb {
        background-color: #2ED75D;
        border-radius: 2px;
    }
</style>

<template>
    <div class="absolute bottom-[140%] left-0">
        <div class="bg-slate rounded-t-lg rounded-br-lg px-2 py-4">
            <div class="h-36 overflow-auto scrollbar-style">
                <p
                v-for="(val, key) in this.lang" 
                v-on:click="$emit('langChange', key)"
                v-bind:id="key"
                :class="[
                    key === prefLang ? 'bg-green text-slate' : 'bg-slate hover:bg-slate-light active:bg-slate', 
                    'transition-all text-white py-1 px-3 text-lg font-bold rounded-lg mr-4'
                    ]"
                >
                    {{val}}
                </p>
            </div>
        </div>
        <div style="border-right: 15px solid transparent; border-top: 15px solid rgb(30,30,30);" class="w-0 h-0"></div>
    </div>
</template>