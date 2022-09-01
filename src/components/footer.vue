<script>
export default {
    name: "Footer",
    components: {

    }
}
</script>

<template>
    <div class="absolute flex flex-row justify-between inset-x-0 bottom-0 py-4 px-12 xl:py-8 xl:px-18 3xl:py-10 3xl:px-24 bg-slate-dark">
        <div class="flex flex-row w-1/4 mr-auto "></div>
        <div class="flex flex-col m-auto">
            <p class="text-white text-center text-sm xl:text-lg 3xl:text-xl font-semibold">
                Made by 
                <a href="https://github.com/hsymicm/higher-lower-anime" target="_blank" class="transition-all text-green hover:text-green-hover active:text-green">
                    Fadil Hisyam
                </a>
            </p>
            <p class="text-white text-sm xl:text-lg 3xl:text-xl text-center font-semibold">
                Data from 
                <a href="https://github.com/AniList/ApiV2-GraphQL-Docs" target="_blank" class="text-red hover:text-red-hover active:text-red">
                    Anilist
                </a>
            </p>
        </div>
        <div class="flex flex-row ml-auto w-1/4 justify-end">
            <a href="https://vuejs.org" target="_blank" class="m-3 transition-all hover:brightness-[1.5] active:brightness-[1.0]">
                <img src="@/assets/img/vue_icon.png" alt="vuejs" class="h-4 xl:h-7 3xl:h-8 object-cover">
            </a>
            <a href="https://tailwindcss.com" target="_blank" class="m-3 transition-all hover:brightness-[1.5] active:brightness-[1.0]">
                <img src="@/assets/img/tailwind_icon.png" alt="tailwindcss" class="h-4 xl:h-7 3xl:h-8 object-cover">
            </a>
        </div>
    </div>
</template>