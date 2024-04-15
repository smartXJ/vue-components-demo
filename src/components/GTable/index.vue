<!--
 * @Author: xiaojun
 * @Date: 2024-04-10 13:36:40
 * @LastEditors: xiaojun
 * @LastEditTime: 2024-04-15 10:47:15
 * @Description: 生成表格
-->
<template>
	<div v-loading="loading" class="mb-20">
		<el-table :data="data" v-bind="$attrs" v-on="$listeners" header-cell-class-name="table-header" style="width: 100%;margin-bottom: 20px;">
			<!-- 展开行 -->
			<el-table-column type="expand" v-if="$slots.expand">
				<template slot-scope="scope">
					<slot name="expand" v-bind="scope"></slot>
				</template>
			</el-table-column>
			<!-- 多选 -->
			<el-table-column v-if="selection" type="selection" width="55" />
			<TableItemRenderer
				v-for="item in schema"
				:key="item.prop"
				:column="item">
				<template slot-scope="{ row }">
					<!-- 自定义 el-table-item 要展示的东西 -->
					<slot :name="`${item.prop}`" :row="row"></slot>
				</template>
			</TableItemRenderer>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			@size-change="handelPagination"
			@current-change="handelPagination"
			:current-page.sync="useCurrentPage"
			:page-size.sync="usePageSize"
			v-bind="usePagination" />
	</div>
</template>

<script>
import TableItemRenderer from "./components/TableItemRenderer.vue";
export default {
	name: "GTable",
	components: { TableItemRenderer },
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		pageSize: {
			type: Number,
			default: 10,
		},
		currentPage: {
			type: Number,
			default: 1,
		},
		schema: {
			type: Array,
			default: () => [],
		},
		loading: {
			type: Boolean,
			default: false,
		},
		/** 多选 */
		selection: {
			type: Boolean,
			default: true,
		},
		pagination: {
			type: Object,
			default: () => ({}),
		},
	},
	computed: {
		useCurrentPage: {
			get() {
				return this.currentPage
			},
			set(val) {
				this.$emit('update:currentPage', val)
			}
		},
		usePageSize: {
			get() {
				return this.pageSize
			},
			set(val) {
				this.$emit('update:pageSize', val)
			}
		},
		usePagination() {
			return Object.assign(
				{
					small: false,
					background: true,
					pagerCount: document.body.clientWidth < 992 ? 5 : 7,
					layout: "total, sizes, prev, pager, next, jumper",
					pageSizes: [10, 20, 30, 50, 100],
					disabled: false,
					hideOnSinglePage: false,
					total: 0,
				},
				this.pagination
			);
		},
	},
	methods: {
		handelPagination() {
			this.$emit("pagination");
		},
	}
};
</script>

<style lang="scss" scoped>
.mb-20 {
	margin-bottom: 20px;
}
</style>
