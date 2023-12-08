<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import SignInModal from "@/components/modal/SignInModal.vue";
import SignUpModal from "@/components/modal/SignUpModal.vue";
import ApiService from "@/core/service/ApiService";

ApiService.setHeader()
</script>

<template>
	<Toast />
	<HeaderComponent />
	<SignInModal />
	<SignUpModal />
  <RouterView />
</template>

<style lang="scss">
@import 'primeflex/primeflex.scss';
.p-dialog .p-dialog-footer button {
	margin: 0;
	width: 100%;
}
.p-dialog .p-dialog-content {
	padding: 0.5rem 1.5rem 2rem 1.5rem;
}
.p-password {
	input {
		width: 100%;
	}
}
</style>
