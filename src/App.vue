<!--
 Copyright (C) 2022 Zijun Yang <zijun.yang@outlook.com>
 
 This file is part of God of Avalon Frontend.
 
 God of Avalon Frontend is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 God of Avalon Frontend is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with God of Avalon Frontend.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div id="app">
    <div class="title">God of Avalon</div>
    <br />
    <div class="links">
      <router-link class="link" to="/">Home Page</router-link>
      <router-link class="link" to="/createroom">Create Room</router-link>
      <router-link class="link" to="/joinroom">Join Room</router-link>
    </div>
    <hr id="theOnlyHr">
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

#app {
  max-width: 420px;
  margin: 0 auto;
}

hr {
  border: none;
  border-top: 1px dashed #888;
  color: #fff;
  overflow: visible;
  text-align: center;
  height: 0px;
}

#theOnlyHr {
  margin: 10px 0 -19px 0;
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
  margin: 1rem auto 0rem auto;
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
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 7px;
}

.links {
  margin: 0 auto;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 1);
  padding: 7px 0px 6px 0px;
  width: fit-content;
}

.link {
  text-decoration: none;
  padding: 7px 10px 7px 10px;
  margin: 0px 0px;
  border-radius: 0px;
  border-left: 0.5px solid rgba(255, 255, 255, 1);
  border-right: 0.5px solid rgba(255, 255, 255, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 1);
    color: rgba(13, 25, 31, 1);
  }
}

.link.router-link-exact-active {
  background: rgba(255, 255, 255, 1);
  color: rgba(13, 25, 31, 1);
}

.container {
  border: 1px solid rgba(255, 255, 255, 1);
  padding: 0 7px 7px 7px;
  border-radius: 2px;
  margin: 10px auto;
}
</style>
