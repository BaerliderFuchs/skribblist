<template>
  <div class="container">
    <div class="settings box">
      <section>
      <h1 class="subtitle">Einstellungen</h1>
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

    <section v-if="presets && presets.length" class="preset-section">
      <h1 class="subtitle">Vorlagen verwalten</h1>
      <b-field v-for="preset in presets" :key="preset.name">
        <p>
            <b>{{ preset.name }}</b>
            <ul>
                <li v-for="list in preset.lists" :key="list">{{ list }}</li>
            </ul>
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
    return { replaceSharpS: false, balanceLists: false, presets: undefined };
  },

  created() {
    this.replaceSharpS = localStorage.getItem("replaceSharpS");
    this.balanceLists = localStorage.getItem("balanceLists");
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
  }

  p {
    margin-bottom: 12px;
  }
  a {
    color: rgb(64, 64, 202);
  }
}
</style>