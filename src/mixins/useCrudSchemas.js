/*
 * @Author: xiaojun
 * @Date: 2024-04-10 11:37:29
 * @LastEditors: xiaojun
 * @LastEditTime: 2024-04-15 16:45:17
 * @Description: 对应操作
 */
// crudSchemaItem: {
//   prop: 字段key
//   label: 名称
//   fileType: 字段类型 input | select | inputNumber
//   options: 下拉列表 [{value: 1, label: '键'}] 或者 { 1: {value: 1, label: '键'} }

//   isTable: 是否在table中展示
//   isSearch: 是否在search中展示
//   isForm: 是否在form中展示

//   form参数
//   form: {
//     colProps： 栅格
//     required: 是否必填
//     componentProps：组件参数
//   }

// 		search 与form一致
// }
export default {
	data() {
		return {
			// 使用时，页面内需要加入crudSchema
			// crudSchema: []
		};
	},
	methods: {
		// 获取默认属性
		getCommonFiled(item) {
			return {
				prop: item.prop,
				label: item.label,
				fileType: item.fileType,
				options: item.options
			};
		},
		filterSearchSchema(list) {
			return list
				.filter((item) => item.isSearch === true)
				.map((item) => {
					return {
						...this.getCommonFiled(item),
						...(item.search || {}),
					};
				});
		},
		filterTableSchema(list) {
			return list
				.filter((item) => item.isTable !== false)
				.map((item) => {
					return {
						...this.getCommonFiled(item),
						...(item.table || {}),
					};
				});
		},
		filterFormSchema(list) {
			return list
				.filter((item) => item.isForm !== false)
				.map((item) => {
					return {
						...this.getCommonFiled(item),
						...(item.form || {}),
					};
				});
		},
	},
	computed: {
		allSchemas() {
			return {
				// 默认不展示
				searchSchema: this.filterSearchSchema(this.crudSchema),
				// 默认展示
				tableSchema: this.filterTableSchema(this.crudSchema),
				// 默认展示
				formSchema: this.filterFormSchema(this.crudSchema),
			};
		},
	},
};
