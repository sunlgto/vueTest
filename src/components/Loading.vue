<style>
.demo-spin-icon-load{
	animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
	from { transform: rotate(0deg);}
	50%  { transform: rotate(180deg);}
	to   { transform: rotate(360deg);}
}
.demo-spin-col{
	height: 100px;
	position: relative;
	border: 1px solid #eee;
}
</style>
<template>
	<Row>
		<Col class="demo-spin-col" span="8">
			<Spin fix>加载中...</Spin>
		</Col>
		<Col class="demo-spin-col" span="8">
			<Spin fix>
				<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
				<div>Loading</div>
			</Spin>
		</Col>
		<Col class="demo-spin-col" span="8">
			<Spin fix>
				<div class="loader">
					<svg class="circular" viewBox="25 25 50 50">
						<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
					</svg>
				</div>
			</Spin>
		</Col>
	</Row>
</template>
<script>
// 部分样式代码冗长，未作展示
export default {

}
</script>
