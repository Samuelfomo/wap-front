<template>
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
        <p class="text-center text-gray-400 font-light uppercase text-2xl pb-0 mb-0">welcome</p>
        <p class="text-black text-center font-normal text-sm">Enter your account number.</p>

        <div class="p-4 mt-2">
          <div class="relative border-gray-300 flex justify-center ">
            <input
                type="tel"
            v-model="account_number"
                placeholder="+237699888..."
                class="text-end px-6 py-2 text-lg border border-gray-400 rounded-xl
                 focus:outline-none focus:border-green-600 focus:ring-2
                 focus:ring-green-200 transition duration-300
                 placeholder-gray-400 font-bold"
            >
          </div>
          <p v-if="errors.account_number" class="text-red-600 text-sm mt-1 text-center ">{{ errors.account_number }}</p>
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
import {Login}  from "@/class/Login";

const router = useRouter();

const isLoading = ref(false);
const account_number = ref('');
const errors = ref({
  account_number: '',
});
const handleSubmit = async () => {
  errors.value = {
    account_number: ''
  };

  if (!account_number.value) {
    errors.value.account_number = 'your account number is required';
  }

  if (isNaN(Number(account_number.value))) {
    errors.value.account_number = "Please enter a valid account number"
  }
  if (!errors.value.account_number) {
    isLoading.value = true;
    const accountData = account_number.value.replace(/\s+/g, '');
    console.log('account number send is:', Number(accountData))
    try {
      const response = new Login(
          null,
          null,
          null,
          null,
          null,
          Number(accountData),
          null,
          null
      )
    // const valid = await response.mobile_validator();
      const valid = response.ACCOUNT_validator();
      console.log("verify account_number is :", valid);
      if(valid){
        console.log('account_number value', account_number.value)
        await new Promise(resolve => setTimeout(resolve, 1000));
        await router.push({
          name: 'login',
          query: { account_number: account_number.value.toString() }
        });
      } else {
        errors.value.account_number = "Your ACCOUNT NUMBER is invalid. It must be exactly 8 digits.";
        setTimeout(() => {
          errors.value.account_number = "";
        }, 3000);
      }

    } catch (error) {
      console.log('error has occurred',error)
      throw new Error('Authentification fail!');
    }
    finally {
      isLoading.value = false;
    }
  }
}

</script>