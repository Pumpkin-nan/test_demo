/*
fs.writeFile(file, data[, options], callback)
fs.writeFileSync(file, data[, options])
  - file 要操作文件的路径
  - data 要写入的数据
  - options 选项，可以对写入进行一定设置
  -callback 写入完成 后执行的函数
*/
var fs = require('fs')
fs.writeFile('./hello3.txt', "这是通过writeFile写入的内容", function(err){
  if(!err) {
    console.log('写入成功')
  }
})