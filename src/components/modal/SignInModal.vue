<script setup lang="ts">
import {useAuthStore} from "@/stores/AuthStore";
import { ref } from 'vue';
import ApiService from "@/core/service/ApiService";
import Api from "@/config/Api";
import {useToast} from "primevue/usetoast";

const toast = useToast();
const storeAuth = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');

const signIn = ():void => {
	if(!email.value) {
		toast.add({
			severity: 'error',
			summary: 'Ошибка',
			detail: 'Введите свою почту',
			life: 3000
		});
		return;
	}
	if(!password.value) {
		toast.add({
			severity: 'error',
			summary: 'Ошибка',
			detail: 'Введите свой пароль',
			life: 3000
		});
		return;
	}
	ApiService.post(Api.signIn, {
		email: email.value,
		password: password.value,
	}).then((response) => {
		console.log(response);
	})
}
</script>

<template>
	<Dialog v-model:visible="storeAuth.stateModalSignIn" modal>
		<template #header>
			<span>Авторизация</span>
		</template>
		<template #default>
			<div class="flex flex-column gap-3">
				<InputText placeholder="Email" v-model="email" />
				<Password placeholder="Пароль" v-model="password" :feedback="false" toggleMask />
			</div>
		</template>
		<template #footer>
			<div class="flex flex-column align-items-center">
				<Button label="Авторизоваться" @click="signIn" />
				<span class="cursor-pointer mt-3" @click="storeAuth.stateModalSignUp = true, storeAuth.stateModalSignIn = false">Нет аккаунта?</span>
			</div>
		</template>
	</Dialog>
</template>

<style lang="scss"></style>