<template>
  <div class="home">
    <div class="column">
      <div class="column-header">
        <h1 class="title">
          Bibliothek
          <b-tooltip
            label="Durchschnittliche Anzahl von Wörtern pro Liste"
            type="is-light"
            multilined
            class="float-right-h1"
          >
            <span>Ø {{ Math.round(averageAmountOfWords * 100) / 100 }}</span>
          </b-tooltip>
        </h1>
        <div class="search-container">
          <b-input
            class="search"
            v-model="search"
            placeholder="Suche..."
          ></b-input>
          <b-field class="filter" label="Kategorien">
            <b-select placeholder="Kategorien" v-model="filter">
              <option
                v-for="category in categories"
                :value="category"
                :key="category"
              >
                {{ category }}
              </option>
            </b-select>
          </b-field>
          <b-field class="filter" label="Sortierung">
            <b-select
              placeholder="Sortierung"
              v-model="sort"
              @input="sortLibrary()"
            >
              <option v-for="order in orders" :value="order" :key="order">
                {{ order }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="scroll-container">
        <!--       <draggable
        v-model="wordlists"
        group="wordlists"
        :sort="false"
        :emptyInsertThreshold="500"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
      > -->
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <section
            class="card-container"
            v-for="(wordlist, index) in wordlists"
            :key="index"
          >
            <div
              v-if="
                wordlist.name.toLowerCase().includes(search.toLowerCase()) &&
                (wordlist.categories.includes(filter) || filter == 'Alle')
              "
            >
              <div class="toggle">
                <b-button
                  type="is-success"
                  icon-right="plus"
                  @click="enableWordlist(index)"
                />
              </div>
              <b-collapse
                class="card"
                animation="slide"
                :open="false"
                aria-id="contentIdForA11y3"
              >
                <template #trigger="props">
                  <div
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3"
                  >
                    <p class="card-header-title">
                      {{ wordlist.name
                      }}<span class="float-right"
                        >{{ wordlist.words.split(",").length - 1 }} Wörter</span
                      >
                    </p>
                    <a class="card-header-icon">
                      <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                      </b-icon>
                    </a>
                  </div>
                </template>
                <div class="card-content">
                  <div class="content">
                    <p>{{ wordlist.words }}</p>
                    <p v-if="wordlist.authors">
                      <b>Liste von: </b><br />
                      <span
                        v-for="author in wordlist.authors"
                        :key="author"
                        class="author"
                      >
                        <AuthorLabel :author="author"></AuthorLabel>
                      </span>
                    </p>
                  </div>
                </div>
              </b-collapse>
            </div>
          </section>
        </transition-group>
        <!--       </draggable>
 -->
      </div>
    </div>
    <div class="column">
      <div class="column-header">
        <h1 class="title">
          Ausgewählt
          <b-tooltip
            label="Anzahl ausgewählter Listen"
            type="is-light"
            class="float-right-h1"
          >
            <span class="float-right-h1">
              {{ enabledWordlists.length }}/{{ totalAmountOfLists }}
            </span>
          </b-tooltip>
        </h1>
        <div class="options-container">
          <b-button
            type="is-danger"
            @click="disableAllLists()"
            :disabled="totalWordCount < 1"
            icon-left="delete"
          >
            Alle entfernen
          </b-button>

          <b-button
            class="save-preset-button"
            label="Auswahl speichern"
            type="is-warning"
            :disabled="totalWordCount < 1"
            icon-left="bookmark"
            @click="savePreset()"
          />

          <b-button
            class="copy-button"
            type="is-success"
            @click="copyAll()"
            :disabled="totalWordCount < 1"
            icon-left="content-copy"
          >
            {{ totalWordCount }} Wörter kopieren
          </b-button>
        </div>
      </div>
      <div class="scroll-container">
        <!--       <draggable
        class="draggable-container"
        v-model="enabledWordlists"
        group="wordlists"
        :sort="false"
        :emptyInsertThreshold="500"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
      > -->
        <transition-group
          type="transition"
          :name="!drag ? 'flip-list' : null"
          v-if="enabledWordlists.length"
        >
          <section
            class="card-container"
            v-for="(wordlist, index) in enabledWordlists"
            :key="index"
          >
            <div>
              <div class="toggle">
                <b-button
                  type="is-danger"
                  icon-right="minus"
                  @click="disableWordlist(index)"
                />
              </div>
              <b-collapse
                class="card"
                animation="slide"
                :open="false"
                aria-id="contentIdForA11y3"
              >
                <template #trigger="props">
                  <div
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3"
                  >
                    <p class="card-header-title">
                      {{ wordlist.name
                      }}<span class="float-right"
                        >{{ wordlist.words.split(",").length - 1 }} Wörter</span
                      >
                    </p>
                    <a class="card-header-icon">
                      <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                      </b-icon>
                    </a>
                  </div>
                </template>

                <div class="card-content">
                  <div class="content">
                    <p>{{ wordlist.words }}</p>
                    <p v-if="wordlist.authors">
                      <b>Liste von: </b><br />
                      <span
                        v-for="author in wordlist.authors"
                        :key="author"
                        class="author"
                      >
                        <AuthorLabel :author="author"></AuthorLabel>
                      </span>
                    </p>
                  </div>
                </div>
              </b-collapse>
            </div>
          </section>
        </transition-group>
        <div v-else class="select-preset-container">
          <h1 v-if="presets && presets.length" class="subtitle">
            Wähle eine Vorlage aus:
          </h1>
          <b-field v-if="presets && presets.length">
            <b-select
              placeholder="Vorlage auswählen"
              v-model="selectedPreset"
              :input="loadPreset()"
            >
              <option
                v-for="preset in presets"
                :value="preset"
                :key="preset.name"
              >
                {{ preset.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <!--       </draggable>
 -->
      </div>
    </div>
  </div>
</template>

<script>
import wordlistsJson from "@/wordsets.json";
import twitterIcon from "@/assets/icons/twitter.png";
import instagramIcon from "@/assets/icons/instagram.png";
import discordIcon from "@/assets/icons/discord.png";
import AuthorLabel from "@/components/AuthorLabel.vue";

/* import draggable from "vuedraggable";
 */
export default {
  name: "Home",
  components: {
    /* draggable */
    AuthorLabel,
  },
  data() {
    return {
      twitterIcon: twitterIcon,
      instagramIcon: instagramIcon,
      discordIcon: discordIcon,
      wordlists: wordlistsJson,
      totalAmountOfLists: 0,
      averageAmountOfWords: 0,
      enabledWordlists: [],
      categories: [],
      totalWordCount: 0,
      presets: undefined,
      selectedPreset: undefined,
      search: "",
      drag: false,
      filter: "Alle",
      orders: [
        "Aplhabetisch ↓",
        "Aplhabetisch ↑",
        "Anzahl Wörter ↓",
        "Anzahl Wörter ↑",
      ],
      sort: "Aplhabetisch ↓",
    };
  },

  created() {
    this.presets = JSON.parse(localStorage.getItem("presets"));

    this.sortLibrary();
    this.categories.push("Alle");
    this.wordlists.forEach((wordlist) => {
      this.averageAmountOfWords += wordlist.words.split(",").length - 1;
      wordlist.categories.forEach((category) => {
        if (!this.categories.includes(category)) this.categories.push(category);
      });
    });
    this.totalAmountOfLists = this.wordlists.length;
    this.averageAmountOfWords /= this.totalAmountOfLists;

    this.categories.sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    let selectedLists = JSON.parse(localStorage.getItem("selectedLists"));
    if (selectedLists.length) {
      selectedLists.forEach((selectedList) => {
        this.wordlists.forEach((wordlist, i) => {
          if (selectedList == wordlist.name) this.enableWordlist(i);
        });
      });
    }
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "wordlists",
        disabled: false,
        ghostClass: "ghost",
        sort: false,
      };
    },
  },
  methods: {
    async copyAll() {
      let finalWordlist = "";
      if (JSON.parse(localStorage.getItem("balanceLists"))) {
        finalWordlist = this.balanceWordlists();
      } else {
        this.enabledWordlists.forEach((wordlist) => {
          finalWordlist = finalWordlist.concat(wordlist.words);
        });
      }

      if (JSON.parse(localStorage.getItem("replaceSharpS")))
        finalWordlist = finalWordlist.replace(/ß/g, "ss");

      try {
        await navigator.clipboard.writeText(finalWordlist);
        this.$buefy.toast.open({
          message: `${this.totalWordCount} Wörter in die Zwischenablage kopiert!`,
          type: "is-success",
        });
      } catch ($e) {
        this.$buefy.toast.open({
          message: "Etwas ist schief gelaufen",
          type: "is-danger",
        });
      }
    },
    disableAllLists() {
      this.disableWordlist(0);
      if (this.enabledWordlists.length) {
        this.disableAllLists();
      }
    },
    getTotalWordCount() {
      let wordCount = 0;
      if (JSON.parse(localStorage.getItem("balanceLists"))) {
        this.totalWordCount = this.balanceWordlists().split(",").length - 1;
      } else {
        this.enabledWordlists.forEach((wordlist) => {
          wordCount += wordlist.words.split(",").length - 1;
        });
        this.totalWordCount = wordCount;
      }
    },
    disableWordlist(i) {
      this.wordlists.push(this.enabledWordlists[i]);
      this.enabledWordlists = this.enabledWordlists.filter(
        (wordlist) => wordlist !== this.enabledWordlists[i]
      );
      this.getTotalWordCount();
      this.sortLibrary();
      this.saveToLocalStorage();
    },
    enableWordlist(i) {
      this.enabledWordlists.push(this.wordlists[i]);
      this.wordlists = this.wordlists.filter(
        (wordlist) => wordlist !== this.wordlists[i]
      );
      this.getTotalWordCount();
      this.saveToLocalStorage();
    },
    sortLibrary() {
      switch (this.sort) {
        case this.orders[1]:
          this.wordlists.sort(function (a, b) {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
          break;
        case this.orders[2]:
          this.wordlists.sort(function (a, b) {
            return b.words.split(",").length - a.words.split(",").length;
          });
          break;
        case this.orders[3]:
          this.wordlists.sort(function (a, b) {
            return a.words.split(",").length - b.words.split(",").length;
          });
          break;
        default:
          this.wordlists.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          break;
      }
    },
    balanceWordlists() {
      let min = 100000;
      let max = 0;
      let avg = 0;

      let finalWordString = "";

      this.enabledWordlists.forEach((wordlist) => {
        let length = wordlist.words.split(",").length + 1;
        if (length > max) max = length;
        if (length < min) min = length;
        avg += length;
      });
      avg = Math.round(avg / this.enabledWordlists.length);

      this.enabledWordlists.forEach((wordlist) => {
        if (wordlist.words.split(",").length + 1 < avg) {
          finalWordString += wordlist.words;
          return;
        }
        let wordArray = wordlist.words.split(",");
        wordArray.pop();
        while (wordArray.length >= avg - 1) {
          wordArray.splice(Math.floor(Math.random() * wordArray.length), 1);
        }
        let newWordlistString = "";
        wordArray.forEach((word) => {
          newWordlistString += word + ", ";
        });
        finalWordString += newWordlistString;
      });

      return finalWordString;
    },
    saveToLocalStorage() {
      var selectedLists = [];
      if (this.enabledWordlists.length) {
        this.enabledWordlists.forEach((wordlist) => {
          selectedLists.push(wordlist.name);
        });
      }
      localStorage.setItem("selectedLists", JSON.stringify(selectedLists));
    },
    savePreset() {
      this.$buefy.dialog.prompt({
        message: `Gib deiner Vorlage einen Namen:`,
        confirmText: "Speichern",
        cancelText: "Abbrechen",
        inputAttrs: {
          placeholder: "",
          maxlength: 30,
        },
        trapFocus: true,
        onConfirm: (value) => {
          this.$buefy.toast.open({
            message: `Vorlage "${value}" wurde erstellt`,
            type: "is-success",
          });

          var selectedLists = [];
          if (this.enabledWordlists.length) {
            this.enabledWordlists.forEach((wordlist) => {
              selectedLists.push(wordlist.name);
            });
          }
          let presets = localStorage.getItem("presets")
            ? JSON.parse(localStorage.getItem("presets"))
            : [];
          presets.push({ name: value, lists: selectedLists });
          localStorage.setItem("presets", JSON.stringify(presets));

          this.presets = JSON.parse(localStorage.getItem("presets"));
        },
      });
    },
    loadPreset() {
      let preset = this.selectedPreset;
      preset?.lists.forEach((list) => {
        this.wordlists.forEach((wordlist, i) => {
          if (list == wordlist.name) this.enableWordlist(i);
        });
      });
      this.selectedPreset = undefined;
    },
  },
};
</script>

<style lang="scss">
.float-right-h1 {
  float: right;
}
.home {
  display: flex;
  flex-direction: row;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}

.column {
  width: 50%;

  &:first-of-type {
    border-right: 2px dashed black;
  }

  .column-header {
    position: relative;
    background: #586b7e;
    padding-bottom: 12px;
    border-bottom: 2px dashed black;
    height: 114px;

    .search-container {
      overflow-x: auto;
      display: flex;
      flex-direction: row;

      .search {
        flex: auto;
        min-width: 200px;
      }
      .filter {
        margin-top: -32px;
        margin-left: 24px;
      }
    }

    .options-container {
      overflow-x: auto;
      display: flex;
      flex-direction: row;

      .save-preset-button {
        margin: 0 24px;
      }

      .tooltip {
        position: static;
      }

      .copy-button {
        margin-left: auto;
      }
    }
  }

  .scroll-container {
    height: 67vh;
    overflow-y: scroll;
    padding: 0 8px;
  }
}
.draggable-container {
  height: 200px;
}
.toggle {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
}

.card {
  margin: 24px 0;
  transition: 0.2s;

  a {
    color: rgb(64, 64, 202);
  }
}
.disabled {
  opacity: 0.6;
}
.float-right {
  position: absolute;
  right: 60px;
  font-weight: normal;
}
.card-container {
  position: relative;
}

.select-preset-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .subtitle {
    color: #363636;
    font-weight: 600;
  }
}
</style>