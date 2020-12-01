<template>
    <div class="max-w-6xl mx-auto px-8 py-4">
        <div>
            <ul class="flex tab-nav">
                <li v-on:click="changeRound(1)" :class="{'tab-nav-link-active': $store.state.round === 1}">Runde 1</li>
                <li v-on:click="changeRound(2)" :class="{'tab-nav-link-active': $store.state.round === 2}">Runde 2</li>
                <li v-on:click="changeRound(3)" :class="{'tab-nav-link-active': $store.state.round === 3}">Runde 3</li>
                <li v-on:click="changeRound(4)" :class="{'tab-nav-link-active': $store.state.round === 4}">Einstellungen</li>
            </ul>

            <RoundOne v-if="$store.state.round === 1"></RoundOne>
            <RoundTwo v-if="$store.state.round === 2"></RoundTwo>
            <RoundThree v-if="$store.state.round === 3"></RoundThree>
            <Settings v-if="$store.state.round === 4"></Settings>
        </div>

        <p class="mt-32">
            <router-link to="/game" class="button button-secondary" target="_blank">Spielfeld anzeigen</router-link>
        </p>
    </div>
</template>

<script>
import RoundOne from '@/components/RoundOne'
import RoundTwo from '@/components/RoundTwo'
import RoundThree from '@/components/RoundThree'
import Settings from '@/components/Settings'

export default {
    name: 'Admin',
    components: {
        RoundOne,
        RoundTwo,
        RoundThree,
        Settings,
    },
    mounted () {
        const players = process.env.VUE_APP_PLAYERS.split(',').map(function (name) {
            return {
                name: name,
                roundOne: {
                    countdown: 60,
                    money: 0,
                },
                roundTwo: {
                    status: 0,
                    playerPosition: 2,
                    hunterPosition: -1,
                    money: 0,
                    bidding: {
                        hight: 0,
                        normal: 0,
                        low: 0,
                    }
                },
            }
        })

        if (this.$store.state.players.length !== players.length) {
            this.$store.commit('setPlayers', {
                players: players
            })
        }
    },
    methods: {
        changeRound (round) {
            this.$store.commit('setRound', {
                round: round
            })
        }
    }
}
</script>

<style scoped>

</style>
