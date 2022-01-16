<template>
  <div id="app">
    <!--     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <header>
      <h1 class="title is-1">Skribblist</h1>
      <h1 class="subtitle">
        Deutsche Wörterlisten für
        <a href="https://skribbl.io/" target="_blank">Skribbl.io</a>
      </h1>
    </header>
    <router-view class="view" />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

#app {
  font-family: "Architects Daughter", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: #586b7e;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

header {
  text-align: center;
  padding-top: 64px;

  .subtitle {
    color: #363636;
    font-weight: 600;

    a {
      color: #42b983;
    }
  }
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
  margin: 24px 0;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.5);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8);
}

.view {
  padding: 64px 15%;
}
</style>
