<template>
	<view class="">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		created(){
	
		},
		onReachBottom(){
			console.log('上拉');
			if(this.total[this.tabClick]){
				if(this.page[this.tabClick]*this.pagesize>this.total[this.tabClick]){
					this.$msg('没有更多数据了')
					return false;
				}else{
					this.page[this.tabClick]++
				}
			}
			this.getClass()
		},
		onLoad() {
			// this.getBanner();
			// this.getClass();
		},
		methods:{
	
		},
	}
</script>
<style lang="scss">
	
</style>