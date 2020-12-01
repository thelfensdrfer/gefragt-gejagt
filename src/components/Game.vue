<template>
    <div class="h-screen w-screen py-8 bg-blueGray-900 text-white">
        <h1 class="font-bold text-4xl text-center uppercase">Runde {{ $store.state.round }} <template v-if="$store.state.round < 3"> - {{ $store.getters.getPlayerName }}</template></h1>

        <div class="mt-16">
            <template v-if="$store.state.round === 1">
                <div v-if="$store.getters.getRoundOne.countdown !== null" class="text-center text-6xl">
                    <span v-text="'€ ' + $store.getters.getRoundOne.money" class="bg-blue-700 text-white rounded-l-lg px-4 py-2"></span>
                    <span v-text="'0:' + $store.getters.getRoundOne.countdown" class="bg-cyan-500 text-white rounded-r-lg px-4 py-2"></span>
                </div>
            </template>
            <template v-else-if="$store.state.round === 2">
                <template v-if="$store.getters.getRoundTwo.status === 1">
                    <div class="round-2">
                        <div class="bg-blue-700"></div>
                        <div class="bg-cyan-500" v-text="'€ ' + $store.getters.getRoundTwo.bidding.high"></div>
                        <div class="bg-blue-700"><i class="fa fa-caret-right" aria-hidden="true"></i> € {{ $store.getters.getRoundTwo.bidding.normal }} <i class="fa fa-caret-left" aria-hidden="true"></i></div>
                        <div class="bg-cyan-500" v-text="'€ ' + $store.getters.getRoundTwo.bidding.low"></div>
                        <div class="bg-blue-700"></div>
                        <div class="bg-blue-700"></div>
                        <div class="bg-blue-700"></div>
                    </div>
                </template>
                <template v-else-if="$store.getters.getRoundTwo.status === 2">
                    <div class="round-2">
                        <div v-for="field in roundTwoFields" :key="field.id" :class="field.classes" v-html="field.text"></div>
                    </div>
                </template>
            </template>
            <template v-else-if="$store.state.round === 3">
                <div class="mx-auto flex flex-col max-w-6xl mx-auto">
                    <div class="bg-cyan-900 flex flex-row justify-end border-2 border-b-0 border-black">
                        <div>
                            00:00
                        </div>
                    </div>
                    <div class="flex flex-row text-6xl text-center font-bold">
                        <div v-for="n in $store.getters.getRoundThree.players" :key="n" class="border-2 border-black px-4 py-2 flex-grow round-3-field" :class="{'is-player': $store.getters.getRoundThree.players >= n, 'is-hunter': $store.getters.getRoundThree.hunter >= n}" style="min-width: 3rem;">{{ n }}</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Game',
    data () {
        return {
            roundTwoFields: [
                {
                    id: 0,
                    classes: '',
                    text: '',
                },
                {
                    id: 1,
                    classes: '',
                    text: '',
                },
                {
                    id: 2,
                    classes: '',
                    text: '',
                },
                {
                    id: 3,
                    classes: '',
                    text: '',
                },
                {
                    id: 4,
                    classes: '',
                    text: '',
                },
                {
                    id: 5,
                    classes: '',
                    text: '',
                },
                {
                    id: 6,
                    classes: '',
                    text: '',
                },
            ],
        }
    },
    mounted () {
        const that = this

        this.$store.subscribe(function (mutation) {
            if (mutation.type === 'setRound' ||
                mutation.type === 'setCurrentPlayer' ||
                mutation.type === 'setRoundTwoStatus' ||
                mutation.type === 'setRoundTwoBidding' ||
                mutation.type === 'setRoundTwoLimit' ||
                mutation.type === 'setRoundTwoNextQuestion') {
                that.roundTwo()
            }
        })

        that.roundTwo()
    },
    methods: {
        roundTwo () {
            for (let i = 0; i < 7; i++) {
                this.roundTwoLevel(i)
            }
        },
        roundTwoLevel (level) {
            if (level <= this.$store.getters.getRoundTwo.hunterPosition) {
                this.roundTwoFields[level].classes = 'bg-red-600'
            } else if (level < this.$store.getters.getRoundTwo.playerPosition) {
                this.roundTwoFields[level].classes = 'bg-cyan-500'
            } else {
                this.roundTwoFields[level].classes = 'bg-blue-700'
            }

            if (this.$store.getters.getRoundTwo.hunterPosition === level) {
                this.roundTwoFields[level].text = '<i class="far fa-caret-down text-white" aria-hidden="true"></i>'
            } else if (this.$store.getters.getRoundTwo.playerPosition === level) {
                this.roundTwoFields[level].text = '<i class="fa fa-caret-right" aria-hidden="true"></i> € ' + this.$store.getters.getRoundTwo.money + ' <i class="fa fa-caret-left" aria-hidden="true"></i>'
            } else {
                this.roundTwoFields[level].text = ''
            }
        },
    },
}
</script>

<style scoped>
h1 {
    font-family: 'Source Code Pro', monospace;
}

.round-2 {
    @apply mx-auto text-center text-6xl;

    width: 24rem;
}
.round-2 > div {
    @apply mx-auto px-4 py-2 font-bold rounded-lg border-2 border-blueGray-900;

    min-height: 5rem;
}
.round-2 > div:nth-child(1) {
    width: 24rem;
}
.round-2 > div:nth-child(2) {
    width: 23.5rem;
}
.round-2 > div:nth-child(3) {
    width: 23rem;
}
.round-2 > div:nth-child(4) {
    width: 22.5rem;
}
.round-2 > div:nth-child(5) {
    width: 22rem;
}
.round-2 > div:nth-child(6) {
    width: 21.5rem;
}
.round-2 > div:nth-child(7) {
    width: 21rem;
}

.round-3-field.is-player {
    @apply bg-blue-700;
}
.round-3-field.is-hunter {
    @apply bg-red-700 !important;
}
</style>
