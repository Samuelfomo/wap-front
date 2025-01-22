<template xmlns="http://www.w3.org/1999/html">

  <div class="bg-neutral-100 min-h-screen content-center">
        <div
            v-if="isLoading"
            class="fixed inset-0 flex flex-col items-center justify-center bg-neutral-50 bg-opacity-70 z-50"
        >
          <svg aria-hidden="true" role="status" class="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101"
              fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#3AEA52"/>
          </svg>
          <p class="mt-4 font-medium text-gray-700">Loading...</p>
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
import { useLoginStore } from '@/stores/loginStore'

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
      isLoading.value = true;
      const pinvalid = new Login(null, null, null, pinValue);
      console.log('pin send is:', pinValue)
      const isPinValid = pinvalid.PIN_validator();
      if (!isPinValid) {
        errors.value.pin = 'Invalid PIN format';
        return;
      }

      const response = new Login(null, null, mobileFromQuery, pinValue);
      const result = await response.Login();
      if(result) {
        const loginStore = useLoginStore();
        loginStore.setUserData({
          mobile: result.mobile,
          guid: result.guid
        })
        // loginStore.setUserData(result);

        await router.push({ name: 'home' });
      }
    } catch (error) {
      console.error('Check authentification fail', error);
      alert(error);
    }
    finally {
      isLoading.value = false
    }
  }
};
// const handleSubmit = async () => {
//   if (pin.value.some((digit, index) => {
//     const cleanedDigit = digit.replace(/\s+/g, '').trim();
//     if (cleanedDigit === '') {
//       // Efface le champ vide
//       pin.value[index] = '';
//       return true;
//     }
//     return false;
//   })) {
//     errors.value.pin = 'Please complete all fields.';
//
//     setTimeout(() => {
//       errors.value.pin = '';
//     }, 1000);
//
//     return;
//   } else {
//     errors.value.pin = '';
//     const pinValue = Number(pin.value.join('').replace(/\s+/g, '').trim());
//     try {
//       const pinvalid = new Login(null, null, null, pinValue);
//
//       console.log('pin send is:', pinValue)
//       const isPinValid = pinvalid.PIN_validator();
//       if (!isPinValid) {
//         errors.value.pin = 'Invalid PIN format';
//         return;
//       }
//           const response = new Login(null, null, mobileFromQuery, pinValue);
//           const result = await response.Login();
//           if(result){
//             console.log(result.mobile.toString());
//               alert('connection success');
//               await router.push({
//                 name:'home',
//                 query: { data: JSON.stringify(result)   }
//               });
//           }
//           else {
//             console.error('User authentification fail');
//           }
//     } catch (error) {
//       console.error('Check authentification fail', error);
//       alert(error);
//     }
//   }
// };




</script>

<style scoped>
/* Styles personnalisés supplémentaires si nécessaire */
</style>
