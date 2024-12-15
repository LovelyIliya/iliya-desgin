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
				:scroll="scroll" :autoPlay.sync="autoplay" :current="current" :interval="interval"></iliya-indicator>
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