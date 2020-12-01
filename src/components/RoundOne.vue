<template>
    <div>
        <ul class="flex tab-nav">
            <li v-for="(player, index) in $store.state.players" :key="player.name" v-on:click="currentPlayer = index" :class="{'tab-nav-link-active': currentPlayer === index}" v-text="player.name"></li>
        </ul>

        <p class="mb-8">
            <a class="button button-secondary" v-on:click="newCountdown()">
                <i class="far fa-undo" aria-hidden="true"></i> Countdown zurücksetzen
            </a>
        </p>

        <template v-if="$store.getters.getRoundOne.countdown !== null">
            <p>
               Geld: <span class="font-bold" v-text="$store.getters.getRoundOne.money + '€'"></span>
            </p>

            <p class="mb-4">
                Countdown: <span class="font-bold" v-text="'0:' + $store.getters.getRoundOne.countdown"></span>
            </p>
        </template>

        <p>
            <a class="button button-primary inline-block mr-4" v-if="$store.getters.getRoundOne.countdown !== null" v-on:click="addMoney(500)">
                <i class="far fa-coins" aria-hidden="true"></i>
                Geld +
            </a>

            <a class="button button-secondary inline-block mr-4" v-if="$store.getters.getRoundOne.countdown !== null" v-on:click="addMoney(-500)">
                <i class="far fa-coins" aria-hidden="true"></i>
                Geld -
            </a>

            <a class="button button-secondary inline-block" v-if="$store.getters.getRoundOne.countdown !== null" v-on:click="toggleCountdown()">
                <template v-if="timer === null">
                    <i class="far fa-play" aria-hidden="true"></i>
                    Countdown starten
                </template>
                <template v-else>
                    <i class="far fa-stop" aria-hidden="true"></i>
                    Countdown anhalten
                </template>
            </a>
        </p>
    </div>
</template>

<script>
export default {
    name: 'RoundOne',
    data () {
        return {
            timer: null,
            currentPlayer: null
        }
    },
    mounted () {
        if (this.$store.state.players.length > 0) {
            this.currentPlayer = 0
        }

        this.resetPlayer()
    },
    methods: {
        newCountdown () {
            console.debug('New countdown')

            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }

            this.$store.commit('newCountdown', {
                playerIndex: this.currentPlayer
            })
        },
        toggleCountdown () {
            if (this.timer !== null) {
                console.debug('Pause countdown')

                clearInterval(this.timer)
                this.timer = null
                return
            }

            console.debug('Start countdown')

            const that = this

            this.timer = window.setInterval(function () {
                console.debug('Countdown', that.$store.getters.getRoundOne.countdown)

                that.$store.commit('countdown', {
                    playerIndex: that.currentPlayer
                })

                if (that.$store.getters.getRoundOne.countdown <= 0) {
                    clearInterval(that.timer)
                    that.timer = null
                }
            }, 1000)
        },
        addMoney (money) {
            this.$store.commit('addMoney', {
                playerIndex: this.currentPlayer,
                money: money,
            })
        },
        resetPlayer () {
            clearInterval(this.timer)
            this.timer = null

            this.$store.commit('setCurrentPlayer', {
                playerIndex: this.currentPlayer,
            })
        },
    },
    watch: {
        currentPlayer () {
            this.resetPlayer()
        },
    }
}
</script>

<style scoped>

</style>
