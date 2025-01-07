<template>

  <div class=" bg-blue-100 flex items-center justify-center min-h-screen ">
    <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 backdrop-blur-sm">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      <p class="ml-4 font-medium text-blue-700" >Chargement...</p>
    </div>

    <div class=" w-full max-w-md p-3 rounded-2xl bg-white ">

      <div class="p-10">
        <div class="rounded-full h-32 w-32 bg-blue-200 ml-28 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-blue-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <header class="py-2 px-4 text-center">
          <p class=" text-center text-black font-bold pt-2 capitalize text-4xl">Wap App</p>
          <p class="text-gray-500 mt-4 text-center font-bold">Account number</p>
        </header>
        <div class="p-4 ">
          <div class="relative border-gray-300 flex justify-center gap-2">
            <input
                v-for="(value, index) in code"
                :key="index"
                v-model="code[index]"
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg bg-gray-100
              focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition
              duration-300 placeholder-gray-600 m-2"
                @input="handleCodeInput(index)"
            />
          </div>
          <p v-if="errors.code" class="text-red-600 text-sm mt-1">{{ errors.code }}</p>

        </div>
        <div class="py-3 mt-2 w-full flex">
          <button
              @click="router.push('/')"
              class=" text-black text-lg font-bold rounded-xl hover:text-black
            transition duration-300 capitalize ml-6"
          >
            Retour
          </button>
          <button
              @click="handleSubmit"
              class=" text-blue-600 text-lg font-bold rounded-xl hover:text-blue-800
            transition duration-300 capitalize flex-1 ml-28"
          >
            continuer ➡️
          </button>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts" >
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter();

const isLoading = ref(false);
const code = ref(['', '', '', '']);


const errors = ref({
  code: ''
});

const handleCodeInput = (index: number) => {
  if (code.value[index].length === 1 && index < code.value.length - 1) {
    // Passer automatiquement au champ suivant
    const nextInput = document.querySelectorAll('input')[index + 1];
    nextInput && (nextInput as HTMLInputElement).focus();
  } else if (code.value[index].length === 0 && index > 0) {
    // Revenir automatiquement au champ précédent si l'utilisateur efface
    const prevInput = document.querySelectorAll('input')[index - 1];
    prevInput && (prevInput as HTMLInputElement).focus();
  }
};

const handleSubmit = () => {
  // Validation du CODE
  if (code.value.some((digit) => digit === '')) {
    errors.value.code = 'Please complete all fields.';
  } else {
    errors.value.code = '';
    // Traitez le CODE ici (exemple : l'envoyer au backend)
    const codeValue = code.value.join('')
    console.log('Code soumis :', codeValue);
    router.push('/login');
  }
};




</script>

<style scoped>
/* Styles personnalisés supplémentaires si nécessaire */
</style>

