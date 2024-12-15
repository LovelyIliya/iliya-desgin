# iliya-desgin

一个包含炫酷动效的导航按钮和轮播图指示器的组件库，目前仅测试了vue2和微信小程序，其余平台未测试，理论上应该都可以用。

# 效果展示

粘性定位展示

<img src="https://env-00jxhol06ilx.normal.cloudstatic.cn/gif/%E7%B2%98%E6%80%A7%E5%AE%9A%E4%BD%8D.gif" style="width:300px;height:600px">

固定定位展示

<img src="https://env-00jxhol06ilx.normal.cloudstatic.cn/gif/%E5%9B%BA%E5%AE%9A%E5%AE%9A%E4%BD%8D.gif" style="width:300px;height:600px">


# 代码示例

## 默认动态定位使用示例

```
<template>
	<view class="content">
		<view style="height: 100vh;background: green;">
			<view class="tip">向下滚动</view>
		</view>
		<view class="box1">
			<!-- 导航按钮 -->
			<iliya-nav-button text="进一步了解" :imgUrl="imgUrl" parent=".box1" scrollDom=".content" :topHideOffset="400"
				:bottom="100" :scroll="scroll" :font-size="32" @click="navClick"></iliya-nav-button>
		</view>
		<view class="box2">
			<swiper class="swiper" circular :autoplay="autoplay" :interval="interval" :current="current"
				@change="swiperChange">
				<swiper-item>
					<view class="swiper-item" style="background-color: red;">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" style="background: blueviolet;">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" style="background-color: green;">C</view>
				</swiper-item>
			</swiper>
			<!-- 轮播指示器 -->
			<iliya-indicator parent=".box2" scrollDom=".content" :swiper-number="3" :bottom="100" :topHideOffset="400"
				:scroll="scroll" :autoPlay.sync="autoplay" :current="current" :interval="interval"></iliya-indicator></iliya-indicator>
		</view>
		<view class="box3"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: '../../static/right.png',
				icon: 'iconfont icon-jiantou',
				scroll: {},
				interval: 3000,
				autoplay: true,
				current: 0
			}
		},
		onPageScroll(e) {
			this.scroll = e
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current
			},
			navClick() {
				uni.showToast({
					title: '点击按钮'
				})
			}
		}
	}
</script>

<style>
	.tip {
		text-align: center;
		font-size: 52rpx;
		color: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
	}

	.box1 {
		height: 100vh;
		display: flex;
		justify-content: center;
		background: orangered;
		position: relative;
	}

	.box2 {
		height: 50vh;
		background: skyblue;
		position: relative;
		padding-top: 200rpx;
	}

	.box3 {
		height: 100vh;
		background: yellowgreen;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
</style>
```

## 固定定位使用示例

```
<template>
	<swiper vertical style="height: 100vh;" :current="pageIndex" @change="pageChange">
		<swiper-item>
			<view style="height: 100%;background-color: aqua;">
				<!-- 固定定位时使用一个元素包裹并在这个元素上写定位样式 -->
				<view style="bottom: 600rpx;position: absolute;width: 100%;">
					<iliya-nav-button ref="navBtn" text="进一步了解" :icon="icon" fixed :font-size="32"
						@click="navClick"></iliya-nav-button>
				</view>
			</view>
		</swiper-item>
		<swiper-item>
			<view style="height: 100%;background-color: greenyellow;">
				<swiper class="swiper" circular :autoplay="autoplay" :interval="interval" :current="current"
					@change="swiperChange">
					<swiper-item>
						<view class="swiper-item" style="background-color: red;">A</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item" style="background: blueviolet;">B</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item" style="background-color: green;">C</view>
					</swiper-item>
				</swiper>
				<view style="bottom: 600rpx;position: absolute;width: 100%;">
						<iliya-indicator ref="indicator" :swiper-number="3"  :autoPlay.sync="autoplay" :current="current"
						:interval="interval"></iliya-indicator>
				</view>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				icon: 'iconfont icon-jiantou',
				pageIndex: 0,
				interval: 3000,
				autoplay: true,
				current: 0
			}
		},
		mounted() {
			this.$refs.navBtn.play()
		},
		methods: {
			pageChange(e) {
				this.pageIndex = e.detail.current
				//加上延迟防止快速切换时无法显示按钮
				if (this.pageIndex === 0) {
					setTimeout(() => {
						this.$refs.navBtn.play()
						this.$refs.indicator.hide()
					}, 500)
				} else {
					setTimeout(() => {
						this.$refs.navBtn.hide()
						this.$refs.indicator.play()
					}, 500)
				}
			},
			swiperChange(e) {
				this.current = e.detail.current
			},
		}
	}
</script>

<style>
	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
</style>
```



# 通用props

| 属性名           | 类型    | 说明                                                         | 默认值                | 可选值               |
| ---------------- | ------- | ------------------------------------------------------------ | --------------------- | -------------------- |
| size             | Number  | 显示大小                                                     | 1                     | 0.1--无上限          |
| backgroundColor  | String  | 按钮背景色                                                   | rgba(255,255,255,0.7) |                      |
| filter           | Number  | 背景模糊度                                                   | 4                     |                      |
| fixed            | Boolean | 是否为固定定位，默认情况下按钮将根据父元素的位置进行粘性定位，并根据滚动距离自动进行显示隐藏，如果想要固定在一个位置则传递此参数 | false                 | true                 |
| parent           | String  | 父级节点：非固定定位必传，否则无法计算显示隐藏时机           |                       | 父元素id或class      |
| scroll           | Object  | 页面实时滚动位置：非固定定位必传，否则无法计算显示隐藏时机   | {}                    | 页面实时滚动位置对象 |
| topShowOffset    | Number  | 上方显示偏移量（非固定定位时生效），在父元素顶部距离可视区域底部多少时显示按钮 | 50                    |                      |
| topHideOffset    | Number  | 上方隐藏偏移量（非固定定位时生效），在父元素顶部距离可视区域底部多少时隐藏按钮 | 200                   |                      |
| bottomShowOffset | Number  | 底部显示偏移量（非固定定位时生效），在父元素底部距离可视区域顶部多少时显示按钮 | 50                    |                      |
| bottomHideOffset | Number  | 底部隐藏偏移量（非固定定位时生效），在父元素底部距离可视区域顶部多少时隐藏按钮 | 200                   |                      |
| bottom           | Number  | 按钮距离底部位置（非固定定位时生效），默认粘性定位时，页面往下滚动时按钮距离底部多远 |                       |                      |

# 通用方法

`@play`显示按钮（非固定定位不建议手动调用）

```
this.$refs.refName.play()
```

`@hide`隐藏按钮（非固定定位不建议手动调用）

```
this.$refs.refName.hide()
```



# 导航按钮私有Props

具有炫酷动效的导航按钮，帮助你构建更华丽的页面

| 属性名        | 类型   | 说明                                                         | 默认值 | 可选值 |
| ------------- | ------ | ------------------------------------------------------------ | ------ | ------ |
| text          | String | 按钮文字内容                                                 |        |        |
| textColor     | String | 按钮文字颜色                                                 |        |        |
| fontSize      | Number | 按钮文字大小，直接传递数字，内部将转为rpx，因为需要动态计算按钮宽度，所以暂不支持传单位 | 32     |        |
| imgUrl        | String | 右侧按钮的图标，传递url路径，使用图片当作按钮图标时的图片地址；和icon只能二选一 |        |        |
| imgWidth      | String | 按钮图片图标宽度                                             | 50rpx  |        |
| imgHeight     | String | 按钮图片图标高度                                             |        |        |
| icon          | String | 右侧按钮的图标，使用类名如：iconfont icon-xxx 作为按钮图标，和imgUrl只能二选一 |        |        |
| iconSize      | String | 图标大小                                                     | 42rpx  |        |
| buttonColor   | String | 右侧按钮颜色                                                 |        |        |
| slot:btn-icon | slot   | 右侧按钮插槽，如果不传递imgUrl和icon的话，可以使用此插槽自定义按钮图片 |        |        |

`@click`点击事件

```
	<iliya-nav-button ..... @click="navClick"></iliya-nav-button>
				
navClick() {
   uni.showToast({
     title: '点击按钮'
      })
  }	
```



# 指示器私有Props

**以下属性都为必传，否则指示器将无法正常工作**

| 属性名       | 类型    | 说明                                                         | 默认值 | 可选值 |
| ------------ | ------- | ------------------------------------------------------------ | ------ | ------ |
| autoPlay     | Boolean | 自动播放标识，就是swiper用的，传递此属性时要使用.sync，否则点击组件暂停按钮不会生效 | false  |        |
| interval     | Number  | 切换间隔                                                     | 2000   |        |
| swiperNumber | Number  | 滑块的数量                                                   | 0      |        |
| current      | Number  | 当前显示的滑块                                               |        |        |



