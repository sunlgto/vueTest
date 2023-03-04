<template>
	<Menu/>
	
</template>

<script>
import Menu from "@/components/menu/Menu";

export default {
	name:"homePage",
	data () {
		return {
			theme1: 'light'
		}
	},components:{
		Menu
	}
}
</script>
