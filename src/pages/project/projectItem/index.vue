<template>
    <div class = "app-container app-home">
        <table-operation
            @operation = "handleOperation"
            @search = "getItemList"
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
            >
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
            isEdit: false,
            detailDialog: false,
            tableHeader: [
                { type: "selection", width: 50, fixed: true },
                { prop: "sort", label: "排序", width: 50 },
                { prop: "name", label: "项目名称", width: 120 },
                { prop: "content", label: "项目内容", width: 120 },
                { prop: "itemCategoryId", label: "项目所属", width: 120 },
                { prop: "type", label: "项目类型", width: 120 },
                { prop: "cover", label: "项目封面", width: 120 },
                { prop: "action", label: "操作", width: 120,
                    arr:[
                        {name:"详情",type:"detail",id:3},
                        {name:"修改",type:"edit",id:1},
                        {name:"删除",type:"delete",id:2},
                    ] 
                },
            ],
            tableSettings: {
                isLoading: false,
                isPagination: true,
                isSelection: false,
                currentPage: 1,
                total: 0,
                height:null
            },
            addDialog: false,
        }
    },
    created () {
        this.getItemList();
    },
    methods: {
        ...mapActions("project",["deleteItem","getItem"]),
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
            this.getItem()
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
                this.addDialog = true;
                this.isEdit = false;
            }else if(type == 2) {

            }
        }
    }
}
</script>