<script>
export default {
    name:'Info',
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
        <div class="relative bg-slate rounded-t-lg rounded-br-lg w-72 p-4">
            <div class="absolute bg-green top-0 left-0 min-w-fit w-auto text-slate font-bold text-xl text-center py-1 px-4 rounded-br-lg rounded-tl-lg">
                {{ $t('footer.info.title') }}
            </div>
            <ul class="text-white mt-9 h-32 overflow-y-auto scrollbar-style pr-8">
                <li v-for="(data, index) of $tm('footer.info.steps')" :class="[$tm('footer.info.steps').length - 1 === index ? '' : 'mb-5', 'flex flex-row']">
                    <div class="bg-gradient-to-b from-green to-transparent text-slate rounded-full p-1 mr-4 font-bold text-xl">
                        {{index + 1}}
                    </div>
                    <div>
                        <span class="font-bold text-xl">
                            {{ data.title }}
                        </span>
                        <p>
                            {{ data.content }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div style="border-right: 15px solid transparent; border-top: 15px solid rgb(30,30,30);" class="w-0 h-0"></div>
    </div>
</template>