<template>
    <RouterLink :to="{ name: 'Home' }">Home</RouterLink>
    <div id="myapp">
        <figure>
            <h1>Welcome to Fight Club</h1>
            <details>
                <img height="240" alt="Fight Club" src="../assets/cover.jpg" />
            </details>
            <ol>
                <li v-for="(rule, index) in rules" :key="rule.num">
                   <div class="rule">
                        {{ rule.text }}
                        <div style="flex-grow: 1;" />
                        <i @click="toggle(index)" :class="rule.like ? 'bi bi-suit-heart-fill' : 'bi bi-suit-heart'"
                            :style="rule.like ? 'color: red;' : ''"></i>
                    </div>
                </li>
            </ol>
            <figcaption>— {{ author }}, <cite> {{ title }}</cite></figcaption>
        </figure>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true,
            title: "Fight Club",
            author: "Chuck Palahniuk",
            rules: [
                { num: 1, text: "You do not talk about Fight Club", like: true },
                { num: 2, text: "You DO NOT talk about Fight Club!", like: false },
                { num: 3, text: "If someone yells “stop!”, goes limp, or taps out, the fight is over.", like: false },
                { num: 4, text: "Only two guys to a fight.", like: false },
                { num: 5, text: "One fight at a time, fellas.", like: false },
                { num: 6, text: "The fights are bare knuckle. No shirt, no shoes, no weapons.", like: false },
                { num: 7, text: "Fights will go on as long as they have to.", like: false },
                { num: 8, text: "If this is your first time at Fight Club, you have to fight.", like: false }
            ]
        }
    },
    methods: {
        toggle(num) {
            this.rules[num].like = !this.rules[num].like
        }
    }
}
</script>

<style scoped>
figure {
    border: 1px solid darkgrey;
    border-radius: 5px;
    width: 640px;
    padding: 5px;
    background: lightgray;
}
.rule {
    padding: 5px;
    margin: 5px;
    display: flex;
}

figcaption {
    text-align: left;
}
</style>