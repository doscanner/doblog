<template>
  <div class="headerWrapper">
    <header class="header">
      <div class="container">
        <h1>
          <a href="javascript:void(0)" class="router-link-active" @click="handleSelect('','')">个人博客</a>
        </h1>
        <el-menu class="nav" mode="horizontal" style="border-bottom:none" @select="handleSelect">
          <li class="nav-item nav-algolia-search">
            <el-input size="middle" placeholder="请输入内容" class="algolia-search">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </li>
          <template v-for="item in items">
            <el-menu-item class="nav-item" style="line-height:80px;" :index="item.path" :key="item.pid">{{ item.name }}</el-menu-item>
          </template>
        </el-menu>
      </div>
    </header>
  </div>
</template>
<script>
import config from "@/utils/config";
import { getcataloglistbypath } from "@/api/modules/catalog";
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.initCatalog();
  },
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.header .nav:after {
  clear: both;
}

.header .nav:after,
.header .nav:before {
  display: table;
  content: "";
}

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

/* .header .nav-item.lang-item,
.header .nav-item:last-child {
  cursor: default;
  margin-left: 34px;
} */

.header .nav-item.lang-item span,
.header .nav-item:last-child span {
  opacity: 0.8;
}

.header .nav-item.lang-item .nav-lang,
.header .nav-item:last-child .nav-lang {
  cursor: pointer;
  display: inline-block;
  height: 100%;
  color: #888;
}

.header .nav-item.lang-item .nav-lang:hover,
.header .nav-item:last-child .nav-lang:hover {
  color: #409eff;
}

.header .nav-item.lang-item .nav-lang.active,
.header .nav-item:last-child .nav-lang.active {
  font-weight: 700;
  color: #409eff;
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
  color: #333;
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
  .header .nav-gap {
    padding: 0 8px;
  }
  .header .nav-versions {
    display: none;
  }
}
</style>
