/*
 * @Author: xiaojun
 * @Date: 2024-04-10 10:23:21
 * @LastEditors: xiaojun
 * @LastEditTime: 2024-04-15 16:35:40
 * @Description: 对应操作
 */
export default {
	data() {
		return {
			// 使用时，页面内需要加入getListApiUrl
			// getListApiUrl: ''
			// delApiUrl: ''
			dataList: [],
			tableLoading: false,
			total: 0, // 总页数
			queryParams: {
				current: 1, // 当前页数
				size: 10, // 每页显示多少条
			},
		};
	},
	methods: {
		async getList() {
      // getList 调用之前
      if (this.getListBefore) {
        await this.getListBefore()
      }
			try {
				this.tableLoading = true;
				const { data } = await this.$http({
					url: this.getListApiUrl,
					method: "get",
					params: this.queryParams,
				});
				this.dataList = data.records;
				this.total = data.total;
			} finally {
				this.tableLoading = false;
			}
		},
		setSearchParams(data = {}) {
			const { size } = this.queryParams;
			this.queryParams = {
				size,
				current: 1,
				...data,
			};
			this.getList();
		},
		// 删除
		delList(id) {
			let idsLength = 1
			let ids = [id]
			if (Array.isArray(id)) {
				ids = id
				idsLength = id.length
			}
			ids = Array.isArray(id) ? id : [id];
			this.$confirm(
				`是否删除所选中数据?`,
				'提示',
				{
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: "warning",
				}
			)
				.then(() => {
					this.$http({
						url: this.delApiUrl,
						method: "delete",
						data: { ids},
					}).then(({ data }) => {
						this.$message({
							message: '删除成功',
							type: "success",
							duration: 1500,
						});
						const { size, current } = this.queryParams;
						// 计算出临界点
						this.queryParams.current =
							this.total % size === idsLength || size === 1
								? current > 1
									? current - 1
									: current
								: current;
						this.getList();
					});
				})
				.catch(() => {});
		},
	},
	mounted() {
		this.getList();
	},
};
