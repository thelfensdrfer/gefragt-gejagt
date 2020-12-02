<template>
    <div>
        <div class="block mb-4">
            <p>
               Countdown: {{ $store.getters.getRoundThreeCountdown }} Sekunden
            </p>

            <a class="button button-secondary inline-block mr-4" v-on:click="resetCountdown()">
                <i class="far fa-undo" aria-hidden="true"></i>
                Countdown zurücksetzen
            </a>

            <a class="button button-primary" v-on:click="toggleCountdown()">
                <i class="far fa-play" aria-hidden="true"></i>
                Countdown starten/anhalten
            </a>
        </div>

        <div class="block mb-4">
            <span class="block mb-1 uppercase font-bold text-sm">Jäger: {{ $store.getters.getRoundThree.hunter }}</span>
            <a class="button button-secondary inline-block mr-2" v-on:click="$store.commit('setRoundThree', {type: 'hunter', increment: 1})"><i class="far fa-plus" aria-hidden="true"></i></a>
            <a class="button button-secondary inline-block" v-on:click="$store.commit('setRoundThree', {type: 'hunter', increment: -1})"><i class="far fa-minus" aria-hidden="true"></i></a>
        </div>

        <div class="block mb-8">
            <span class="block mb-1 uppercase font-bold text-sm">Spieler: {{ $store.getters.getRoundThree.players }}</span>
            <a class="button button-secondary inline-block mr-2" v-on:click="$store.commit('setRoundThree', {type: 'players', increment: 1})"><i class="far fa-plus" aria-hidden="true"></i></a>
            <a class="button button-secondary inline-block inline-block" v-on:click="$store.commit('setRoundThree', {type: 'players', increment: -1})"><i class="far fa-minus" aria-hidden="true"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RoundThree',
    data () {
        return {
            countdown: 120,
            timer: null,
        }
    },
    methods: {
        resetCountdown () {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }

            this.$store.commit('setRoundThreeCountdown', {
                timer: 120
            })
        },
        toggleCountdown () {
            if (this.timer !== null) {
                clearInterval(this.timer)
                this.timer = null
                return
            }

            const that = this

            this.timer = window.setInterval(function () {
                that.$store.commit('setRoundThreeCountdown', {
                    timer: that.countdown--
                })

                if (that.countdown <= 0) {
                    clearInterval(that.timer)
                    that.timer = null
                }
            }, 1000)
        },
    }
}
</script>

<style scoped>

</style>
