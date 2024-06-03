<script setup lang="ts">
import { computed, ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const email = ref<string>('');
const password = ref<string>('');
const isLogin = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const router = useRouter();

const subtitleText = computed<string>(() => {
    return isLogin.value ? 'Аккаунта еще нет?' : 'Уже есть аккаунт?'
})
const linkAccountText = computed<string>(() => {
    return isLogin.value ? 'Создайте сейчас' : 'Войдите в него'
})
const submitButtonText = computed<string>(() => {
    return isLogin.value ? 'Вход' : 'Регистрация'
})

const submitForm = (): void => { 
  if(isLogin.value) {
    signIn();
  } else {
    signUp();
  }
}

const toggleAuth = () => {
    isLogin.value = !isLogin.value;
}

const signUp = async(): Promise<void> => {
  isLoading.value = true;
  // const auth = getAuth();

  try {    
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value);    
    router.push('/')    

  } 
  catch (error: unknown) {
    if(error instanceof Error) {      
      toast.add({severity: 'error', summary: 'error', detail: error.message, life: 3000})
    }
  } 
  finally {
    isLoading.value = false;
  }
}

const signIn = async(): Promise<void> => {
  isLoading.value = true;
  const auth = getAuth();

  try {    
    const user = await signInWithEmailAndPassword(auth, email.value, password.value);    
    router.push('/')
    console.log('user', user)

  } 
  catch (error: unknown) {
    if(error instanceof Error) {
      console.log('error message')
      toast.add({severity: 'error', summary: 'error', detail: error.message, life: 3000})
    }
  } 
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
    <app-toast position="bottom-right"></app-toast>
    <div class="flex justify-content-center p-2 form-wrapper">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w=6">
            <div class="text-center mb-3">
                <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
                <span class="text-600 font-medium line-height-3">{{ subtitleText }}</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toggleAuth">{{ linkAccountText }}</a>
            </div>
            <form @submit.prevent="submitForm">
                <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                <app-inputtext v-model="email" id="email" type="email" class="w-full mb-3"/>

                <label for="password1" class="block text-900 font-medium mb-2">Пароль</label>
                <app-inputtext v-model="password" id="email" type="email" class="w-full mb-3"/>
            </form>
            <app-button
                :label="submitButtonText"
                type="submit"
                icon="pi pi-user"
                :loading="isLoading"
                class="w-full"
                @click="submitForm"
            >
                
            </app-button>    

        </div>
    </div>
</template>
<style scoped>
.form-wrapper {
  max-width: 600px;
  margin: auto;
}
</style>