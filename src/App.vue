<template>
  <div id="app">
    <header>
      <h1 class="title is-1">Skribblist</h1>
      <h1 class="subtitle">
        Deutsche Wörterlisten für
        <a href="https://skribbl.io/" target="_blank">Skribbl.io</a>
      </h1>
      <nav>
        <router-link to="/">Wörterlisten</router-link> |
        <router-link to="/settings">Einstellungen</router-link> |
        <router-link to="/credits">Credits</router-link> |
        <router-link to="/changelog">Neuerungen</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view" />
    </transition>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

body::-webkit-scrollbar {
  display: none;
}
#app {
  font-family: "Architects Daughter", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: #586b7e;
}

nav {
  color: #363636;

  a {
    font-weight: bold;
    color: #363636;

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
  height: 10px;
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
  padding: 32px 15%;

  @media (max-width: 2048px) {
    padding: 32px 32px;
  }
  @media (max-width: 1024px) {
    padding: 32px 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
