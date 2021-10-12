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
                @pageSize = "handlePageSize"
                @currentPage = "handleCurrentPage"
            >
                <template v-slot:cover="{row}">
                    <el-image 
                        style="width: 50px; height: 50px"
                        :src="imgShow + row.cover" 
                        :preview-src-list="[imgShow + row.cover]">
                    </el-image>
                </template>
                <template v-slot:issue="{row}">
                    <span>{{ row.issue?"是":"否" }}</span>
                </template>
                <template v-slot:issueTime="{row}">
                    <span>{{ new Date(row.issueTime).format("yyyy-MM-dd") }}</span>
                </template>
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
import addType from "./components/add-type.vue"
import { mapActions } from "vuex" 
import { imgShow } from "@/assets/utils/config"
export default {
    components: {
        tableOperation,
        appTable,
        addType
    },
    data() {
        return {
            tableData: [],
            imgShow,
            isEdit: false,
            tableHeader: [
                { type: "selection", width: 50, fixed: true },
                { prop: "sort", label: "排序", width: 50 },
                { prop: "title", label: "新闻名称", width: 120 },
                { prop: "cover", label: "新闻背景", width: 120,type:'slot' },
                { prop: "issue", label: "是否发布", width: 120,type:'slot' },
                { prop: "issueTime", label: "新闻时间", width: 120,type:'slot' },
                { prop: "action", label: "操作", width: 120,
                    arr:[
                        {name:"修改",type:"edit",id:1},
                        {name:"删除",type:"delete",id:2},
                    ] 
                },
            ],
             tablePage: {
                pageNo:1,
                pageSize: 20,
            },
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
        ...mapActions("news",["getList","deleteRow"]),
         handlePageSize(pageSize) {
            this.tablePage.pageSize = pageSize;
            this.getTypeList();
        },
        handleCurrentPage(pageNo) {
            this.tablePage.pageNo = pageNo;
            this.getTypeList();
        },
        // 删除表格数据
        handleRowDelete(row) {
             this.$confirm(`是否删除${row.title}？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableSettings.isLoading = true;
                this.deleteRow({id:row.id})
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
            this.getList(this.tablePage)
            .then(
                res=>{
                    this.tableSettings.isLoading = false;
                    if(res.code == 1) {
                        let data = res.data.list.map(i=>{
                            i.issueTime = new Date(i.issueTime);
                            return {
                                ...this.analysisData(i).content,
                                ...i
                            }
                        })
                        this.tableData = data;
                        this.tableSettings.total = Number(res.data.total)?Number(res.data.total):0;
                    }
                }
            )
        },
        // 解析表格数据
        analysisData(item) {
            let data = JSON.parse(JSON.stringify(item));
            data.content = JSON.parse(data.content.replace(/&quot;/g,"\""));
            return data;
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