<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useUserStore } from '@/stores/user';
import type { IInterview } from '@/interfaces';
import { useConfirm } from "primevue/useconfirm";


const userStore = useUserStore();
const db = getFirestore();
const confirm = useConfirm();
const isLoading = ref<boolean>(true);
const interviews = ref<IInterview[]>([]);

const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const getData = query(collection(db, `users/${userStore.userId}/interviews`), orderBy('createdAt', 'desc'));
  const listDocs = await getDocs(getData);

  // console.log(listDocs);

  return listDocs.docs.map((doc) => doc.data() as T)

}
const confirmRemoveInterview = async(id: string): Promise<void> => {
  confirm.require({
    message: 'Вы хотите удалить собеседование?',
    header: 'Удаление',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      isLoading.value = true;
      await deleteDoc(doc(db, `users/${userStore.userId}/interviews`, id));
      const listInterviews: IInterview[] = await getAllInterviews();
      interviews.value = [...listInterviews];
      isLoading.value = false;
    }

  })
}

onMounted(async() => {
  const listInterviews: IInterview[] = await getAllInterviews();
  console.log('data - ', listInterviews);

  interviews.value = [...listInterviews];
  isLoading.value = false;
})
</script>

<template>
  <app-dialog></app-dialog>
  <app-progress v-if="isLoading"/>
  <app-message v-else-if="!isLoading && !interviews.length" severity="info">Список пуст</app-message>
  <div v-else>
    <h1>Список собеседований</h1>
    <app-datatable :value="interviews">
      <app-column field="company" header="Компания"></app-column>
      <app-column field="hrName" header="Имя HR"></app-column>
      <app-column field="vacancyLink" header="Вакансия">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank">{{ slotProps.data.vacancyLink }}</a>
        </template>
      </app-column>
      <app-column header="Контакты">
        <template #body="slotProps">
          <a
            v-if="slotProps.data.contactTelegram"
            :href="`https://t.me/${slotProps.data.contactTelegram }`" target="_blank" class="contacts__telegram">
            <span class="contact__icon pi pi-telegram"></span>
          </a>
          <a
            v-if="slotProps.data.contactWhatsApp"
            :href="`https://wa.me/${slotProps.data.contactWhatsApp }`" target="_blank" class="contacts__whatsapp">
            <span class="contact__icon pi pi-whatsapp"></span>
          </a>
          <a
            v-if="slotProps.data.contactPhone"
            :href="`https://tel:/${slotProps.data.contactPhone }`" target="_blank" class="contacts__phone">
            <span class="contact__icon pi pi-phone"></span>
          </a>
        </template>
      </app-column>
      <app-column>
        <template #body="slotProps">
          <div class="flex gap-2">
            <router-link :to="`/interview/${slotProps.data.id}`">
              <app-button icon="pi pi-pencil" severity="info"></app-button>
            </router-link>
            <app-button icon="pi pi-trash" severity="danger" @click="confirmRemoveInterview(slotProps.data.id)"></app-button>
          </div>
        </template>
      </app-column>
    </app-datatable>
  </div>
</template>

<style scoped>
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;

}
.contacts__whatsapp,.contacts__phone {
  margin-left: 10px;
}
</style>
