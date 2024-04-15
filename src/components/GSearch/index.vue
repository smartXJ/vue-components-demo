<!--
 * @Author: xiaojun
 * @Date: 2024-04-10 15:21:18
 * @LastEditors: xiaojun
 * @LastEditTime: 2024-04-15 16:22:45
 * @Description: 通用搜索
-->
<template>
	<GForm :inline="true" :is-col="false" :schema="useSchema" ref="gFormRef">
		<!-- schema元素的插槽 -->
		<template v-for="(value, name) in $slots" :slot="name" slot-scope="scope">
			<slot :name="name" v-bind="scope"></slot>
		</template>
		<template slot="action">
			<el-button @click="search">
				搜索
			</el-button>
			<el-button class="default-btn" @click="reset">
				重置
			</el-button>
			<!-- 更多方法 -->
			<slot name="actionMore"></slot>
		</template>
	</GForm>
</template>

<script>
export default {
  name: 'GSearch',
	props: {
		schema: {
			type: Array,
			default: () => [],
		},
		model: {
			type: Object,
			default: () => {},
		},
	},
	computed: {
		useSchema() {
			return [...this.schema, { prop: "action" }];
		},
	},
	methods: {
		search() {
			let formData = {}
			if (this.$refs.gFormRef) {
				formData = this.$refs.gFormRef.formModel
			}
			this.$emit("search", formData);
		},

		reset() {
			if (this.$refs.gFormRef) {
				this.$refs.gFormRef.getElFormRef().resetFields()
			}
			this.$emit("reset", {});
		},
	},
};
</script>

<style lang="scss" scoped></style>
