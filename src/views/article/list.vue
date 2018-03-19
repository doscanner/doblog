<template>
  <div v-if="!isnull(tableData)">
    <el-row :gutter="20" v-for="itemx in totalPageCount(4,tableData)" :key="itemx">
      <el-col :span="6" v-for="(item,index) in pagination(itemx,4,tableData)" :key="index" v-bind:class="'shadow'">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 9px;">
              <img :src="item.figurepath" class="image">
            </div>
            <div style="padding: 14px;">
              <span v-html="item.title">{{item.title}}</span>
              <div class="bottom clearfix" v-if="!isnull(item.tags)">
                <el-tag size="small" type="success" v-for="tag in item.tags.split(',')" :key="tag">{{tag}}</el-tag>
              </div>
              <div class="bottom clearfix">
                <time class="time">{{ item.createtime }}</time>
                <i class="browsenum el-icon-view">{{item.browsenum}}</i>
                <el-button size="small" type="text" class="button" @click="handleDetailClick(item.pid)">详情</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 40, 80]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
  <div v-else>
    <div class="el-table__empty-block">
      <span class="el-table__empty-text">{{loadingtxt}}</span>
    </div>
  </div>
</template>
<script>
import bus from "../../bus";
import util from "@/utils/util";
import config from "@/utils/config";
import { search } from "@/api/modules/article";

export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 20,
      select_keyword: "",
      select_catalog: "",
      tableData: [],
      totalCount: 0,
      pageCount: 0,
      loadingtxt: "加载中..."
    };
  },
  created() {
    this.init();
    var _this = this;
    bus.$on("article-search-catalogpath：", function(data) {
      _this.select_catalog = data;
      if (_this.isnull(data)) {
        _this.pageIndex = 1;
        _this.requestData();
      }
    });
    bus.$on("article-search-keyword-change", function(data) {
      _this.select_keyword = data;
    });
    bus.$on("article-search-keyword", function(data) {
      _this.pageIndex = 1;
      _this.select_keyword = data;
      _this.requestData();
    });
  },
  watch: {
    "$route.path"() {
      var path = util.checkvalue.isnull(this.$route.params.path)
        ? ""
        : this.$route.params.path;
      this.select_catalog = path;
      if (!this.isnull(path)) {
        this.pageIndex = 1;
        this.requestData();
      }
    }
  },
  methods: {
    init() {
      this.requestData();
    },
    requestData() {
      search(
        this.pageIndex,
        this.pageSize,
        this.select_keyword,
        this.select_catalog,
        !util.checkvalue.isnull(this.select_keyword),
        "",
        "",
        ""
      ).then(
        ret => {
          this.loadingtxt = "暂无数据";
          if (!ret.success) {
            this.$message.error(ret.msg);
          } else {
            this.totalCount = ret.data.totalcount;
            this.pageCount = ret.data.totalpagecount;
            this.tableData = ret.data.items;
          }
        },
        err => {
          this.loadingtxt = "暂无数据";
        }
      );
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.requestData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestData();
    },
    pagination(pageNo, pageSize, array) {
      if (this.isnull(array)) {
        return;
      }
      var offset = (pageNo - 1) * pageSize;
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize);
    },
    totalPageCount(pageSize, array) {
      if (this.isnull(array)) {
        return;
      }
      return Math.ceil(array.length / pageSize);
    },
    isnull(value) {
      return util.checkvalue.isnull(value);
    },
    handleDetailClick(pid) {
      this.$router.push({
        path: "/article/detail/" + pid
      });
    }
  }
};
</script>
<style>
.time {
  font-size: 13px;
  color: #999;
}
.browsenum {
  margin-left: 10px;
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 250px;
  height: 180px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-tag + .el-tag {
  margin-left: 5px;
}
.shadow {
  transition: all 0.3s ease-in-out;
  bottom: 0;
  position: relative;
}
.shadow:hover {
  bottom: 6px;
  box-shadow: 0 6px 18px 0 rgba(232, 237, 250, 0.5);
}
.el-table__empty-block {
  position: relative;
  min-height: 60px;
  text-align: center;
  width: 100%;
  height: 100%;
}
.el-table__empty-text {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #909399;
}
.block {
  text-align: right;
}
</style>