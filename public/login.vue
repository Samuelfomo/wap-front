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
                v-for="(value, index) in code"
                :key="index"
                v-model="code[index]"
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg bg-gray-100
              focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition
              duration-300 placeholder-gray-600"
                @input="handleCodeInput(index)"
            />
          </div>
          <p v-if="errors.code" class="text-red-600 text-sm mt-1 text-center">{{ errors.code }}</p>
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
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter();

const isLoading = ref(false);
const code = ref(['', '', '', '']);


const errors = ref({
  code: ''
});

const handleCodeInput = (index: number) => {

  if (code.value[index].length === 1 && index < code.value.length - 1)
  {
    // Passer automatiquement au champ suivant
    const nextInput = document.querySelectorAll('input')[index + 1];
    nextInput && (nextInput as HTMLInputElement).focus();
  }
  else if (code.value[index].length === 0 && index > 0)
  {
    // Revenir automatiquement au champ précédent si l'utilisateur efface
    const prevInput = document.querySelectorAll('input')[index - 1];
    prevInput && (prevInput as HTMLInputElement).focus();
  }
};

const handleSubmit = () => {
  if (code.value.some((digit) => digit === '')) {
    errors.value.code = 'Please complete all fields.';
  } else {
    errors.value.code = '';
    const codeValue = code.value.join('')
    console.log('Code soumis :', codeValue);
    router.push('/');
  }
};



</script>

<style scoped>
/* Styles personnalisés supplémentaires si nécessaire */
</style>
