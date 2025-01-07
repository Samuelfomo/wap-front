<template>
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
        <p class="text-center text-gray-400 font-light uppercase text-2xl pb-0 mb-0">welcome</p>
        <p class="text-black text-center font-normal text-sm">Enter your account number.</p>

        <div class="p-4 mt-2">
          <div class="relative border-gray-300 flex justify-center ">
            <input
                type="tel"
            v-model="code"
                placeholder="+237699888..."
                class="text-end px-6 py-2 text-lg border border-gray-400 rounded-xl
                 focus:outline-none focus:border-green-600 focus:ring-2
                 focus:ring-green-200 transition duration-300
                 placeholder-gray-400 font-bold"
            >
          </div>
          <p v-if="errors.code" class="text-red-600 text-sm mt-1 text-center ">{{ errors.code }}</p>
        </div>


      </div>
      <div class="border-t border-t-gray-100">
        <button
            @click="handleSubmit"
            class="w-full bg-black text-white font-bold py-3 mt-8 rounded-xl hover:bg-green-500
            transition duration-300 capitalize"
        >
          verify
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoading = ref(false);
const code = ref('');
const errors = ref({
  code: '',
});
const handleSubmit = () => {
  errors.value = {
    code:''
  };

  if(!code.value){
    errors.value.code='your account number is required';
  }
  if(!errors.value.code){
    router.push('/login')
  }
}

</script>