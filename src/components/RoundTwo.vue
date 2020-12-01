<template>
    <div>
        <ul class="flex tab-nav">
            <li v-for="(player, index) in $store.state.players" :key="player.name" v-on:click="currentPlayer = index" :class="{'tab-nav-link-active': currentPlayer === index}" v-text="player.name"></li>
        </ul>

        <template v-if="this.currentPlayer !== null">
            <template v-if="$store.getters.getRoundTwo.status === 0">
                <div class="mb-4">
                    <label for="high" class="inline-block w-40">Obere Grenze (in €):</label>
                    <input type="number" id="high" v-model="bidding.high">
                </div>

                <div class="mb-4">
                    <label for="normal" class="inline-block w-40">Mittlere Grenze (in €):</label>
                    <input type="number" id="normal" v-model="bidding.normal">
                </div>

                <div class="mb-4">
                    <label for="low" class="inline-block w-40">Obere Grenze (in €):</label>
                    <input type="number" id="low" v-model="bidding.low">
                </div>

                <a class="button button-primary" v-on:click="setLimits()">
                    Grenzen setzen

                    <i class="far fa-arrow-right" aria-hidden="true"></i>
                </a>
            </template>
            <template v-else-if="$store.getters.getRoundTwo.status === 1">
                <p class="mb-8">
                    <a class="button button-secondary" v-on:click="chooseLimit('high')">
                        Obere Grenze (€ {{ $store.getters.getRoundTwo.bidding.high }})
                    </a>
                </p>

                <p class="mb-8">
                    <a class="button button-primary" v-on:click="chooseLimit('normal')">
                        Mittlere Grenze (€ {{ $store.getters.getRoundTwo.bidding.normal }})
                    </a>
                </p>

                <p class="mb-16">
                    <a class="button button-secondary" v-on:click="chooseLimit('low')">
                        Untere Grenze (€ {{ $store.getters.getRoundTwo.bidding.low }})
                    </a>
                </p>

                <p>
                    <a class="button button-secondary" v-on:click="setStatus(0)">
                        <i class="far fa-arrow-left" aria-hidden="true"></i>

                        Zurück
                    </a>
                </p>
            </template>
            <template v-else-if="$store.getters.getRoundTwo.status === 2">
                <p class="font-bold mb-8" v-if="info.length > 0" v-html="info"></p>

                <div class="block mb-4">
                    <span class="block mb-1 uppercase font-bold text-sm">Jäger: {{ question.hunter }}</span>
                    <a class="button button-secondary inline-block mr-2" v-on:click="question.hunter++"><i class="far fa-check" aria-hidden="true"></i></a>
                    <a class="button button-secondary inline-block" v-on:click="question.hunter--"><i class="far fa-times" aria-hidden="true"></i></a>

                </div>

                <div class="block mb-8">
                    <span class="block mb-1 uppercase font-bold text-sm">{{ $store.getters.getPlayerName }}: {{ question.player }}</span>
                    <a class="button button-secondary inline-block mr-2" v-on:click="question.player++"><i class="far fa-check" aria-hidden="true"></i></a>
                    <a class="button button-secondary inline-block inline-block" v-on:click="question.player--"><i class="far fa-times" aria-hidden="true"></i></a>
                </div>

                <p>
                    <a class="button button-secondary inline-block mr-4" v-on:click="setStatus(1)">
                        <i class="far fa-arrow-left" aria-hidden="true"></i>

                        Zurück
                    </a>
                </p>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'RoundTwo',
    data () {
        return {
            bidding: {
                high: 10000,
                normal: 3000,
                low: 500,
            },
            question: {
                hunter: -1,
                player: 2,
            },
            currentPlayer: null,
            info: '',
        }
    },
    mounted () {
        const that = this

        if (this.$store.state.players.length > 0) {
            this.currentPlayer = 0
        }

        this.$store.subscribe(function (mutation, state) {
            if (mutation.type === 'setCurrentPlayer') {
                that.question.hunter = state.players[state.currentPlayer].roundTwo.hunterPosition
                that.question.player = state.players[state.currentPlayer].roundTwo.playerPosition
            }
        })

        this.resetPlayer()
    },
    methods: {
        setLimits () {
            this.$store.commit('setRoundTwoBidding', {
                playerIndex: this.currentPlayer,
                bidding: {
                    high: parseInt(this.bidding.high),
                    normal: parseInt(this.bidding.normal),
                    low: parseInt(this.bidding.low),
                }
            })
        },
        setStatus (newStatus) {
            this.$store.commit('setRoundTwoStatus', {
                playerIndex: this.currentPlayer,
                status: newStatus
            })
        },
        chooseLimit (limit) {
            this.$store.commit('setRoundTwoLimit', {
                playerIndex: this.currentPlayer,
                limit: limit
            })
        },
        nextQuestion () {
            this.info = ''

            if (this.$store.getters.getRoundTwo.playerPosition >= 7) {
                this.info += 'Spieler hat gewonnen!<br>'
            }

            if (this.$store.getters.getRoundTwo.hunterPosition >= this.$store.getters.getRoundTwo.playerPosition) {
                this.info += 'Jäger hat den Spieler eingeholt!<br>'
            }
        },
        resetPlayer () {
            this.bidding = {
                high: 10000,
                normal: 3000,
                low: 500
            }

            this.$store.commit('setCurrentPlayer', {
                playerIndex: this.currentPlayer,
            })
        },
    },
    watch: {
        currentPlayer () {
            this.resetPlayer()
        },
        question: {
            handler: function (val) {
                this.$store.commit('setRoundTwoNextQuestion', {
                    playerIndex: this.currentPlayer,
                    question: val,
                })

                this.nextQuestion()
            },
            deep: true,
        }
    }
}
</script>

<style scoped>

</style>
