<template>
    <div class = "app-container app-home">
        <table-operation
            @operation = "handleOperation"
             @search = "handleSearch"
        >
        </table-operation>
        <div class = "mt20">
            <app-table
                :data="tableData" 
                :header="tableHeader" 
                :settings="tableSettings" 
                @delete = "handleRowDelete"
                @edit = "handleEdit"
                @detail = "handleDetail"
                @pageSize = "handlePageSize"
                @currentPage = "handleCurrentPage"
                @select = "handleSelect"
            >
                <template v-slot:itemCategoryId="{row}">
                    <span>{{ formartData(row) }}</span>
                </template>
                <template v-slot:cover="{row}">
                    <el-image 
                        style="width: 50px; height: 50px"
                        :src="imgShow + row.cover" 
                        :preview-src-list="[imgShow + row.cover]">
                    </el-image>
                </template>
            </app-table>
        </div>
        <!-- 新增 && 修改 -->
        <add-item 
            :dialogVisible.sync = "addDialog"
            :isEdit = "isEdit"
            ref = "addType_ref"
            @refresh = "getItemList"
        >
        </add-item>
        <!-- 新增 && 修改项目详情 -->
        <add-item-detail 
            :dialogVisible.sync = "detailDialog"
            ref = "addItemDetail_ref"
        >
        </add-item-detail>
    </div>
</template> 
<script>
import tableOperation from "@/components/tableOperation"
import appTable from "@/components/appTable"
import addItem from "../components/add-item.vue"
import addItemDetail from "../components/add-item-detail.vue"
import { mapActions } from "vuex" 
import { imgShow } from "@/assets/utils/config"
export default {
    components: {
        tableOperation,
        appTable,
        addItem,
        addItemDetail
    },
    data() {
        return {
            tableData: [],
            imgShow,
            isEdit: false,
            detailDialog: false,
            tableHeader: [
                { prop: "sort", label: "排序", width: 50 },
                { prop: "name", label: "项目名称", width: 120 },
                { prop: "content", label: "项目内容", width: 120 },
                { prop: "itemCategoryId", label: "项目所属", width: 120,type:"slot" },
                // { prop: "type", label: "项目类型", width: 120 },
                { prop: "cover", label: "项目封面", width: 120,type:"slot" },
                { prop: "action", label: "操作", width: 120,
                    arr:[
                        {name:"详情",type:"detail",id:3},
                        {name:"修改",type:"edit",id:1},
                        {name:"删除",type:"delete",id:2},
                    ] 
                },
            ],
            tablePage: {
                pageNo:1,
                pageSize: 20,
                name:""
            },
            ids:"",
            tableSettings: {
                isLoading: false,
                isPagination: true,
                isSelection: true,
                currentPage: 1,
                total: 0,
                height:null
            },
            addDialog: false,
            typeList:[],
        }
    },
    created () {
        this.getItemList();
        this.getTypeArr();
    },
    methods: {
        ...mapActions("project",["deleteItem","getItem","getType"]),
        handleSearch(keyword) {
            this.tablePage.name = keyword;
            this.getItemList();
        },
        handleSelect(e) {
            if(!e.length) {
                this.ids = "";
                return 
            }
            this.ids = e.map(i=>i.id).toString();
        },
        handlePageSize(pageSize) {
            this.tablePage.pageSize = pageSize;
            this.getItemList();
        },
        handleCurrentPage(pageNo) {
            this.tablePage.pageNo = pageNo;
            this.getItemList();
        },
        //格式化项目所属
        formartData(row) {
            let text = "",item = this.typeList.find(i=>i.id == row.itemCategoryId);
            text = item?item.name:"未知类型"
            return text;
        },
        // 获取项目类型
        getTypeArr() {
            this.getType({
                pageNo:1,
                pageSize: 2000,
            })
            .then(
                res=>{
                    if(res.code == 1) {
                        this.typeList = res.data.list;
                    }
                }
            )
        },
        // 删除表格数据
        handleRowDelete(row) {
             this.$confirm(`是否删除${row.name}？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableSettings.isLoading = true;
                this.deleteItem({id:row.id})
                .then(
                    res=>{
                        if(res.code == 1) {
                            this.getItemList();
                        }
                    }
                )
            })
        },
        // 修改详情
        handleDetail(row) {
            this.detailDialog = true;
            this.$refs.addItemDetail_ref.setRow(row);
        },
        // 修改表格
        handleEdit(row) {
            this.isEdit = true;
            this.addDialog = true;
            this.$nextTick(()=>{
                this.$refs.addType_ref.setRow(row);
            })
        },
        // 获取表格
        getItemList() {
            this.tableSettings.isLoading = true;
            this.getItem(this.tablePage)
            .then(
                res=>{
                    this.tableSettings.isLoading = false;
                    if(res.code == 1) {
                        this.tableData = res.data.list;
                        this.tableSettings.total = Number(res.data.total)?Number(res.data.total):0;
                    }
                }
            )
        },
        /*
        * 表格操作
        * type 1、新增  2、批量删除
        */
        handleOperation(type) {
            if(type == 1) {
                this.isEdit = false;
                this.addDialog = true;
            }else if(type == 3) { // 批量删除
                if(!this.ids) return this.$message.warning("请选择要删除的选项！")
                this.handleRowDelete({ id: this.ids,name:"所选项" })
            }
        }
    }
}
</script>