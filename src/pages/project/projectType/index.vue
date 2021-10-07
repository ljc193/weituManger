<template>
    <div class = "app-container app-home">
        <table-operation
            @operation = "handleOperation"
            @search = "getTypeList"
        >
        </table-operation>
        <div class = "mt20">
            <app-table
                :data="tableData" 
                :header="tableHeader" 
                :settings="tableSettings" 
                @delete = "handleRowDelete"
                @edit = "handleEdit"
            >
            </app-table>
        </div>
        <!-- 新增 && 修改 -->
        <add-type 
            :dialogVisible.sync = "addDialog"
            :isEdit = "isEdit"
            ref = "addType_ref"
            @refresh = "getTypeList"
        >
        </add-type>
    </div>
</template> 
<script>
import tableOperation from "@/components/tableOperation"
import appTable from "@/components/appTable"
import addType from "../components/add-type.vue"
import { mapActions } from "vuex" 
export default {
    components: {
        tableOperation,
        appTable,
        addType
    },
    data() {
        return {
            tableData: [],
            isEdit: false,
            tableHeader: [
                { type: "selection", width: 50, fixed: true },
                { prop: "sort", label: "排序", width: 50 },
                { prop: "name", label: "类别中文名称", width: 120 },
                { prop: "englishName", label: "类别英文名称", width: 120 },
                { prop: "action", label: "操作", width: 120,
                    arr:[
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
        this.getTypeList();
    },
    methods: {
        ...mapActions("project",["getType","deleteType"]),
        // 删除表格数据
        handleRowDelete(row) {
             this.$confirm(`是否删除${row.name}？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableSettings.isLoading = true;
                this.deleteType({id:row.id})
                .then(
                    res=>{
                        if(res.code == 1) {
                            this.getTypeList();
                        }
                    }
                )
            })
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
        getTypeList() {
            this.tableSettings.isLoading = true;
            this.getType()
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