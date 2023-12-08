<script setup lang="ts">
import { ref } from 'vue';

const dataTable = ref<[]>([])
</script>

<template>
	<TreeTable :value="dataTable" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]">
		<Column field="name" header="Name" expander></Column>
		<Column field="size" header="Size"></Column>
		<Column field="type" header="Type"></Column>
	</TreeTable>
</template>

<style scoped lang="scss">

</style>