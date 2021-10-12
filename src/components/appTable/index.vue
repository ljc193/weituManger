<template>
  <div>
    <el-table
      :height="settings.height"
      v-loading="settings.isLoading"
      :border="settings.isBorder"
      @selection-change="e => handleClick('select',e)"
      :data="data"
      style="width: 100%"
    >
      <el-table-column v-if="settings.isSelection" width="55" type="selection" fixed align="center"></el-table-column>
      <el-table-column v-if="settings.isIndex" type="index" :index="1" fixed align="center"></el-table-column>
      <template v-for="(item,index) in header">
        <el-table-column
          v-if="item.prop!=='action'"
          :key="item.prop"
          :type="item.type"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :fixed="item.fixed"
          :show-overflow-tooltip = "item.overflow"
          align="center"
        >
          <template slot-scope="scope">
            <div  v-if="item.type == 'slot'">
              <slot :name = "item.prop" :row = "scope.row" />
            </div>
            <span  v-else>
              {{ scope.row[item.prop] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.prop"
          :label="item.label"
          :min-width="item.width"
          :fixed="item.fixed"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="item.arr">
              <span
                v-for="item2 in item.arr"
                :key="item2.id"
                @click="handleClick(item2.type,scope.row)"
                :style = "{ 
                  color: item2.type=='delete'?'red':item2.type=='edit'?'#409EFF':'#67C23A',
                  cursor: 'pointer',
                  marginRight:'5px'
                }"
              >
                {{ item2.name }}
              </span>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="settings.isPagination"
      background
      style="text-align:right;padding:6px 0"
      @size-change="e=>handleClick('pageSize',e)"
      @current-change="e=>handleClick('currentPage',e)"
      :current-page="currentPage"
      :page-sizes="[5,20, 50, 100, 200]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="settings.total"
    ></el-pagination>
  </div>
</template>

<script>
/* 
    传值说明:
    settings:{  相关配置
        isLoading加载数据时显示动效
        height表格高度
        autoHeight:true 是否自动高度
        isSelection; 是否有多选
        selectionWidth多选的宽度
        isIndex 是否需要序列号,默认不需要
        isBorder:是否加框线,默认添加,
        isPagination:是否添加分页,默认false,
        total: 列表总条数
        currentPage 当前页数
    }
    tableData: { 表格数据}
    tableHeader:{表头字段
        isTemplate 是否使用插槽
        isImagePopover 图片带tooltip
    }

    事件说明:
    handleClick
    参数 type 点击的类型,如
      选择select, 多选时
      编辑edit, 按钮为编辑时
      查看show, 按钮为查看时
      删除delete, 按钮为删除时
      当前条数pageSize, 开启分页时
      当前页数currentPage等 开启分页时
    e 选中项
    i 选中索引

*/

export default {
  name: "",
  props: {
    data: { type: Array, default: () => [] },
    header: { type: Array, required: true },
    settings: {
      type: Object,
      default: () => {
        return {
          height: null,
          isBorder: true,
          isLoading: false,
          isIndex: false,
          isSelection: false,
          isPagination: false,
          currentPage: 1,
          total: 20
        };
      }
    }
  },
  computed: {
    currentPage: function() {
      return this.settings.currentPage;
    }
  },
  watch: {
    settings: {
      handler: function(e) {
        // console.log(e);
        if (typeof e.isBorder === "undefined") e.isBorder = true;
        if (typeof e.total === "undefined") e.total = 20;
      },
      immediate: true
    }
    // currentPage: function(e) {
    //   console.log(e);
    // }
  },
  methods: {
    handleClick(type, e, i) {
      this.$emit(type, e);
    }
  }
};
</script>

<style lang="less" scoped>
  /deep/.el-table {
    th,td {
      padding: 6px 0;
    }
    .el-table__header {
      th {
        background: #f0f2f7e3;
      }
    }
    
  }
</style>
