import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: function () {
        return {
            players: [],
            currentPlayer: 0,
            round: 1,
            roundThree: {
                players: 0,
                hunter: 0,
                timer: 120,
            }
        }
    },
    getters: {
        getPlayerName (state) {
            return state.players[state.currentPlayer].name
        },
        getRoundOne (state) {
            return state.players[state.currentPlayer].roundOne
        },
        getRoundTwo (state) {
            return state.players[state.currentPlayer].roundTwo
        },
        getRoundThree (state) {
            return state.roundThree
        },
        getRoundThreeCountdown (state) {
            const minutes = '0' + Math.floor(state.roundThree.timer / 60)
            let seconds = state.roundThree.timer % 60

            if (seconds === 0) {
                seconds = '00'
            } else if (seconds < 10) {
                seconds = '0' + seconds
            }

            return minutes + ':' + seconds
        },
    },
    mutations: {
        setRound (state, payload) {
            if (payload.round > 4) {
                payload.round = 4
            } else if (payload.round < 1) {
                payload.round = 1
            }
            state.round = payload.round
        },
        setPlayers (state, payload) {
            Vue.set(state, 'players', payload.players)
        },
        setCurrentPlayer (state, payload) {
            Vue.set(state, 'currentPlayer', payload.playerIndex)
        },
        newCountdown (state, payload) {
            Vue.set(state.players[payload.playerIndex].roundOne, 'countdown', 60)
        },
        countdown (state, payload) {
            Vue.set(state.players[payload.playerIndex].roundOne, 'countdown', state.players[payload.playerIndex].roundOne.countdown - 1)
        },
        addMoney (state, payload) {
            if (state.players[payload.playerIndex].roundOne.money + payload.money >= 0) {
                Vue.set(state.players[payload.playerIndex].roundOne, 'money', state.players[payload.playerIndex].roundOne.money += payload.money)
            }
        },
        setRoundTwoBidding (state, payload) {
            Vue.set(state.players[payload.playerIndex].roundTwo, 'bidding', payload.bidding)
            Vue.set(state.players[payload.playerIndex].roundTwo, 'status', 1)
        },
        setRoundTwoStatus (state, payload) {
            Vue.set(state.players[payload.playerIndex].roundTwo, 'status', payload.status)
        },
        setRoundTwoLimit (state, payload) {
            let playerPosition = 2

            if (payload.limit === 'high') {
                playerPosition = 1
            } else if (payload.limit === 'normal') {
                playerPosition = 2
            } else if (payload.limit === 'low') {
                playerPosition = 3
            }

            state.players[payload.playerIndex].roundTwo.playerPosition = playerPosition
            state.players[payload.playerIndex].roundTwo.hunterPosition = -1
            state.players[payload.playerIndex].roundTwo.money = state.players[payload.playerIndex].roundTwo.bidding[payload.limit]
            state.players[payload.playerIndex].roundTwo.status = 2
        },
        setRoundTwoNextQuestion (state, payload) {
            state.players[payload.playerIndex].roundTwo.hunterPosition = payload.question.hunter
            state.players[payload.playerIndex].roundTwo.playerPosition = payload.question.player
        },
        setRoundThree (state, payload) {
            state.roundThree[payload.type] += payload.increment
        },
        setRoundThreeCountdown (state, payload) {
            state.roundThree.timer = payload.timer
        },
    },
    plugins: [
        new VuexPersistence().plugin,
        createMutationsSharer({
            predicate: [
                'setRound',
                'setCurrentPlayer',
                'newCountdown',
                'countdown',
                'addMoney',
                'setRoundTwoBidding',
                'setRoundTwoStatus',
                'setRoundTwoLimit',
                'setRoundTwoNextQuestion',
                'setRoundThree',
                'setRoundThreeCountdown',
            ]
        }),
    ]
})

export default store
