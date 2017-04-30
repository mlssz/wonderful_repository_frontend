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

const errorCodeMap = {
  1: "位置错误",
  2: "无法识别"
}

const scheduleTypeMap = {
  0: "每天",
  1: "每周",
  2: "每月",
  3: "每隔"
}

const DAY = 24 * 60 * 60
const HOUR = 60 * 60
const MINUTE = 60

export const humanise_schedule = schedule => {
  let type = schedule.type
  let time = new Date(schedule.time)
  let other = schedule.other

  if (type === -1) return "未设置"

  if (type === 0) return `每天 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} 自动盘点`
  if (type === 1) return `每周 周${other} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} 自动盘点`
  if (type === 2) return `每月 ${other}号 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} 自动盘点`

  if (type === 3) {
    let days = Math.floor(other / DAY)
    other = other % DAY
    let hours = Math.floor(other / HOUR)
    other = other % HOUR
    let minutes = Math.floor(other / MINUTE)
    other = other % MINUTE

    let duration = ""

    if (days !== 0) {
      duration += `${days}天`
    }
    if (hours !== 0) {
      duration += `${hours}小时`
    }
    if (minutes !== 0) {
      duration += `${minutes}分钟`
    }
    if (other !== 0) {
      duration += `${other}秒`
    }

    return `从 ${humanise_date(time)} 起每隔 ${duration} 盘点一次`
  }

}

export const humanise_error_code = num => {
  let value
  value = errorCodeMap[num]

  if (!value) {
    return "Invalid"
  }

  return value
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

export const humanise_material_position = (repository, location, layer) => {
  if (repository === 0) {
    return "入库"
  }
  if (repository === -1) {
    return "出库"
  }

  return `${repository}仓${location}号位置${layer}`
}

export const humanise_date = end_time => {

	let et = new Date(end_time)
	return et.getFullYear() + "-" + (et.getMonth() + 1) + "-" + et.getDate() + " " + et.getHours() + ":" + et.getMinutes() + ":" + et.getSeconds()
}
