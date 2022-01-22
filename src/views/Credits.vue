<template>
  <div>
    <div class="credits box">
      <h1 class="subtitle">
        Grosses Dankeschön an alle Ersteller*innen der Wörterlisten!
      </h1>
      <table>
        <th class="name-th"></th>
        <th>Wörter</th>

        <th>Listen</th>

        <tr v-for="author in authors" :key="author">
          <td>
            <img :src="getAuthorLinkType(author.link)" />
            <a
              v-if="author.link.includes('://')"
              :href="author.link"
              target="_blank"
              >{{ getAuthorName(author.link) }}</a
            >
            <span v-else>{{ getAuthorName(author.link) }}</span>
          </td>
          <td class="number-cell">
            {{ author.words }}
          </td>
          <td class="number-cell">
            {{ author.lists }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import wordlistsJson from "@/wordsets.json";
import twitterIcon from "@/assets/icons/twitter.png";
import instagramIcon from "@/assets/icons/instagram.png";
import discordIcon from "@/assets/icons/discord.png";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      twitterIcon: twitterIcon,
      instagramIcon: instagramIcon,
      discordIcon: discordIcon,
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

  methods: {
    getAuthorName(author) {
      return author.split("/")[author.split("/").length - 1];
    },
    getAuthorLinkType(link) {
      if (link.includes("twitter")) return this.twitterIcon;
      if (link.includes("instagram")) return this.instagramIcon;
      if (link.includes("#")) return this.discordIcon;
    },
  },
};
</script>

<style lang="scss">
.credits {
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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

    img {
      float: left;
      height: 14px;
      margin: 5px 8px 5px 0;
    }
  }

  .number-cell {
    text-align: right;
  }
}
</style>