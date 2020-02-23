# china-unit-num
将阿拉伯数字转成带中文单位的数字，比如**100**转成**1百**

# usage
```js
chinaUnitNum(100) // => 1百
chinaUnitNum(1000) // => 1千
```

# 单位
支持`['百', '千', '万', '百万', '千万', '亿']`单位  
可以使用`options`的`ignore`选项忽略部分单位
```js
chinaUnitNum(100, { ignore: ['百'] }) // => 100
chinaUnitNum(1000, { ignore: ['百', '千'] }) // => 1000
```

函数的定义见下面，支持options参数进行一些简单配置
```js
function chinaUnitNum(num: number, options: object): string | number
```
# options
* decimal `数字部分保留的小数位`,默认为`2`
* ignore `忽略某些单位的转换，为数组类型的值`，可以是`单位的中文名组成的数组`，也可以是`['百', '千', '万', '百万', '千万', '亿']`对应单位的下标组成的数组；比如`[0, 2]`表示忽略`['百', '万']`
