export function unique(arr, key) {
  // 数组对象去重
  var hash = {}
  var result = []
  var type = ''
  var item
  for (let i = 0; i < arr.length; i++) {
    item = arr[i]
    let tmpItem
    if (typeof item === 'object' && isNaN(item.length)) {
      tmpItem = arr[i][key]
    } else {
      tmpItem = arr[i]
    }
    type = Object.prototype.toString.call(tmpItem)
    if (!hash[tmpItem + type]) {
      hash[tmpItem + type] = true
      result.push(item)
    }
  }
  return result
}

// 数组去重
export function arrUnique(arr) {
  var res = []
  var json = {}
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i])
      json[arr[i]] = 1
    }
  }
  return res
}
