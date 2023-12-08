<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue';
import ApiService from '@/core/service/ApiService';
import Api from '@/config/Api';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const storeAuth = useAuthStore();
const isLoading = ref<boolean>(false);
const name = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const username = ref<string>('');

const signIn = (): void => {
	if(!name.value){
		toast.add({
			severity: 'error',
			summary: 'Ошибка',
			detail: 'Введите свое имя',
			life: 3000
		})
		return;
	}
	if(!lastName.value){
		toast.add({
			severity: 'error',
			summary: 'Ошибка',
			detail: 'Введите свою фамилию',
			life: 3000
		})
		return;
	}
  if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email.value)) {
	  toast.add({
		  severity: 'error',
		  summary: 'Ошибка',
		  detail: 'Введите валидную почту',
		  life: 3000
	  })
		return;
  }
	if(!username.value){
		toast.add({
			severity: 'error',
			summary: 'Ошибка',
			detail: 'Введите логин',
			life: 3000
		});
		return;
	}
	if (!/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password.value)) {
		toast.add({
			severity: 'error',
			summary: 'Ошибка',
			detail: 'Введите валидный пароль',
			life: 3000
		})
		return;
	}
  ApiService.post(Api.signUp, {
    name: name.value,
    lastName: lastName.value,
    email: email.value,
	  username: username.value,
    password: password.value,
  }).then((response) => {
    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Вы успешно зарегисрировались',
      life: 3000
    });
    console.log(response)
  })
}
</script>

<template>
  <Dialog v-model:visible="storeAuth.stateModalSignUp" modal>
    <template #header>
      <p>Регистрация</p>
    </template>
    <template #default>
      <div class="flex flex-column gap-3">
        <InputText placeholder="Имя" v-model="name" @keydown.enter="signIn" :disabled="isLoading" />
        <InputText
          placeholder="Фамилия"
          v-model="lastName"
          @keydown.enter="signIn"
          :disabled="isLoading"
        />
        <InputText
          placeholder="Email"
          v-model="email"
          @keydown.enter="signIn"
          :disabled="isLoading"
        />
	      <InputText
			      placeholder="Логин"
			      v-model="username"
			      @keydown.enter="signIn"
			      :disabled="isLoading"
	      />
        <Password
          placeholder="Пароль"
          v-model="password"
          @keydown.enter="signIn"
          promptLabel="Введите пароль"
          weakLabel="Легкий"
          mediumLabel="Средняя сложность"
          strongLabel="Сложный пароль"
          toggleMask
          :disabled="isLoading"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-column align-items-center">
        <Button label="Зарегистрироваться" :loading="isLoading" @click="signIn" />
        <p
          class="cursor-pointer"
          @click="(storeAuth.stateModalSignIn = true), (storeAuth.stateModalSignUp = false)"
        >
          Уже есть аккаунт?
        </p>
      </div>
    </template>
  </Dialog>
</template>

<style scoped></style>