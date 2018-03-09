<template>
    <!-- <el-row>
        <el-col :span="8" v-for="item in tableData" :key="item.pid" style="margin-right:1%">
            
        </el-col>
    </el-row> -->

    <el-row :gutter="20">
        <el-col :span="6" v-for="item in tableData" :key="item.pid">
            <div class="grid-content bg-purple">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.figurepath" class="image">
                    <div style="padding: 14px;">
                        <span>{{item.title}}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ item.createtime }}</time>
                            <el-button type="text" class="button">更多</el-button>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>

</template>
<script>
import util from "@/utils/util";
import config from "@/utils/config";
import { search } from "@/api/modules/article";

export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      select_keyword: "",
      select_catalog: "",
      tableData: [],
      totalCount: 0,
      pageCount: 0,
      rowCount: 0,
      currentDate: new Date()
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //   this.$route.params.pid
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
          if (!ret.success) {
            this.$message.error(ret.msg);
          } else {
            this.totalCount = ret.data.totalcount;
            this.pageCount = ret.data.totalpagecount;
            this.tableData = ret.data.items;
            this.rowCount = ret.data.items.length / 4;
          }
        },
        err => {}
      );
    }
  }
};
</script>
<style>
.time {
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
  /* width: 100%; */
  width: 269px;
  height: 200px;
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
  &:last-child {
    margin-bottom: 0;
  }
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
</style>