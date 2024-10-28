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

    <h1 style="display: none;">God of Avalon | Play Avalon Online! | 线上阿瓦隆 | 阿瓦隆发牌助手</h1>
    <div class="title">God of Avalon</div>
    <br />
    <div class="links">
      <router-link class="link" style="border-left: 1px solid rgba(255, 255, 255, 1); " to="/">主页</router-link>
      <router-link class="link"
        style="border-left: 1px solid rgba(255, 255, 255, 1); border-right: 1px solid rgba(255, 255, 255, 1);"
        to="/createroom">创建房间</router-link>
      <router-link class="link" style="border-right: 1px solid rgba(255, 255, 255, 1); "
        to="/joinroom">加入房间</router-link>
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
  --bg-size: clamp(150px, 10vw, 300px);
  --bg-offset: calc(var(--bg-size) / -2);

  margin: 0;
  padding: 0;
  background:
    linear-gradient(rgb(21, 30, 36), rgb(21, 30, 36)),
    linear-gradient(155deg, rgba(255, 255, 255, 0.02) 25%, transparent 10%) var(--bg-offset) 0,
    linear-gradient(245deg, rgba(255, 255, 255, 0.02) 25%, transparent 10%) var(--bg-offset) 0,
    linear-gradient(335deg, rgba(255, 255, 255, 0.02) 25%, transparent 10%),
    linear-gradient(65deg, rgba(255, 255, 255, 0.02) 25%, transparent 10%);
  background-blend-mode: overlay;
  background-repeat: repeat;
  background-attachment: fixed;
  background-size: var(--bg-size) var(--bg-size);
}



input {
  background: rgba(255, 255, 255, 0.1);
  font-size: large;
  outline: none;
  padding: 10px 15px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  margin-top: 10px;
  transition: all 0.3s ease-in-out;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:focus {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}


button {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px 5px;
  color: #fff;
  font-size: normal;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

button:hover {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

button:active {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.7);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
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
  // font-style: italic;
  font-weight: bold;
  text-align: center;
  // text-decoration: underline;
}

.disabledButton {
  pointer-events: none;
  text-decoration: line-through;
}

.subsubtitle {
  font-style: italic;
}

.green {
  color: rgb(0, 160, 224);
}

.red {
  color: rgb(224, 118, 0);
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
  margin: 0 auto 20px auto;
  text-align: center;
  padding: 0;
  width: fit-content;
}



.link {
  text-decoration: none;
  padding: 10px 10px 8px 10px;
  margin: 0px 0px;
  border-radius: 0px;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.3s, color 0.3s; // Smooth transition effects

  &:hover {
    background: rgba(255, 255, 255, 0.2);
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


<style>
/* Insert the custom scrollbar CSS here */
::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
  height: 8px; /* Height for horizontal scrollbar */
}

::-webkit-scrollbar-track {
  background: rgba(21, 30, 36, 1); /* Match the site's dark background */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.7); /* Dark grey color for the thumb */
  border-radius: 10px; /* Rounded corners on the thumb */
  border: 2px solid rgba(21, 30, 36, 1); /* Border to blend into the dark background */
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(150, 150, 150, 0.9); /* Lighter grey color when hovering */
}

/* For Firefox */
body {
  scrollbar-width: thin; /* Thin scrollbar width */
  scrollbar-color: rgba(100, 100, 100, 0.7) rgba(21, 30, 36, 1); /* Dark thumb color and dark background */
}

/* Custom element to show scrollbar styling */
.element-with-scrollbar {
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: 200px; /* Limit height for the example */
  background-color: rgba(21, 30, 36, 1); /* Matching dark background */
  color: white; /* Light text for contrast */
  padding: 10px; /* Padding for content */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Optional border for visual separation */
}

/* Optional: Hiding the scrollbar entirely but keep functionality */
.element-with-scrollbar::-webkit-scrollbar {
  display: none;
}

.element-with-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>