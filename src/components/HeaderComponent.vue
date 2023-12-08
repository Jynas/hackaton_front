<script setup lang="ts">
import { ref } from 'vue'
import {useAuthStore} from "@/stores/AuthStore";
import { useRouter } from 'vue-router'

const storeAuth = useAuthStore();

const router = useRouter();

const itemsMenu = ref([
  {
    label: 'Авторизация',
    icon: 'pi pi-sign-in',
	  command: (): void => {
			storeAuth.stateModalSignIn = true;
	  }
  },
	{
		label: 'Профиль',
		icon: 'pi pi-user',
		command: (): void => {
			router.push('/profile')
		}
	}
])
</script>

<template>
  <MegaMenu :model="itemsMenu" />
</template>

<style lang="scss">
.p-megamenu-horizontal {
	justify-content: flex-end;
}
</style>
