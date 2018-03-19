<template>
    <div>
        <header class="am-g my-head">
            <div class="am-u-sm-12 am-article">
                <h1 class="am-article-title">{{single.title}}</h1>
                <p class="am-article-meta">发布时间：{{single.createtime}}&nbsp;&nbsp;&nbsp;&nbsp;阅读量：{{single.browsenum}}</p>
            </div>
        </header>
        <hr class="am-article-divider" />
        <div class="am-g am-g-fixed">
            <div class="am-u-md-9 am-u-md-push-3">
                <div class="am-g">
                    <div class="am-u-sm-11 am-u-sm-centered">
                        <div class="am-cf am-article" v-html="single.content">
                            {{single.content}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="am-u-md-3 am-u-md-pull-9 my-sidebar">
                <div class="am-offcanvas" id="sidebar">
                    <div class="am-offcanvas-bar">
                        <ul class="am-nav">
                            <!-- <li>
                                <a href="#">永远的蝴蝶</a>
                            </li> -->
                            <li class="am-nav-header">分类</li>
                            <li v-for="catalog in single.catalogs" :key="catalog.pid">
                                <a href="javascript:void(0)">{{catalog.name}}</a>
                            </li>
                            <li class="am-nav-header">标签</li>
                            <li v-for="tag in single.tags.split(',')" :key="tag">
                                <a href="javascript:void(0)">{{tag}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import util from "@/utils/util";
import { getsingle, updatebrowsenum } from "@/api/modules/article";

export default {
  data() {
    return {
      single: {
        title: "",
        content: "",
        tags: "",
        catalogs: [],
        createtime: "",
        browsenum: 0
      }
    };
  },
  created() {
    this.init();
  },
  watch: {},
  methods: {
    init() {
      var id = this.$route.params.id;
      if (util.checkvalue.isnull(id) || id == 1) {
        return;
      }
      this.getdata(id);
      this.updatenum(id);
    },
    getdata(id) {
      getsingle(id).then(
        ret => {
          if (!ret.success) {
            this.$message.error(ret.msg);
          } else {
            if (!util.checkvalue.isnull(ret.data)) {
              this.single.title = ret.data.title;
              this.single.content = ret.data.content;
              this.single.tags = ret.data.tags;
              this.single.catalogs = ret.data.catalogs;
              this.single.createtime = ret.data.createtime;
              this.single.browsenum = ret.data.browsenum;
            }
          }
        },
        err => {}
      );
    },
    updatenum(id) {
      updatebrowsenum(id).then(
        ret => {
          if (!ret.success) {
            this.$message.error(ret.msg);
          } else {
          }
        },
        err => {}
      );
    }
  }
};
</script>


<style lang="css">
@import "../../../static/css/amazeui.min.css";
@media only screen and (min-width: 641px) {
  .am-offcanvas {
    display: block;
    position: static;
    background: none;
  }

  .am-offcanvas-bar {
    position: static;
    width: auto;
    background: none;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .am-offcanvas-bar:after {
    content: none;
  }
}

@media only screen and (max-width: 640px) {
  .am-offcanvas-bar .am-nav > li > a {
    color: #ccc;
    border-radius: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .am-offcanvas-bar .am-nav > li > a:hover {
    background: #404040;
    color: #fff;
  }

  .am-offcanvas-bar .am-nav > li.am-nav-header {
    color: #777;
    background: #404040;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    font-weight: 400;
    font-size: 75%;
  }

  .am-offcanvas-bar .am-nav > li.am-active > a {
    background: #1a1a1a;
    color: #fff;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .am-offcanvas-bar .am-nav > li + li {
    margin-top: 0;
  }
}

.my-head {
  text-align: center;
}

.my-button {
  position: fixed;
  top: 0;
  right: 0;
  border-radius: 0;
}
.my-sidebar {
  padding-right: 0;
  border-right: 1px solid #eeeeee;
}
</style>