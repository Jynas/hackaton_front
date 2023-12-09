<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import JwtService from '@/core/service/JwtService'

const storeAuth = useAuthStore()

const router = useRouter()

const itemsMenuAuth = ref<[object, object]>([
	{
		label: 'Профиль',
		icon: 'pi pi-user',
		command: (): void => {
			router.push('/profile')
		},
	},
	{
		label: 'Выйти',
		icon: 'pi pi-sign-out',
		command: (): void => {
			router.push('/');
			JwtService.destroyToken();
			JwtService.isAuth.value = false;
		},
	},
])

const itemsMenuNotAuth = ref([
	{
		label: 'Авторизация',
		icon: 'pi pi-sign-in',
		command: (): void => {
			storeAuth.stateModalSignIn = true
		},
	},
])
</script>

<template>
  <MegaMenu :model="JwtService.isAuth.value ? itemsMenuAuth : itemsMenuNotAuth" />
</template>

<style lang="scss">
.p-megamenu-horizontal {
  justify-content: flex-end;
}
</style>
