<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import JwtService from '@/core/service/JwtService'

const storeAuth = useAuthStore()

const router = useRouter()

const itemsMenuAuth = ref<[object, object, object, object, object]>([
	{
		label: 'Вопросы',
		icon: 'pi pi-info-circle',
		command: (): void => {
			router.push('/')
		},
	},
	{
		label: 'Подборки',
		icon: 'pi pi-table',
		command: (): void => {
			router.push('/')
		},
	},
	{
		label: 'Статьи',
		icon: 'pi pi-book',
		command: (): void => {
			router.push('/')
		},
	},
	{
		label: 'Рейтинг',
		icon: 'pi pi-list',
		command: (): void => {
			router.push('/leaderBord')
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

const itemsMenuNotAuth = ref<[object, object, object, object, object]>([
	{
		label: 'Вопросы',
		icon: 'pi pi-info-circle',
		command: (): void => {
			router.push('/')
		},
	},
	{
		label: 'Подборки',
		icon: 'pi pi-table',
		command: (): void => {
			router.push('/')
		},
	},
	{
		label: 'Статьи',
		icon: 'pi pi-book',
		command: (): void => {
			router.push('/')
		},
	},
	{
		label: 'Авторизация',
		icon: 'pi pi-sign-in',
		command: (): void => {
			storeAuth.stateModalSignIn = true
		},
	},
	{
		label: 'Рейтинг',
		icon: 'pi pi-list',
		command: (): void => {
			router.push('/leaderBord')
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
