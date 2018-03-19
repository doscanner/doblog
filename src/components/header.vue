<template>
  <div class="headerWrapper">
    <header class="header" ref="header">
      <div class="container">
        <h1>
          <router-link :to="'/article/list/'" @click.native="handleRouteClick('')">
            <img src="../assets/logo.png" alt="doscanner-logo" class="nav-logo">
          </router-link>
          <!-- <router-link :to="'/article/list/'" @click.native="handleRouteClick('')">个人博客</router-link> -->
        </h1>
        <!-- <a href="https://github.com/doscanner/doblog" target="_blank">
          <img src="../assets/icon-github.png" class="elementdoc" />
        </a> -->
        <ul class="nav">
          <li class="nav-item nav-algolia-search" v-if="isshow">
            <algolia-search></algolia-search>
          </li>
          <li class="nav-item" v-for="item in items" :key="item.pid">
            <router-link active-class="active" :to="'/article/list/'+item.path" @click.native="handleRouteClick(item.path)">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
import bus from "../bus";
import AlgoliaSearch from "./search.vue";
import util from "@/utils/util";
import config from "@/utils/config";
import { getcataloglistbypath } from "@/api/modules/catalog";

export default {
  data() {
    return {
      active: "",
      items: [],
      isshow: true
    };
  },
  components: {
    AlgoliaSearch
  },
  computed: {},
  methods: {
    initCatalog() {
      getcataloglistbypath(config.catalog.path1).then(
        ret => {
          if (!ret.success) {
            this.$message.error(ret.msg);
          } else {
            this.items = ret.data;
          }
        },
        err => {}
      );
    },
    handleRouteClick(path) {
      bus.$emit("article-search-catalogpath：", path);
    }
  },
  created() {
    this.initCatalog();
  },
  watch: {
    $route: function(val, oldVal) {
      if (util.checkvalue.startWith(val.path, "/article/detail")) {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
    }
  }
};
</script>

<style scoped>
.headerWrapper {
  height: 80px;
}

.header {
  height: 80px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 80px;
  z-index: 100;
  position: relative;
}

.header .container {
  height: 100%;
  box-sizing: border-box;
}
.header .nav-lang-spe {
  color: #888;
}
.header h1 {
  margin: 0;
  float: left;
  font-size: 32px;
  font-weight: 400;
}
.header h1 a {
  color: #409eff;
  text-decoration: none;
  display: block;
}
.header h1 span {
  font-size: 12px;
  display: inline-block;
  width: 34px;
  height: 18px;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  text-align: center;
  line-height: 18px;
  vertical-align: middle;
  margin-left: 10px;
  border-radius: 3px;
}
.elementdoc {
  transition: 0.3s;
  display: inline-block;
  line-height: 28px;
  text-align: center;
  color: #c8d6e8;
  background-color: transparent;
  width: 28px;
  height: 28px;
  font-size: 28px;
  vertical-align: middle;
  margin-left: 10px;
}
.elementdoc:hover {
  -ms-transform: scale(1.2);
  transform: scale(1.2);
  color: #8d99ab;
}

.header .nav {
  float: right;
  height: 100%;
  line-height: 80px;
  background: transparent;
  padding: 0;
  margin: 0;
}
.header .nav-gap {
  position: relative;
  width: 1px;
  height: 80px;
  padding: 0 20px;
}
.header .nav-gap:before {
  content: "";
  position: absolute;
  top: calc(50% - 8px);
  width: 1px;
  height: 16px;
  background: #ebebeb;
}
.header .nav-logo-small,
.header .nav-logo {
  vertical-align: sub;
  height: 48px;
}
.header .nav-logo-small {
  display: none;
}
.header .nav-item {
  margin: 0;
  float: left;
  list-style: none;
  position: relative;
  cursor: pointer;
}
.header .nav-item a.active:after {
  content: "";
  display: inline-block;
  position: absolute;
  bottom: 15px;
  left: calc(50% - 7px);
  width: 14px;
  height: 4px;
  background: #409eff;
}
.header .nav-item a {
  text-decoration: none;
  color: #888;
  display: block;
  padding: 0 22px;
}
.header .nav-item a.active,
.header .nav-item a:hover {
  color: #333;
}
.header .nav-item.nav-algolia-search {
  cursor: default;
}

.nav-dropdown {
  margin-bottom: 6px;
  padding-left: 18px;
  width: 100%;
}
.nav-dropdown span {
  display: block;
  width: 100%;
  font-size: 16px;
  color: #888;
  line-height: 40px;
  transition: 0.2s;
  padding-bottom: 6px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.nav-dropdown span:hover {
  cursor: pointer;
}
.nav-dropdown i {
  transition: 0.2s;
  font-size: 12px;
  color: #979797;
  -ms-transform: translateY(-2px);
  transform: translateY(-2px);
}
.nav-dropdown.is-active i,
.nav-dropdown.is-active span,
.nav-dropdown:hover i,
.nav-dropdown:hover span {
  color: #409eff;
}
.nav-dropdown.is-active i {
  -ms-transform: rotate(180deg) translateY(3px);
  transform: rotate(180deg) translateY(3px);
}
.nav-dropdown-list {
  width: auto;
}
@media (max-width: 850px) {
  .header .nav-logo {
    display: none;
  }
  .header .nav-logo-small {
    display: inline-block;
  }
  .header .nav-item {
    margin-left: 6px;
  }
  .header .nav-item a {
    padding: 0 5px;
  }
  .header .nav-item.lang-item,
  .header .nav-item:last-child {
    margin-left: 10px;
  }
  .header .nav-algolia-search,
  .header .nav-theme-switch {
    display: none;
  }
}
@media (max-width: 700px) {
  .header .container {
    padding: 0 12px;
  }
  .header .nav-item a {
    font-size: 12px;
    vertical-align: top;
  }
  .header .nav-item.lang-item {
    height: 100%;
  }
  .header .nav-item.lang-item .nav-lang {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
  .header .nav-item.lang-item .nav-lang span {
    padding-bottom: 0;
  }
  .header .nav-dropdown {
    padding: 0;
  }
  .header .nav-dropdown span {
    font-size: 12px;
  }
  .header .nav-gap {
    padding: 0 8px;
  }
  .header .nav-versions {
    display: none;
  }
}
</style>
