<template>
    <div id="app">
        <div class="title">God of Avalon</div>
        <br />
        <div class="links">
            <router-link class="link" to="/">Home Page</router-link>
            <router-link class="link" to="/createroom">Create Room</router-link>
            <router-link class="link" to="/joinroom">Join Room</router-link>
        </div>
        <!--
        <router-link to="/waitingroom">Waiting Room|</router-link>
        <router-link to="/inroom">In Room</router-link>
        -->

        <br />
        <router-view />
    </div>
</template>

<style lang="scss">
* {
    color: rgba(255, 255, 255, 1);
    font-family: Arial, Helvetica, sans-serif;
}

body {
    margin: 0;
    padding: 0;
    background: rgba(13, 25, 31, 1);
}

input {
    background: rgba(255, 255, 255, 0.05);
    font-size: large;
    outline: none;
    padding: 10px 15px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    margin-top: 5px;
}

button {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    padding: 10px 20px;
    margin: 10px 5px;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.4);
    }

    &:active {
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.5);
    }
}

.title {
    font-size: xx-large;
    font-weight: bolder;
    margin: 1rem auto 0.5rem auto;
    text-align: center;
}

.subtitle {
    margin-top: 0.7rem;
    margin-bottom: 0.5rem;
    font-size: large;
    font-style: italic;
    font-weight: bold;
    text-align: center;
    text-decoration: underline;
}

.disabledButton {
    pointer-events: none;
    text-decoration: line-through;
}

.subsubtitle {
    font-style: italic;
}

.green {
    color: #009fe0;
}

.red {
    color: #e07600;
}

.hidden {
    display: none;
}

#app {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
}

.links {
    margin: 0 auto;
    text-align: center;
}

.link {
    text-decoration: none;
    border: 2px solid rgba(255, 255, 255, 1);
    padding: 7px 9px 7px 9px;
    margin: 0px 5px;
    border-radius: 2px;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    &:active {
        background: rgba(255, 255, 255, 1);
        color: rgba(13, 25, 31, 1);
    }
}

.container {
    border: 2px solid rgba(255, 255, 255, 1);
    padding: 0 10px 10px 10px;
    border-radius: 2px;
    margin: 10px auto;
}
</style>
