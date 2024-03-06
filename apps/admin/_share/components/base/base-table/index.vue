<script setup lang="ts">
interface IProps {
  rowKeyProp: string
  columns: any[]
  data: any[]
  editingRowKeys?: string[]
  unEditingType?: 'readonly' | 'disabled' | 'text'
}

const {
  columns,
  data,
  unEditingType = 'disabled',
} = defineProps<IProps>()

const form = ref()

const attrs = useAttrs()

const getUnEditingType = computed(() => unEditingType)

function isHeaderTitleRequired({
  required,
  rules,
}: any) {
  if (required)
    return required

  if (rules)
    return rules.some((rule: any) => rule.required)

  return false
}

defineExpose({ form })
</script>

<template>
  <ElForm
    ref="form"
    :model="data"
    class="h-full"
  >
    <ElTable
      row-key
      border
      show-overflow-tooltip
      size="small"
      v-bind="attrs"
      :data="data"
      class="h-full"
    >
      <template
        v-for="column in columns"
        :key="column.prop"
      >
        <ElTableColumn
          v-if="'editable' in column"
          v-bind="column"
        >
          <template
            v-if="isHeaderTitleRequired(column)"
            #header
          >
            <span class="table-header-title__required">*</span>
            <span>{{ column.label }}</span>
          </template>

          <template #default="{ row, $index }">
            <ElFormItem
              v-if="editingRowKeys?.includes(row[rowKeyProp])"
              :prop="`[${$index}][${column.prop}]`"
              :rules="column.rules || []"
              style="margin-bottom: 0;"
            >
              <component
                :is="column.editConfig.component"
                v-if="column.editConfig && column.editConfig.component"
                v-model="row[column.prop]"
                v-bind="column.editConfig.props || {}"
                v-on="column.editConfig.listeners || {}"
              />
              <ElInput
                v-else
                v-model="row[column.prop]"
              />
            </ElFormItem>

            <template v-else>
              <template v-if="column.editConfig?.unEditingType ? ['readonly', 'disabled'].includes(column.editConfig.unEditingType) : ['readonly', 'disabled'].includes(getUnEditingType)">
                <component
                  :is="column.editConfig.component"
                  v-if="column.editConfig && column.editConfig.component"
                  v-model="row[column.prop]"
                  :disabled="column.editConfig?.unEditingType === 'disabled' || getUnEditingType === 'disabled'"
                  :readonly="column.editConfig?.unEditingType === 'readonly' || getUnEditingType === 'readonly'"
                  v-bind="column.editConfig.props || {}"
                  v-on="column.editConfig.listeners || {}"
                />

                <ElInput
                  v-else
                  v-model="row[column.prop]"
                  :disabled="column.editConfig?.unEditingType === 'disabled' || getUnEditingType === 'disabled'"
                  :readonly="column.editConfig?.unEditingType === 'readonly' || getUnEditingType === 'readonly'"
                />
              </template>

              <div v-else>
                {{ row[column.prop] || '--' }}
              </div>
            </template>
          </template>
        </ElTableColumn>

        <ElTableColumn
          v-else
          v-bind="column"
        >
          <template
            v-if="'slot' in column"
            #default="scope"
          >
            <slot
              :name="column.slot"
              v-bind="scope"
            />
          </template>
          <span v-if="column.type !== 'selection'">{{ column.label ?? '--' }}</span>
        </ElTableColumn>
      </template>

      <template #empty>
        <slot name="empty" />
      </template>

      <template #append="scope">
        <slot
          name="append"
          v-bind="scope"
        />
      </template>
    </ElTable>
  </ElForm>
</template>

<style lang="less" scoped>
.table-header-title__required {
  color: var(--el-color-danger);
  margin-inline-end: 4px;
}
:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
