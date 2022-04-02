<template>
    <div id="app">
        <div>God of Avalon</div>
        <br />
        <router-link to="/">Home Page</router-link>
        <router-link to="/createroom">Create Room</router-link>
        <router-link to="/joinroom">Join Room</router-link>
        <router-link to="/waitingroom">Waiting Room</router-link>
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
.subtitle {
    font-size: large;
    font-style: italic;
    font-weight: bold;
}
.disabledButton {
    pointer-events: none;
    text-decoration: line-through;
}
</style>
