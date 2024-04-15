<!--
 * @Author: xiaojun
 * @Date: 2024-04-15 16:04:31
 * @LastEditors: xiaojun
 * @LastEditTime: 2024-04-15 16:35:08
 * @Description: 对应操作
-->
<template>
	<div>
		<!-- 搜索栏 -->
		<div class="search-bar">
			<g-search
				:schema="allSchemas.searchSchema"
				:model="queryParams"
				@search="setSearchParams"
				@reset="setSearchParams">
				<div
					slot="actionMore"
					class="default-btn primary-btn"
					@click="openForm()">
					{{ $t("crud.addBtn") }}
				</div>
			</g-search>
		</div>
		<!-- 搜索栏end -->
		<!-- 表格 -->
		<div class="main-container">
			<g-table
				@pagination="getList"
				:schema="allSchemas.tableSchema"
				:data="dataList"
				:loading="tableLoading"
				:pagination="{ total: total }"
				:current-page.sync="queryParams.current"
				:page-size.sync="queryParams.size">
				<template slot="action" slot-scope="{ row }">
					<div class="text-btn-con">
            <el-link type="primary" @click="openForm(row.id)">编辑</el-link>
            <el-link type="danger" @click="delList(row.id)">删除</el-link>
					</div>
				</template>
			</g-table>
		</div>
		<!-- 编辑 | 新增 -->
		<form-pop
			ref="formPopRef"
			:schema="allSchemas.formSchema"
			@success="getList" />
	</div>
</template>

<script>
import useTable from "@/mixins/useTable";
import GTable from '@/components/GTable/index.vue'
import GSearch from '@/components/GSearch/index.vue'
import useCrudSchemas from "@/mixins/useCrudSchemas";
import { crudSchema } from "./demo.data";
import FormPop from "./form-pop.vue";
export default {
	mixins: [useTable, useCrudSchemas],
	components: { FormPop, GSearch, GTable },
	data() {
		return {
			crudSchema,
			getListApiUrl: "getList",
			delApiUrl: "del",
		};
	},
	methods: {
		openForm(id) {
			this.$refs.formPopRef.open(id);
		},
	},
};
</script>
