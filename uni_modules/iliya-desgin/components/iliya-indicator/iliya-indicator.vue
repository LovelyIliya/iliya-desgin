<template>
	<view class="iliya-nav-btn-container" :style="{
				paddingBottom: bottom + 'rpx'
			}">
		<view :style="{zoom:size,bottom:bottom + 'rpx'}" style="position: sticky;">
			<view class="iliya-nav-btn" @click="handleClick" :class="{
      playing: playing && !showed,
      normalcy: showed && !playing,
      hideing: playing && showed
			}">
				<view class="control" :style="{
				backgroundColor:backgroundColor,
				backdropFilter:`blur(${filter}px)`
			}" @click="handleControl">
					<image src="../../static/stop.png" v-if="autoPlay"></image>
					<image src="../../static/play.png" v-else></image>
				</view>
				<view class="indicator-box" :style="{
					width:indicatorBoxWidth,
				backgroundColor:backgroundColor,
				backdropFilter:`blur(${filter}px)`,
				}">
					<view></view>
					<view v-for="item in getNumber" :key="item" class="indicator-item" :class="{playing:current === item}">
						<view class="progress" :style="{width:progress + '%'}"></view>
					</view>
					<view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import iliyaMixin from '../iliya-mixin'
	export default {
		name: 'iliyaIndicator',
		mixins: [iliyaMixin],
		props: {
			// 自动播放标识
			autoPlay: {
				type: Boolean,
				default: false
			},
			// 切换间隔
			interval: {
				type: Number,
				default: 2000
			},
			// 滑块的数量
			swiperNumber: {
				type: Number,
				default: 0
			},
			// 当前显示的滑块
			current: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				indicatorBoxWidth: '0',
				playInter: null,
				progress: 0
			}
		},
		mounted() {
			// #ifndef MP-WEIXIN
			this.progressLoad()
			// #endif
		},
		watch: {
			current() {
				clearInterval(this.playInter)
				this.playInter = null
				this.progress = 0
				this.progressLoad()
			}
		},
		computed: {
			getNumber() {
				const arr = []
				for (var i = 0; i < this.swiperNumber; i++) {
					arr.push(i)
				}
				return arr
			}
		},
		methods: {
			progressLoad() {
				clearInterval(this.playInter);
				if (!this.autoPlay) return
				let elapsedTime = 0;
				this.playInter = setInterval(() => {
					elapsedTime += 50;
					this.progress = (elapsedTime / this.interval).toFixed(2) * 100;
					if (this.progress >= 100) {
						this.progress = 0
						this.progressLoad()
					}
				}, 50);
			},
			play() {
				if (this.playing || this.showed) return
				// #ifdef MP-WEIXIN
				this.progressLoad()
				// #endif
				this.playing = true
				setTimeout(() => {
					this.indicatorBoxWidth = this.swiperNumber * 40 + 30 + 'px'
				}, 300)
				setTimeout(() => {
					this.playing = false
					this.showed = true
				}, 1000)
			},
			hide() {
				if (this.playing || !this.showed) return
				this.playing = true
				this.indicatorBoxWidth = '0'
				setTimeout(() => {
					this.playing = false
					this.showed = false
				}, 1000)
			},
			handleControl() {
				this.$emit('update:autoPlay', !this.autoPlay)
				this.$nextTick(() => {
					if (!this.autoPlay) {
						clearInterval(this.playInter)
						this.playInter = null
						this.progress = 0
					} else {
						this.progressLoad()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.iliya-nav-btn-container {
		align-items: flex-end;
		display: flex;
		height: 100%;
		justify-content: center;
		left: 0;
		margin: 0;
		pointer-events: none;
		position: absolute;
		top: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.iliya-nav-btn {
		width: 100%;
		box-sizing: content-box;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: width 0.3s ease-in-out;
		box-sizing: border-box;
		pointer-events: auto;

		// 常态样式
		&.normalcy {
			.control {
				scale: 1;
			}
		}

		&.playing {
			.control {
				animation:
					anim-show 0.4s ease-in-out forwards,
			}
		}

		&.hideing {
			.control {
				scale: 1;
				animation:
					anim-show 0.2s ease-in-out forwards reverse 0.35s,
			}
		}

		.control {
			scale: 0;
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			transform-origin: center;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.indicator-box {
			height: 110rpx;
			margin-left: 30rpx;
			border-radius: 200px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-around;
			align-items: center;
			transform-origin: left center;
			transition: all 0.3s ease-in-out;
		}

		.indicator-item {
			width: 10px;
			height: 10px;
			background-color: #8c8c8c;
			border-radius: 20px;
			position: relative;
			transition: all 0.3s ease-in-out;
			overflow: hidden;

			&.playing {
				width: 80rpx;
				background-color: #bfbfbf;

				.progress {
					border-radius: 20px;
					position: absolute;
					left: 0;
					top: 0;
					height: 100%;
					background-color: #8c8c8c;
				}
			}
		}
	}

	@keyframes anim-show {
		from {
			scale: 0;
		}

		to {
			scale: 1;
		}
	}
</style>