<template>
	<el-dialog
		:title="dialogTitle"
		:visible.sync="visible"
		:close-on-click-modal="false">
		<GForm :schema="schema" ref="gFormRef">
			<div slot="spuId" slot-scope="{form}">
        这是个自定义组件内容
			</div>
		</GForm>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="beforeSubmit()">确认</el-button>
  		<el-button @click="visible = false">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>

export default {
	props: {
		schema: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			visible: false,
      dialogTitle: ''
		};
	},
	methods: {
		async beforeSubmit() {
      const value = this.$refs.gFormRef.formModel
      await this.$http({
        url: 'updateOrAddApi',
        method: 'post',
        data: value
      })
      this.$message.success(this.dialogTitle + '成功')
			this.$emit("success");
			this.visible = false
		},
    async open(id) {
      this.dialogTitle = id ? '编辑' : '新增'
      this.visible = true
      await this.$nextTick()
			this.$refs.gFormRef.getElFormRef().resetFields()
      if (id) {
				const { data } = await this.$http({
        url: 'getDetailApi',
					method: 'get',
				})
				this.$refs.gFormRef.setValues(data)
      }
    }
	},
};
</script>

<style lang="scss" scoped>
.mr-10px {
	margin-right: 10px;
}
</style>