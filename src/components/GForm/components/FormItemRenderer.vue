<template>
	<el-form-item :prop="item.prop" :label="item.label" :rules="setRules(item)">
		<slot>
			<!-- 下拉选择 -->
			<el-select
				v-if="isType(item, 'select')"
				style="width: 100%"
				v-bind="item.componentProps"
				v-model="useFormModel[item.prop]"
				:placeholder="setMessageInfo(item)">
				<el-option
					v-for="element in item.options || []"
					:key="element.value"
					:label="element.label"
					:value="element.value" />
			</el-select>
			<!-- 日期 -->
			<el-date-picker
				v-else-if="isType(item, 'date')"
				style="width: 100%"
				v-bind="item.componentProps"
				v-model="useFormModel[item.prop]"
				:placeholder="setMessageInfo(item)">
			</el-date-picker>
			<!-- 上传图片 -->
			<!-- <img-upload
				v-else-if="isType(item, 'image')"
				v-bind="item.componentProps"
				v-model="useFormModel[item.prop]" /> -->
			<!-- 数字 -->
			<el-input-number
				v-else-if="isType(item, 'inputNumber')"
				v-bind="item.componentProps"
				v-model="useFormModel[item.prop]" />
			<!-- 输入框 -->
			<el-input
				v-else
				v-bind="item.componentProps"
				v-model="useFormModel[item.prop]"
				:placeholder="setMessageInfo(item)" />
		</slot>
	</el-form-item>
</template>

<script>
// import ImgUpload from "@/components/img-upload";
export default {
	// components: { ImgUpload },
	props: {
		item: {
			type: Object,
			default: () => {},
		},
		formModel: {
			type: Object,
			default: () => {},
		},
	},
	computed: {
		useFormModel: {
			get() {
				return this.formModel;
			},
			set(v) {
				this.$emit("update:formModel", v);
			},
		},
	},
	methods: {
		setRules(item) {
			return item?.rules
				? item.rules
				: item.required
				? {
						required: true,
						message: this.setMessageInfo(item),
		}
				: undefined;
		},
		isType(column, type) {
			return column.fileType === type;
		},
		// 提示信息
		setMessageInfo(column) {
			if (column?.componentProps?.placeholder) {
				return column.componentProps.placeholder;
			}
			switch (column.fileType) {
				case "input":
					return "请输入" + column.label;
				case "select":
					return "请输入" + column.label;
				case "img":
					return "请上传" + column.label;
				default:
					return "请输入" + column.label;
			}
			// if (column.fileType === "input") {
			//   return "请输入" + column.label;
			// }
			// if (column.fileType === "imgUpload") {
			//   return "请上传" + column.label;
			// }
			// return "请选择" + column.label;
		},
	},
};
</script>

<style lang="scss" scoped></style>
