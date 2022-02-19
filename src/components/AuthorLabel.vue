<template>
  <div>
    <img :src="getAuthorLinkType(author)" v-if="getAuthorLinkType(author)" />
    <span v-if="author.includes('://')">
      <a :href="author" target="_blank">{{ getAuthorName(author) }}</a></span
    >
    <span v-else>{{ getAuthorName(author) }}</span>
  </div>
</template>

<script>
import twitterIcon from "@/assets/icons/twitter.png";
import instagramIcon from "@/assets/icons/instagram.png";
import discordIcon from "@/assets/icons/discord.png";

export default {
  name: "HelloWorld",
  data() {
    return {
      twitterIcon: twitterIcon,
      instagramIcon: instagramIcon,
      discordIcon: discordIcon,
    };
  },
  props: {
    author: String,
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

<style scoped lang="scss">
img {
  height: 14px;
  margin: 5px 8px 5px 0;
  float: left;
}
</style>
