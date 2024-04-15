<!--
 * @Author: xiaojun
 * @Date: 2023-12-07 17:05:39
 * @LastEditors: xiaojun
 * @LastEditTime: 2024-04-12 13:59:44
 * @Description: 列的渲染
-->
<template>
  <el-table-column v-bind="column" v-if="column.vIf === undefined ? true : column.vIf">
    <template v-if="!['selection', 'index'].includes(column.type)" #default="scoped">
      <slot name="default" v-bind="scoped">
        <!-- 时间类型 -->
        <div v-if="column.fileType === 'date'">{{
          formatDate(scoped.row[column.prop], scoped.row.format || 'yyyy-MM-dd hh:mm:ss')
        }}</div>
        <!-- 下拉 -->
        <div v-else-if="column.fileType === 'select'">{{
          setSelectValue(scoped.row)
        }}</div>
        <!-- 金额 ￥0.01 -->
        <!-- <div v-else-if="column.fileType === 'price'">{{
          formateAmount(scoped.row[column.prop])
        }}</div> -->
        <!-- 图片类型 -->
        <el-image
          v-else-if="column.fileType === 'image'"
          style="width: 80px; height: 80px"
          :src="scoped.row[column.prop] || null"
          :preview-src-list="[scoped.row[column.prop]]"
          preview-teleported
          fit="cover"
        />
        <!-- 字典 -->
        <!-- <dict-tag
          v-else-if="column.fileType === 'dict'"
          :type="DICT_TYPE[column.dictType]"
          :value="scoped.row[column.prop]"
        /> -->
        <!-- 使用原始值 -->
        <div v-else>{{ scoped.row[column.prop] }}</div>
        <!-- </template> -->
      </slot>
    </template>
  </el-table-column>
</template>

<script >
import { formatDate } from '@/utils'
// import { formateAmount } from '@/utils/formatNumber'
// import { DICT_TYPE } from '@/utils/dict'
import { isObject, isArray } from '@/utils/is'
export default {
  props: {
    /**
     * vIf 同于 v-if
     * 渲染的列 必要字段 fileType, 值 '' | 'price' | 'date' | 'dict' | 'image'
     * fileType = date,可传入format格式化时间
     * fileType = dict,可传入dictType 字典类型
     * type与 el-table-column 的type一致
     */
    column: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    formatDate,
    setSelectValue(row) {
      const { prop, options } = this.column
      const val = row[prop]
      if (isObject(options)) {
        return options[val]?.label || val
      }
      if (isArray(options)) {
        const obj = options.find(item => item.value === val)
        return obj ? obj.label : 'val'
      }
      return val
    }
  }
}
</script>

<style scoped></style>
