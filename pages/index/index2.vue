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
					<iliya-indicator ref="indicator" :autoPlay.sync="autoplay" :current="current"
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