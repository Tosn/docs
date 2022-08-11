### 数字格式化语法

```py
f = float(input('请输入华氏温度: '))
c = (f - 32) / 1.8
print('%.1f华氏度 = %.1f摄氏度' % (f, c))
# or
print(f'{f:.1f}华氏度 = {c:.1f}摄氏度')
```



### class

getter setter 装饰器

```python
class Person(object):
	def __init__(self, name, age):
		self._name = name
		self._age = age
	
	@property
	def name(self):
		return self._name
	
	@property
	def age(self):
		return self._age
	
	@age.setter
	def age(self, age):
		self._age = age
	
	def play(self):
		if self._age <= 16:
			print(f'{self._name}正在玩飞行棋')
		else:
			print(f'{self._name}正在打麻将')

def main():
	person = Person('Tosn', 12)
	person.play()
	person.age = 22
	person.play()

if __name__ == '__main__':
	main()
```

### 文件 ###

open

| 操作模式 | 具体含义                         |
| -------- | -------------------------------- |
| `'r'`    | 读取 （默认）                    |
| `'w'`    | 写入（会先截断之前的内容）       |
| `'x'`    | 写入，如果文件已经存在会产生异常 |
| `'a'`    | 追加，将内容写入到已有文件的末尾 |
| `'b'`    | 二进制模式                       |
| `'t'`    | 文本模式（默认）                 |
| `'+'`    | 更新（既可以读又可以写）         |

下面这张图来自于[菜鸟教程](http://www.runoob.com)网站，它展示了如果根据应用程序的需要来设置操作模式。

![](https://raw.githubusercontent.com/jackfrued/Python-100-Days/master/Day01-15/res/file-open-mode.png)