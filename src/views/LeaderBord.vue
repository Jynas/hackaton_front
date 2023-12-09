<script setup lang="ts">
// import ApiService from "@/core/service/ApiService";
// import Api from "@/config/Api";
import { ref } from 'vue';

const dataTable = ref([
	{
		place: 1,
		login: "nikita",
		amount: 650
	},
	{
		place: 2,
		login: "petr",
		amount: 550
	},
	{
		place: 3,
		login: "denis",
		amount: 450
	},
	{
		place: 4,
		login: "artem",
		amount: 350
	},
	{
		place: 5,
		login: "gleb",
		amount: 250
	},
]);

// const getPoints = (): void => {
// 	ApiService.get(Api.points).then(response => {
// 		dataTable.value = response.data;
// 	})
// }
// getPoints();
const currentUser = ref();
</script>

<template>
<div>
	<div class="mt-2 mb-2 flex gap-2">
		<InputText v-model="currentUser"  placeholder="Имя пользователя" />
	</div>
	<DataTable :value="dataTable" showGridlines :rows="5" paginator :rowsPerPageOptions="[5, 10, 20, 50]">
		<Column header="Место">
			<template #body="slotProps">
				{{ slotProps.data.place }}
			</template>
		</Column>
		<Column header="Пользователь">
			<template #body="slotProps">
				{{ slotProps.data.login }}
			</template>
		</Column>
		<Column header="Очки">
			<template #body="slotProps">
				{{ slotProps.data.amount }}
			</template>
		</Column>
	</DataTable>
</div>
</template>

<style scoped lang="scss">

</style>