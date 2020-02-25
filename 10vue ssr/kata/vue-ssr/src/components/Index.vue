<template>
    <div>
        <div>
            Index Page
        </div>
        <div> {{ $store.state.count }} </div>
        <button @click="add">add 1</button>
    </div>
</template>

<script>
    export default {
        methods: {
            add: function() {
                this.$store.commit('add')
            }
        }
    }
</script>

<style lang='scss' scoped>

</style>