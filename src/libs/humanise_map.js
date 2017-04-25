const materialStatusMap = {
  100: "物资处于正确位置中",
  101: "物资已出库",
  200: "物资信息录入完毕，正在搬运入库",
  201: "物资从原位置搬运到一个新的位置",
  202: "物资正在搬运出库",
  300: "物资信息录入完毕，未入库",
  301: "物资位置在系统中已变换，但是未搬运到新的位置",
  302: "物资在系统中已申请出库，但是未搬运出库",
  303: "物资位置错误",
  400: "物资找不到",
}

const taskActionMap = {
  500: "移动入库",
  501: "移动到新位置",
  502: "移动出库",
  601: "校正物资错误位置",
  602: "修复系统无法识别问题",
}
const taskStatusMap = {
  0: "未开始",
  1: "进行中",
  2: "完成",
  3: "任务取消",
}

const staffPermissionMap = {
  0: "管理员",
  1: "员工",
  99: "root",
}

export const humanise_task_var = num => {
  let value
  if (num < 100) {
    value = taskStatusMap[num]
  }else{
    value = taskActionMap[num]
  }

  if (!value) {
    return "Invalid"
  }

  return value
}

export const humanise_material_var = num => {
  let value
  value = materialStatusMap[num]

  if (!value) {
    return "Invalid"
  }

  return value
}

export const humanise_staff_var = num => {
  let value
  value = staffPermissionMap[num]

  if (!value) {
    return "Invalid"
  }

  return value
}
