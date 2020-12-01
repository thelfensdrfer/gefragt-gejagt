<template>
    <div>
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

}
</script>

<style scoped>

</style>
