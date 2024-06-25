<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { IInterview } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const router = useRouter();
const db = getFirestore();

const company = ref<string>('');
const vacancyLink = ref<string>('');
const hrName = ref<string>('');
const contactTelegram = ref<string>('');
const contactWhatsApp = ref<string>('');
const contactPhone = ref<string>('');
const loading = ref<boolean>(false);

const disabledSaveButton = computed(() => {
	return !(company.value && vacancyLink.value && hrName.value)
})


const addNewInterview = async(): Promise<void> => {
	loading.value = true;
	const payload: IInterview = {
		id: uuidv4(),
		company: company.value,
		vacancyLink: vacancyLink.value,
		hrName: hrName.value,
		contactTelegram: contactTelegram.value,
		contactWhatsApp: contactWhatsApp.value,
		contactPhone: contactPhone.value,
		createdAt: new Date()
	}
	//console.log(payload)

	const userId = getAuth().currentUser?.uid;	
	if(userId) {
		await setDoc(doc(db, `users/${userId}/interviews`, payload.id), payload).then(() => {
			router.push('/list');
		});
	}
	loading.value = false;
}

</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Новое собеседование</template>
      <template #content>
        <app-inputtext class="input mb-3" placeholder="Компания" v-model="company" />
        <app-inputtext
          v-model="vacancyLink"
          class="input mb-3"
          placeholder="Описание вакансии (ссылка)"
        />
        <app-inputtext v-model="hrName" class="input mb-3" placeholder="Контакт (имя)" />
        <app-inputtext
          v-model="contactTelegram"
          class="input mb-3"
          placeholder="Telegram username HR"
        />
        <app-inputtext
          v-model="contactWhatsApp"
          class="input mb-3"
          placeholder="WhatsApp телефон HR"
        />
        <app-inputtext v-model="contactPhone" class="input mb-3" placeholder="Телефон HR" />
        <app-button
          @click="addNewInterview"
          label="Создать собеседование"
          :disabled="disabledSaveButton"
          :loading="loading"
        ></app-button>
      </template>
    </app-card>
  </div>
</template>
<style scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: auto;
}
</style>
../interfaces