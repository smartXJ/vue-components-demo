<!--
 * @Author: xiaojun
 * @Date: 2024-03-28 11:20:11
 * @LastEditors: xiaojun
 * @LastEditTime: 2024-04-13 11:30:13
 * @Description: 简易-表单生成器
-->
<template>
	<el-form
		v-bind="$attrs"
		:inline="inline"
		:labelWidth="labelWidth"
		size="mini"
		:model="formModel"
		ref="formRef">
		<el-row :gutter="20" style="width: 100%">
			<!-- 栅格模式 -->
			<template v-if="isCol">
				<el-col
					v-bind="setGridProp(item.colProps)"
					v-for="item in schema"
					:key="item.prop">
					<FormItemRenderer :formModel.sync="formModel" :item="item">
						<slot :name="item.prop"></slot>
					</FormItemRenderer>
				</el-col>
			</template>
			<template v-else>
				<FormItemRenderer
					v-for="item in schema"
					:formModel.sync="formModel"
					:key="item.prop"
					:item="item">
					<slot :name="item.prop" :form="formModel"></slot>
				</FormItemRenderer>
			</template>
		</el-row>
	</el-form>
</template>

<script>
import FormItemRenderer from "./components/FormItemRenderer";
export default {
	name: "GForm",
	components: { FormItemRenderer },
	props: {
		// 表单项
		schema: {
			type: Array,
			default: () => [],
		},
		labelWidth: {
			type: [String, Number],
			default: "auto",
		},
		// 行内表单模式
		inline: {
			type: Boolean,
			default: false,
		},
		// 是否启用栅格模式
		isCol: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			formModel: {},
		};
	},
	methods: {
		// 所有字段设为undefined
		resetFiled() {
			this.formModel = this.schema.reduce((source, item) => {
				source[item.prop] = undefined;
				return source;
			}, {});
		},
		getElFormRef() {
			return this.$refs.formRef;
		},
		async validate() {
			const valid = await this.$refs.formRef.validate().catch(() => {});
			return valid;
		},
		// 对表单赋值
		setValues(data = {}) {
			this.formModel = { ...this.formModel, ...data };
		},
		// 栅格信息
		setGridProp(col = {}) {
			const colProps = {
				// 如果有span，代表用户优先级更高，所以不需要默认栅格
				...(col.span
					? {}
					: {
							xs: 24,
							sm: 12,
							md: 12,
							lg: 12,
							xl: 12,
				}),
				...col,
			};
			return colProps;
		},
	},
	mounted() {
		// 解决最开始formModel={}时，字段无法输入的问题
		this.resetFiled();
	},
};
</script>

<style scoped lang="scss"></style>
