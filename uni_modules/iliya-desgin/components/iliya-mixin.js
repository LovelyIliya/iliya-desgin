export default {
	props: {
		// 按钮大小
		size: {
			type: Number,
			default: 1
		},
		// 背景色
		backgroundColor: {
			type: String,
			default: 'rgba(255,255,255,0.7)'
		},
		// 背景模糊度
		filter: {
			type: Number,
			default: 4
		},
		// 是否为固定定位
		fixed: {
			type: Boolean,
			default: false
		},
		// 父级节点：非固定定位必传，否则无法计算显示隐藏时机
		parent: {
			type: String,
			default: ''
		},
		// 页面滚动位置：非固定定位必传，否则无法计算显示隐藏时机
		scroll: {
			type: Object,
			default: () => {}
		},
		// 上方显示偏移量（非固定定位时生效）
		topShowOffset: {
			type: Number,
			default: 50
		},
		// 上方隐藏偏移量（非固定定位时生效）
		topHideOffset: {
			type: Number,
			default: 200
		},
		// 底部显示偏移量（非固定定位时生效）
		bottomShowOffset: {
			type: Number,
			default: 50
		},
		// 底部隐藏偏移量（非固定定位时生效）
		bottomHideOffset: {
			type: Number,
			default: 200
		},
		// 按钮距离底部位置（非固定定位时生效）
		bottom: {
			type: Number,
			default: 50
		}
	},
	data() {
		return {
			playing: false,
			showed: false,
			inScrollTop: 0,
			inState: 'up',
			parentView: null,
			parentHeight: 0,
			viewHeight: 0,
		}
	},
	watch: {
		scroll() {
			if (this.playing || this.fixed) return
			if (this.inScrollTop < this.scroll.scrollTop) {
				this.inState = 'up'
			} else {
				this.inState = 'down'
			}
			let parentTop = 0
			this.parentView.fields({
					rect: true,
					size: !this.parentHeight
				}, (data) => {
					parentTop = data.top
					if (!this.parentHeight) {
						this.parentHeight = data.height
					}
					this.inScrollTop = this.scroll.scrollTop
					const scrollTop = Math.floor(this.scroll.scrollTop)
					if (this.inState === 'up') {
						if (parentTop + this.topShowOffset < this.viewHeight &&
							parentTop + this.parentHeight - this.topHideOffset > 0) {
							this.play()
						} else {
							this.hide()
						}
					} else {
						if (parentTop + this.viewHeight - this.bottomShowOffset > 0 &&
							parentTop + this.topHideOffset < this.viewHeight) {
							this.play()
						} else {
							this.hide()
						}
					}
				})
				.exec();
		}
	},
	mounted() {
		this.parentView = uni.createSelectorQuery().in(this.$parent).select(this.parent);
		this.viewHeight = uni.getSystemInfoSync().screenHeight
	},
}