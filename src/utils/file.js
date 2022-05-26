/**
 * blob 转 文件
 * @param {*} blob
 * @param {*} filename
 */
 export const blobToFile = (blob, filename) => new File([blob], filename)
 /**
  * base64 转 blob
  * @param {*} base64
  */
 export const base64ToBlob = (base64) => {
   const arr = base64.split(',')
   const data = atob(arr[1])
   const mime = arr[0].match(/:(.*?);/)[1]
   const ia = new Uint8Array(data.length);
   [...data].forEach((item, i) => {
     ia[i] = data.charCodeAt(i)
   })
   return new Blob([ia], { type: mime })
 }
 /**
  * blob 转 base64
  * @param {*} blob
  */
 export const blobToBase64 = (blob) => new Promise((resolve) => {
   const reader = new FileReader() // 参数为 Blob 对象或 File 对象
   reader.readAsDataURL(blob)
   reader.onload = (e) => {
     resolve(e.target.result)
   }
 })
 /**
  * 文件 转 base64
  * @param {*} file
  */
 export const fileToBase64 = (file) => blobToBase64(file)
 /**
  * base64 转 文件
  * @param {*} base64
  * @param {*} filename
  */
 export const base64ToFile = (base64, filename) => (blobToFile(base64ToBlob(base64), filename))
 /**
  * 文件 转 blob
  * @param {*} blob
  */
 export const fileToBlob = async (blob) => base64ToBlob(await fileToBase64(blob))
 /**
  * 下载文件
  * @param {Blob|File|String} file 文件
  * @param {string} filename 文件名
  */
 export const downloadAction = async (file, filename) => {
   let blob = null
   const toType = Object.prototype.toString.call(file)
   console.log('dddddd', toType)
   if (toType === '[object File]') {
     blob = await fileToBlob(file)
   } else if (toType === '[object String]') {
     blob = base64ToBlob(file)
   } else {
     blob = file
   }
   if (window.navigator.msSaveOrOpenBlob) {
     navigator.msSaveBlob(blob, filename)
   } else {
      console.log(blob)
      //   创建a节点和找到body
      const link = document.createElement('a')
      const body = document.querySelector('body')
      // 创建href属性、download属性、样式为不显示
      let binaryData = []
      binaryData.push(blob)
      link.href = window.URL.createObjectURL(new Blob(binaryData))
      // link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.style.display = 'none'
     // 往body上添加节点a
     body.appendChild(link)
     // 自动执行点击事件
     link.click()
     body.removeChild(link)
     window.URL.revokeObjectURL(link.href)
   }
 }
 /**
  * 响应流转blob
  * @param {*} arrayBuffer
  * @param {*} callback
  */
 export function zhArrayBufferToString (arrayBuffer, callback) {
   // 响应流转blob
   const b = new Blob([arrayBuffer])
   const r = new FileReader()
   r.readAsText(b, 'utf-8')
   r.onload = () => {
     callback(r.result)
   }
 }
 