<script>
import buttonTemplate from "@/components/button.vue"
import langComponent from "@/components/footer_components/lang.vue"
import shareComponent from "@/components/footer_components/share.vue"
import infoComponent from "@/components/footer_components/info.vue"

export default {
    name: "Footer",
    data() {
        return {
            media: {
                lang : {
                    logoType : 'globe',
                    clicked : false,
                    value : localStorage.getItem('prefLang'),
                },
                info : {
                    logoType : 'gamepad',
                    clicked : false,
                },
                share : {
                    logoType : 'share',
                    clicked : false,
                },
            },
        }
    },
    components: {
        shareComponent,
        buttonTemplate,
        langComponent,
        infoComponent,
    },
    methods : {
        handleLang(lang) {
            this.media.lang.value = lang
            localStorage.setItem('prefLang', lang)
            this.$i18n.locale = lang
        },
        handleClick(ref) {
            this.media[ref].clicked = true
            this.$nextTick(() => this.$refs[ref][0].focus())
        }
    }
}
</script>

<template>
    <div class="absolute flex flex-row justify-between inset-x-0 bottom-0 py-4 px-14 xl:py-8 xl:px-20 3xl:py-10 3xl:px-28 bg-slate-dark">
        <div class="flex flex-row w-1/4 mr-auto my-auto justify-start">
            <div v-for="(val, key) in this.media" class="relative mr-6">
                <buttonTemplate
                v-on:click="handleClick(key)"
                :isSecondary="true"
                :logoType="val.logoType"
                class="p-[2px] xl:p-1 3xl:p-[6px] h-8 w-8 xl:h-10 xl:w-10 3xl:h-12 3xl:w-12">
                </buttonTemplate>
                <transition
                    enter-active-class="duration-300 ease-out"
                    enter-from-class="transform opacity-0 translate-y-8"
                    leave-active-class="duration-100 ease-in"
                    leave-to-class="transform opacity-0 translate-y-8"
                >
                <div :ref="key" tabindex="-1" v-on:blur="val.clicked = false" v-if="val.clicked" class="absolute bottom-[140%] left-0">
                    <langComponent v-if="key === 'lang'"
                    v-on:langChange="handleLang"
                    v-bind:prefLang="this.media.lang.value" />
                    <infoComponent v-if="key === 'info'" />
                    <shareComponent v-if="key === 'share'" />
                </div>
                </transition>
            </div>
        </div>
        <div class="flex flex-col m-auto text-white text-center text-sm xl:text-lg 3xl:text-xl font-semibold">
            <p>
                {{ $t('footer.credit.name') }} 
                <a href="https://github.com/hsymicm/higher-lower-anime" target="_blank" class="transition-colors text-green hover:text-green-hover active:text-green">
                    Fadil Hisyam
                </a>
            </p>
            <p>
                {{ $t('footer.credit.data') }} 
                <a href="https://github.com/AniList/ApiV2-GraphQL-Docs" target="_blank" class="transition-colors text-red hover:text-red-hover active:text-red">
                    Anilist
                </a>
            </p>
        </div>
        <div class="flex flex-row ml-auto my-auto w-1/4 justify-end">
            <a href="https://vuejs.org" target="_blank" class="m-3 transition-all hover:brightness-[1.5] active:brightness-[1.0]">
                <img src="@/assets/img/vue_icon.png" alt="vuejs" class="h-5 xl:h-7 3xl:h-8 object-cover">
            </a>
            <a href="https://tailwindcss.com" target="_blank" class="m-3 transition-all hover:brightness-[1.5] active:brightness-[1.0]">
                <img src="@/assets/img/tailwind_icon.png" alt="tailwindcss" class="h-5 xl:h-7 3xl:h-8 object-cover">
            </a>
        </div>
    </div>
</template>