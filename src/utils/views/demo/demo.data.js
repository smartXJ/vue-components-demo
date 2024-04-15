export const cfTypeEnum = {
	0: {
		label: "药品1",
		value: 0,
	},
	1: {
		label: "药品2",
		value: 1,
	},
};
export const crudSchema = [
	{
		label: "spuId",
		prop: "spuId",
		fileType: "inputNumber",
	},
	{
		label: "类型",
		prop: "type",
		fileType: "select",
		options: [
			{ label: "类型1", value: "1" },
			{ label: "类型2", value: "2" },
		],
	},
	{
		label: "商品名",
		prop: "prodName",
		fileType: "input",
		isSearch: true,
		form: {
			componentProps: {
				disabled: true,
			},
		},
	},
	{
		label: "症状名称",
		prop: "indication",
		fileType: "select",
		form: {
			componentProps: {
				placeholder: "请输入名称以创建症状",
				multiple: true,
				allowCreate: true,
				filterable: true,
			},
		},
	},
	{
		label: "操作",
		prop: "action",
		isForm: false,
	},
];
