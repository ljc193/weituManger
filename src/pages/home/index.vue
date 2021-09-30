<template>
    <div class = "app-container app-home">
        <table-operation></table-operation>
        <div class = "mt20">
            <app-table
                :data="tableData" 
                :header="tableHeader" 
                :settings="tableSettings" 
            >
            </app-table>
        </div>
    </div>
</template> 
<script>
import tableOperation from "@/components/tableOperation"
import appTable from "@/components/appTable"
export default {
    components: {
        tableOperation,
        appTable
    },
    data() {
        return {
            tableData: [],
            tableHeader: [
                { type: "selection", width: 50, fixed: true },
                { prop: "t0", label: "排序", width: 50 },
                { prop: "t1", label: "项目名称", width: 120 },
                { prop: "t2", label: "地点", width: 120 },
                { prop: "t3", label: "图片", width: 120 },
                { prop: "t4", label: "时间", width: 120 },
            ],
            tableSettings: {}
        }
    },
    created () {
        for (let i = 0; i < 30; i++) {
            this.tableData.push({
                t0:"1",
                t1:"dd",
                t2:"1",
                t3:"1",
                t4:"1",
            });
        }
    },
}
</script>