<script setup lang="ts">

import ListQuestions from "@/components/ListQuestions.vue";
import JwtService from '@/core/service/JwtService'
</script>

<template>
<div>
	<ListQuestions v-if="JwtService.isAuth.value" />
</div>
</template>

<style scoped>

</style>