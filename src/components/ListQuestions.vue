<script setup lang="ts">
import { ref } from 'vue';
import ApiService from "@/core/service/ApiService";
import Api from "@/config/Api";
import {useToast} from "primevue/usetoast";

const toast = useToast();
const dataTable = ref();
const levels = ref(["Легкий", "Средний", "Сложный"]);
const types = ref(["Один ответ", "Много ответов", "Написанный от руки ответ", "Написание кода"]);
const prices = ref(["Бесплатный", "Платный"]);
const stateModal = ref<boolean>(false);
const currentQuestion = ref();
const answers = ref();
const currentAnswer = ref();
const correctAnswer = ref();
const isSuccess = ref();
const currentLevel = ref();
const currentType = ref();
const currentPrice = ref();


const pullInfoAnswer = (state:boolean):void => {
	ApiService.post(`${Api.questionsAnswer}`, {
		questionId: currentQuestion.value.id,
		isSuccess: state,
	})
			.then()
			.catch(() => {
		toast.add({
			severity: 'error',
			summary: 'Ошбика',
			detail: 'При выполнении запроса произошла ошибка',
			life: 3000
		});
	})
}
const checkAnswer = (): void => {
	ApiService.get(`${Api.checkAnswer}?QuestionId=${currentQuestion.value.id}`).then((response) => {
		correctAnswer.value = response.data.annotation;
		isSuccess.value = correctAnswer.value === currentAnswer.value
		pullInfoAnswer(isSuccess.value)
	}).catch(() => {
		toast.add({
			severity: 'error',
			summary: 'Ошбика',
			detail: 'При выполнении запроса произошла ошибка',
			life: 3000
		});
	})
}

const getAnswers = (slotProps: {data: object}):void => {
	currentQuestion.value = slotProps.data;
	currentAnswer.value = '';
	ApiService.get(`${Api.answers}/${currentQuestion.value.id}`).then((response) => {
		stateModal.value = true;
		answers.value = response.data
	}).catch(() => {
		toast.add({
			severity: 'error',
			summary: 'Ошбика',
			detail: 'При выполнении запроса произошла ошибка',
			life: 3000
		});
	})
}

const getQuestions = ():void => {
	ApiService.get(Api.questions).then((response) => {
		dataTable.value = response.data;
	}).catch(() => {
		toast.add({
			severity: 'error',
			summary: 'Ошбика',
			detail: 'При выполнении запроса произошла ошибка',
			life: 3000
		});
	})
}
getQuestions()
</script>

<template>
<!-- фильтры, правильный ответ .....
	 нерправильный ответ ...-->
	<div class="mt-2 mb-2 flex gap-2">
		<Dropdown v-model="currentLevel" :options="levels" placeholder="Выберите уровень" />
		<Dropdown v-model="currentType" :options="types" placeholder="Выберите тип" />
		<Dropdown v-model="currentPrice" :options="prices" placeholder="Выберите стоимость" />
	</div>
	<DataTable :value="dataTable" showGridlines :rows="5" paginator :rowsPerPageOptions="[5, 10, 20, 50]">
		<Column header="Уровень">
			<template #body="slotProps">
				{{ levels[slotProps.data.level] }}
			</template>
		</Column>
		<Column header="Тип">
			<template #body="slotProps">
				{{ types[slotProps.data.type] }}
			</template>
		</Column>
		<Column header="Вопрос">
			<template #body="slotProps">
				{{ slotProps.data.content }}
			</template>
		</Column>
		<Column header="Стоимость">
			<template #body="slotProps">
				{{ slotProps.data.isFree ? "Бесплатный" : "Платный" }}
			</template>
		</Column>
		<Column header="">
			<template #body="slotProps">
				<Button :label="slotProps.data.isFree ? 'Пройти' : 'Купить'" @click="slotProps.data.isFree ? getAnswers(slotProps) : ''" />
			</template>
		</Column>
	</DataTable>
	<Dialog v-model:visible="stateModal" header="Вопрос" modal @hide="correctAnswer = ''">
		<template #default>
			<div class="flex flex-wrap gap-5">
				<div>
					<span>{{ currentQuestion.content }}</span>
					<div class="flex flex-column gap-2 mt-3">
						<div class="flex align-items-center" v-for="answer in answers" :key="answer.id" @click="currentAnswer = answer.content">
							<RadioButton v-model="currentAnswer" :id="answer.content" :value="answer.content" />
							<label :for="answer.id" class="ml-2" >{{ answer.content }}</label>
						</div>
					</div>
				</div>
				<div v-if="!!correctAnswer">
					<InlineMessage class="mb-3" :severity="isSuccess ? 'success' : 'warn' ">Правильный ответ: {{ correctAnswer }}</InlineMessage>
					<InlineMessage severity="info" >{{ isSuccess ? ' Правильный' : 'Неправильный' }} ответ потому что: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis ipsa nostrum officia quaerat quia quidem quod soluta voluptatem. Cum, deserunt exercitationem labore molestias numquam odit omnis placeat quam quod? <a href="https://habr.com/ru/feed/">Ссылка на статью</a></InlineMessage>
					<div  class="flex flex-column gap-3 mt-3">
						<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis ipsa nostrum officia quaerat quia quidem quod soluta voluptatem. Cum, deserunt exercitationem labore molestias numquam odit omnis placeat quam quod?</span>
						<iframe src="https://vk.com/video_ext.php?oid=-218628569&id=456239047&hash=2d6ab6e9b0e12d63" frameborder="0" height="320" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
					</div>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex justify-content-center gap-3" v-if="!correctAnswer">
				<Button label="Отменить" severity="danger" @click="stateModal = false" />
				<Button label="Ответить" @click="checkAnswer"  />
			</div>
		</template>
	</Dialog>
</template>

<style scoped lang="scss">

</style>