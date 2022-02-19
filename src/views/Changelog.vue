<template>
  <div class="container">
    <div class="changelog box">
      <h1 class="subtitle">19. Februar 2022</h1>
      <p>
        <ul class="features">
          <li>
            <b>Vorlagen wurden eingeführt!</b> Damit kannst du Auswahlen von Listen abspeichern und sie zu einem späteren Zeitpunkt wieder auswählen. Somit kannst du Listen zu bestimmten Themen abspeichern und musst sie nicht immer neu zusammenstellen, wenn du sie erneut verwenden willst!
          </li>
          <li>
            Für Schweizer*innen wurde in den Einstellugen eine Option zum Ersetzen aller 'ß' mit 'ss' hinzugefügt.
          </li>
          <li>
            Es wurde ein Fehler behoben, der beim Auswählen gewisser Listen die Webseite unzugänglich machte.
          </li>
        </ul>
      </p>
      <p>
        <b>Neue Listen:</b>
        <ul>
          <li>
            Rund um den Flughafen
          </li>
          <li>
            Rund um die Schule
          </li>
          <li>
            Transformers
          </li>
          <li>
            League of Legends Gegenstände
          </li>
          <li>
            Pokémon (Alle)
          </li>
          <li>
            Harry Potter Zaubersprüche
          </li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Changelog",
  components: {},
  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss">
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.changelog {
  max-width: 610px;

  .features {
    li {
      margin-bottom: 8px;
    }
  }

  .subtitle {
    font-weight: 600;
    text-align: center;
  }

  p {
    margin-bottom: 12px;
  }
  a {
    color: rgb(64, 64, 202);
  }

  ul {
    list-style: inside;
  }
}
</style>