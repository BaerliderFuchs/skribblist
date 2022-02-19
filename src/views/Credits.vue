<template>
  <div class="container">
    <div class="credits box">
      <h1 class="subtitle">
        Grosses Dankeschön an alle Ersteller*innen der Wörterlisten!
      </h1>
      <table>
        <th class="name-th"></th>
        <th>Wörter</th>

        <th>Listen</th>

        <tr v-for="author in authors" :key="author.link">
          <td>
            <AuthorLabel :author="author.link"></AuthorLabel>
          </td>
          <td class="number-cell">
            {{ author.words }}
          </td>
          <td class="number-cell">
            {{ author.lists }}
          </td>
        </tr>
      </table>

      <div class="creator">
        <p>
          Falls du eine Wörterliste beitragen willst oder einen Fehler melden
          möchtest, schreib mir auf Discord!
        </p>
        <AuthorLabel class="contact" author="BaerliderFuchs#3582"></AuthorLabel>
      </div>
    </div>
  </div>
</template>

<script>
import wordlistsJson from "@/wordsets.json";
import AuthorLabel from "@/components/AuthorLabel.vue";

export default {
  name: "Credits",
  components: { AuthorLabel },
  data() {
    return {
      wordlists: wordlistsJson,
      authors: [],
    };
  },

  created() {
    this.wordlists.forEach((wordlist) => {
      if (wordlist.authors) {
        wordlist.authors.forEach((wordlistAuthor) => {
          let authorAlreadyExists = false;
          this.authors.forEach((author) => {
            if (author.link == wordlistAuthor) authorAlreadyExists = true;
          });
          if (!authorAlreadyExists) {
            this.authors.push({
              link: wordlistAuthor,
              words: 0,
              lists: 0,
            });
          }
        });
      }
    });
    this.wordlists.forEach((wordlist) => {
      if (wordlist.authors) {
        wordlist.authors.forEach((wordlistAuthor) => {
          this.authors.forEach((author, i) => {
            if (author.link == wordlistAuthor) {
              this.authors[i].words += Math.floor(
                (wordlist.words.split(",").length - 1) / wordlist.authors.length
              );
              this.authors[i].lists += 1;
            }
          });
        });
      }
    });
    this.authors.sort(function (a, b) {
      return b.words - a.words;
    });
  },

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
.credits {
  text-align: center;
  max-width: 610px;

  a {
    color: rgb(64, 64, 202);
  }

  table {
    margin: auto;
  }

  table,
  th,
  td {
    text-align: left;
    border: 1px solid rgb(199, 199, 199);
  }

  th {
    background: rgb(241, 241, 241);
  }

  .name-th {
    border-top-color: transparent;
    border-left-color: transparent;
    background: transparent;
  }

  td,
  th {
    padding: 8px 12px;
  }

  .number-cell {
    text-align: right;
  }
}

.creator {
  margin: 20px 0 28px 0;

  .contact {
    margin-top: 9px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>