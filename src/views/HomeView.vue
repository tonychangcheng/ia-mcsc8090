<template></template>

<script>

export default {
    name: 'HomeView',
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted: function () {
        for (let i = 1; i <= 99999; i++)window.clearInterval(i)
    }
}
</script>
