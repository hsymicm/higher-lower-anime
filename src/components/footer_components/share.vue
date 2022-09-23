<script>
export default {
    name: "Share",
    data() {
        return {
            copyState : false,
        }
    },
    components: {

    },
    methods : {
        copyLink() {
            this.copyState = true
            navigator.clipboard.writeText(window.location.href)
            setTimeout(() => this.copyState = false, 1000)
        },
    }
}    

</script>

<template>
    <div class="absolute bottom-[140%] left-0">
        <div class="bg-slate rounded-t-lg rounded-br-lg w-64 p-4">
            <div class="flex flex-row justify-between">
                <a onclick="window.open('https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhsymicm.github.io%2Fhigher-lower-anime%2F', '_blank')">
                    <img src="@/assets/img/facebook.png" class="h-10 object-cover transition-all hover:brightness-[1.5] active:brightness-[1.0]">
                </a>
                <a onclick="window.open('https://twitter.com/intent/tweet/?text=Play%20%22Higher%20Lower%20-%20Anime%20Version%22%20where%20you%20guess%20which%20anime%20title%20is%20more%20popular.&amp;url=https%3A%2F%2Fhsymicm.github.io%2Fhigher-lower-anime%2F', '_blank')">
                    <img src="@/assets/img/twitter.png" class="h-10 object-cover transition-all hover:brightness-[1.2] active:brightness-[1.0]">
                </a>
                <a onclick="window.open('https://reddit.com/submit/?url=https%3A%2F%2Fhsymicm.github.io%2Fhigher-lower-anime%2F&amp;resubmit=true&amp;title=Play%20%22Higher%20Lower%20-%20Anime%20Version%22%20where%20you%20guess%20which%20anime%20title%20is%20more%20popular.', '_blank')">
                    <img src="@/assets/img/reddit.png" class="h-10 object-cover transition-all hover:brightness-[1.5] active:brightness-[1.0]">
                </a>
                <div class="relative inline-block">
                    <span v-show="copyState" class="absolute bg-slate-light bottom-[120%] text-white text-center left-1/2 w-48 -ml-24 p-1 rounded-lg">
                        {{'Copied to clipboard!'}}
                    </span>
                    <img v-on:click="copyLink()" src="@/assets/img/link.png" class="cursor-pointer h-10 object-cover transition-all hover:brightness-[1.2] active:brightness-[1.0]">
                </div>
            </div>
        </div>
        <div style="border-right: 15px solid transparent; border-top: 15px solid rgb(30,30,30);" class="w-0 h-0"></div>
    </div>
</template>