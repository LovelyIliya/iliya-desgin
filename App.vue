<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
		font-family: "iconfont";
		/* Project id 4675349 */
		src: url('//at.alicdn.com/t/c/font_4675349_adqobtr2yli.woff2?t=1734190197208') format('woff2'),
			url('//at.alicdn.com/t/c/font_4675349_adqobtr2yli.woff?t=1734190197208') format('woff'),
			url('//at.alicdn.com/t/c/font_4675349_adqobtr2yli.ttf?t=1734190197208') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-jiantou:before {
		content: "\e61f";
	}
</style>