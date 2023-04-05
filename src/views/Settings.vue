<template>
  <div class="container">
    <div class="settings box">
      <section class="settings-section">
      <h1 class="subtitle">Wörter kopieren</h1>
        <b-field class="setting">
          <b-switch
            :value="true"
            type="is-info"
            v-model="replaceSharpS"
            :input="toggleSetting('replaceSharpS')"
            ><b>Scharfes S (ß) ersetzen</b></b-switch
          >
        </b-field>
        Ist dies aktiviert, werden beim Kopieren der Wörter alle 'ẞ' zu 'ss'
        umgewandelt

        <b-field class="setting">
          <b-switch
            :value="true"
            type="is-info"
            v-model="balanceLists"
            :input="toggleSetting('balanceLists')"
            ><b>Ausgewählte Listen ausbalancieren</b></b-switch
          >
        </b-field>
        Ist dies aktiviert, werden von grösseren ausgewählten Listen einige
        zufällige Wörter entfernt, damit deren Wörter im Verhältnis zu kleineren
        Listen nicht zu häufig auftreten
      </section>

      <h1 class="subtitle">Anzeige</h1>
      <section class="settings-section">

        <b-field class="setting">
          <b-switch
            :value="true"
            type="is-info"
            v-model="showCategories"
            :input="toggleSetting('showCategories')"
            ><b>Kategorien anzeigen</b></b-switch
          >
        </b-field>
        Ist dies aktiviert, werden die Kategorien der Wörterlisten angezeigt. Durch einen Klick auf eine Kategorie kann danach gefiltert werden.
      </section>

    <section v-if="presets && presets.length" class="settings-section preset-section">
      <h1 class="subtitle">Deine Vorlagen</h1>
      <b-field v-for="preset in presets" :key="preset.name">
        <p>
            <b>{{ preset.name }}</b>
            <ul>
            </ul>
                <b-taglist>
                <b-tag v-for="list in preset.lists" :key="list">{{ list }}</b-tag>
    </b-taglist>
        </p>
        <b-button
          icon-right="delete"
          type="is-danger"
          size="is-small"
          class="delete-button"
          @click="deletePreset(preset)"
        />
      </b-field>
    </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {},
  data() {
    return {
      replaceSharpS: false,
      balanceLists: false,
      showCategories: false,
      presets: undefined,
    };
  },

  created() {
    this.replaceSharpS = localStorage.getItem("replaceSharpS");
    this.balanceLists = localStorage.getItem("balanceLists");
    this.showCategories = localStorage.getItem("showCategories");
    this.presets = JSON.parse(localStorage.getItem("presets"));
  },

  methods: {
    toggleSetting(settingName) {
      switch (settingName) {
        case "replaceSharpS":
          localStorage.setItem(settingName, this.replaceSharpS);
          break;
        case "balanceLists":
          localStorage.setItem(settingName, this.balanceLists);
          break;
        case "showCategories":
          localStorage.setItem(settingName, this.showCategories);
          break;
        default:
          break;
      }
    },
    deletePreset(value) {
      this.$buefy.dialog.confirm({
        message: "Möchtest du diese Vorlage wirklich löschen?",
        confirmText: "Löschen",
        cancelText: "Abbrechen",
        onConfirm: () => {
          this.$buefy.toast.open({
            message: `Vorlage gelöscht`,
            type: "is-success",
          });

          this.presets = this.presets.filter(function (item) {
            return item !== value;
          });

          localStorage.setItem("presets", JSON.stringify(this.presets));

          this.presets = JSON.parse(localStorage.getItem("presets"));
        },
      });
    },
  },
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
.settings {
  max-width: 610px;

  .preset-section {
    margin-top: 24px;

    .delete-button {
      margin-left: auto;
      float: right;
    }
  }

  ul {
    list-style: inside;
  }

  .setting {
    margin: 12px 0 0 0;
  }

  .subtitle {
    font-weight: 600;
    text-align: center;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 12px;
  }
  a {
    color: rgb(64, 64, 202);
  }
}
.settings-section {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0px;
  }
}
</style>