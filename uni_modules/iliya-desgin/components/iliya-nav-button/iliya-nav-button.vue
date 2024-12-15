<template>
	<view class="iliya-nav-btn-container" :class="{stickyMode:!fixed}" :style="{
				paddingBottom: bottom + 'rpx'
			}">
		<view :style="{zoom:size,bottom:bottom + 'rpx'}" style="position: sticky;">
			<view class="iliya-nav-btn" @click="handleClick" :class="{
      playing: playing && !showed,
      normalcy: showed && !playing,
      hideing: playing && showed
			}" :style="{
				width: boxWidth,
				backgroundColor:backgroundColor,
				backdropFilter:`blur(${filter}px)`,
			}">
				<view class="anim-border" :style="{
					borderColor:buttonColor
				}"></view>
				<view class="text" :style="{color:textColor,fontSize:fontSize + 'rpx'}">{{ text }}</view>
				<view class="icon-btn" :style="{
					backgroundColor:buttonColor
				}">
					<image class="icon-img" :src="imgUrl" v-if="imgUrl" :style="{width:imgWidth,height:imgHeight}"></image>
					<text :class="icon" v-else-if="icon" :style="{fontSize:iconSize}"></text>
					<slot v-else name="btn-icon"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import iliyaMixin from '../iliya-mixin'
	export default {
		name: 'iliyaNavButton',
		mixins: [iliyaMixin],
		props: {
			// 文字内容
			text: {
				type: String,
				default: ''
			},
			// 文字颜色
			textColor: {
				type: String,
				default: ''
			},
			// 文字大小
			fontSize: {
				type: Number,
				default: 32
			},
			// 使用图片当作按钮图标时的图片地址；和icon只能二选一
			imgUrl: {
				type: String,
				default: ''
			},
			// 按钮图片图标宽度
			imgWidth: {
				type: String,
				default: '50rpx'
			},
			// 按钮图片图标高度
			imgHeight: {
				type: String,
				default: '50rpx'
			},
			// 按钮颜色
			buttonColor: {
				type: String,
				default: '#0c77e4'
			},
			// 使用类名如：iconfont icon-xxx 作为按钮图标，和imgUrl只能二选一
			icon: {
				type: String,
				default: ''
			},
			// 图标大小
			iconSize: {
				type: String,
				default: '42rpx'
			},
		},
		data() {
			return {
				boxWidth: '',
			}
		},
		methods: {
			play() {
				if (this.playing || this.showed) return
				this.playing = true
				setTimeout(() => {
					this.boxWidth = 50 + this.text.length * (32 * (this.fontSize / 32)) + 'px'
				}, 700)
				setTimeout(() => {
					this.playing = false
					this.showed = true
				}, 1000)
			},
			hide() {
				if (this.playing || !this.showed) return
				this.playing = true
				setTimeout(() => {
					this.boxWidth = ''
				}, 300)
				setTimeout(() => {
					this.playing = false
					this.showed = false
				}, 1000)
			},
			handleClick(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.iliya-nav-btn-container {
		display: flex;
		justify-content: center;
		margin: 0;
		pointer-events: none;
		position: absolute;
		top: 0;
		width: 100%;
		height: fit-content;
		box-sizing: border-box;

		&.stickyMode {
			align-items: flex-end;
			height: 100%;
			left: 0;
		}
	}

	.iliya-nav-btn {
		scale: 0;
		height: 110rpx;
		width: 110rpx;
		border-radius: 30px;
		box-sizing: content-box;
		display: flex;
		align-items: center;
		transition: width 0.3s ease-in-out;
		box-sizing: border-box;
		pointer-events: auto;

		.anim-border {
			position: absolute;
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			border: 0px solid #0c77e4;
		}

		// 常态样式
		&.normalcy {
			justify-content: space-between;
			scale: 1;

			.text {
				width: calc(100% - 50px);
				opacity: 1;
			}

			.icon-btn {
				margin-right: 10px;
				scale: 1;
			}
		}

		&.playing {
			justify-content: center;
			animation:
				anim-show 0.4s ease-in-out forwards,
				anim-adjust 0.3s ease-in-out forwards 0.7s;

			.anim-border {
				animation: anim-border 0.7s ease-in-out forwards;
			}

			.icon-btn {
				animation: anim-show 0.5s ease-in-out forwards 0.45s;
			}
		}

		&.hideing {
			scale: 1;
			padding-right: 0;
			animation:
				anim-adjust 0.2s ease-in-out forwards reverse 0.3s,
				anim-show 0.2s ease-in-out forwards 0.65s reverse;

			.text {
				width: calc(100% - 100rpx);
				opacity: 0;
			}

			.icon-btn {
				animation: anim-show 0.2s ease-in-out forwards reverse;
			}
		}

		.text {
			color: #1d1d1f;
			letter-spacing: 1px;
			opacity: 0;
			width: 0;
			text-align: center;
			transition: opacity 0.2s ease-in;
		}

		.icon-btn {
			width: 80rpx;
			height: 80rpx;
			scale: 0;
			border-radius: 50%;
			color: #fff;
			text-align: center;
			transform-origin: center;
			display: flex;
			align-items: center;
			justify-content: center;
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

	@keyframes anim-border {
		0% {
			border-width: 0rpx;
		}

		60% {
			border-width: 30rpx;
		}

		100% {
			border-width: 0rpx;
		}
	}

	@keyframes anim-adjust {
		0% {
			border-radius: 60rpx;
			justify-content: center;
			padding-right: 0;
		}

		10% {
			justify-content: space-between;
		}

		100% {
			padding-right: 20rpx;
			justify-content: space-between;
		}
	}
</style>