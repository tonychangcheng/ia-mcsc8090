<template>
    <div id="app">
        <router-link to="/">Home Page</router-link>
        <router-link to="/createroom">Create Room</router-link>
        <router-link to="/joinroom">Join Room</router-link>
        <br />
        <router-view />
    </div>
</template>

<style lang="scss">
* {
    color: rgba(255, 255, 255, 1);
}
body {
    margin: 0;
    padding: 0;
    background: rgba(13, 25, 31, 1);
}
input {
    background: rgba(255, 255, 255, 0.1);
}
button {
    background: rgba(255, 255, 255, 0.1);
}
</style>
