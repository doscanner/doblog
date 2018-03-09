<template>
    <div>
        <v-head></v-head>
        <v-container></v-container>
    </div>
</template>

<script>
import vHead from "../components/Header.vue";
import vContainer from "../components/Container.vue";
import config from "@/utils/config";
export default {
  components: {
    vHead,
    vContainer
  },
  created() {
    this.$router.push({ path: config.web.module.article.list });
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(to);
    }
  }
};
</script>
