<template xmlns="http://www.w3.org/1999/html">

  <div class="bg-neutral-100 min-h-screen content-center">
    <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 backdrop-blur-sm">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      <p class="ml-4 font-medium text-blue-700" >Chargement...</p>
    </div>

      <div class="bg-white mx-auto max-w-sm overflow-hidden shadow-lg rounded-2xl p-3">
        <div class="w-full pt-7 pb-7">
          <img src="@/assets/images/logo-wap.svg" alt="logo wap" class="h-16 mx-auto">
        </div>

      <div class="border-t border-t-gray-100 py-10">
        <p class="text-center text-gray-400 font-light uppercase text-2xl pb-0 mb-0">Let go 😊</p>
        <p class="text-black text-center font-normal text-sm">Enter the 4-digit App authentication PIN.</p>

        <div class="p-4 mt-2 ">
          <div class="relative border-gray-300 flex justify-center gap-4">
            <input
                v-for="(value, index) in pin"
                :key="index"
                v-model="pin[index]"
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg bg-gray-100
              focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition
              duration-300 placeholder-gray-600"
                @input="handlepinInput(index)"
                @keydown="handleKeyDown($event, index)"
            />
          </div>
          <p v-if="errors.pin" class="text-red-600 text-sm mt-1 text-center">{{ errors.pin }}</p>
        </div>

      </div>
      <div class="border-t border-t-gray-100">
          <a href="#" class="float-right text-gray-700 font-light  hover:text-green-500
            transition duration-300">Forgot password?</a>

        <button
            @click="handleSubmit"
            class="w-full py-3 mt-8 rounded-xl bg-black text-white font-bold  hover:bg-green-500
            transition duration-300 capitalize"
        >
          connexion
        </button>
        <div class="text-center text-lg mt-4 cursor-pointer font-light pb-0 mb-0">
          <span>D'ont have account? <a href="#" class="pl-2 text-black  hover:text-green-500
            transition duration-300">Register</a></span>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts" >
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue'

import {Login} from "@/class/Login";

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const pin = ref(['', '', '', '']);

const mobileFromQuery = Number(route.query.mobile as string)
console.log('mobile received has:',mobileFromQuery)

const errors = ref({
  pin: ''
});

const handlepinInput = (index: number) => {

  if (pin.value[index].length === 1 && index < pin.value.length - 1)
  {
    // Passer automatiquement au champ suivant
    const nextInput = document.querySelectorAll('input')[index + 1];
    nextInput && (nextInput as HTMLInputElement).focus();
  }
  else if (pin.value[index].length === 0 && index > 0)
  {
    // Revenir automatiquement au champ précédent si l'utilisateur efface
    const prevInput = document.querySelectorAll('input')[index - 1];
    prevInput && (prevInput as HTMLInputElement).focus();
    pin.value[index - 1] = '';
  }
};
const handleKeyDown = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && pin.value[index].length === 0 && index > 0) {
    // Si Backspace est pressé sur un champ vide, focus et vide le précédent
    const prevInput = document.querySelectorAll('input')[index - 1];
    if (prevInput) {
      (prevInput as HTMLInputElement).focus();
      pin.value[index - 1] = '';
    }
  }
};

const handleSubmit = async () => {
  if (pin.value.some((digit, index) => {
    const cleanedDigit = digit.replace(/\s+/g, '').trim();
    if (cleanedDigit === '') {
      // Efface le champ vide
      pin.value[index] = '';
      return true;
    }
    return false;
  })) {
    errors.value.pin = 'Please complete all fields.';

    setTimeout(() => {
      errors.value.pin = '';
    }, 1000);

    return;
  } else {
    errors.value.pin = '';
    const pinValue = Number(pin.value.join('').replace(/\s+/g, '').trim());
    try {
      const pinvalid = new Login(null, null, null, pinValue);

      console.log('pin send is:', pinValue)
      const isPinValid = await pinvalid.PIN_validator();
      if (!isPinValid) {
        errors.value.pin = 'Invalid PIN format';
        return;
      }
      await router.push('/home');
          // const response = new Login(null, null, mobileFromQuery, pinValue);
          // const result = await response.Login();
          // if(result){
          //   console.log(result);
          //     alert('connection success');
          //     await router.push('/home');
          // }
          // else {
          //   console.error('User authentification fail');
          // }
    } catch (error) {
      // console.error('Check authentification fail', error);
      // alert(error);
      await router.push('/home');
    }
  }
};




</script>

<style scoped>
/* Styles personnalisés supplémentaires si nécessaire */
</style>
