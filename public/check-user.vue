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
            v-model="mobile"
                placeholder="+237699888..."
                class="text-end px-6 py-2 text-lg border border-gray-400 rounded-xl
                 focus:outline-none focus:border-green-600 focus:ring-2
                 focus:ring-green-200 transition duration-300
                 placeholder-gray-400 font-bold"
            >
          </div>
          <p v-if="errors.mobile" class="text-red-600 text-sm mt-1 text-center ">{{ errors.mobile }}</p>
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
const mobile = ref('');
const errors = ref({
  mobile: '',
});
const handleSubmit = async () => {
  errors.value = {
    mobile: ''
  };

  if (!mobile.value) {
    errors.value.mobile = 'your account number is required';
  }

  if (isNaN(Number(mobile.value))) {
    errors.value.mobile = "Please enter a valid account number"
  }
  if (!errors.value.mobile) {
    const mobileData = mobile.value.replace(/\s+/g, '');
    console.log('mobile send is:', Number(mobileData))
    try {
      const response = new Login(
          null,
          null,
          Number(mobileData),
          null
      )
    const valid = await response.Mobile_validator();
      console.log("verify mobile account is :", valid);
      if(valid){
        console.log('mobile value', mobile.value)
        setTimeout(async ()=>{
          await router.push({
            name: 'login',
            query: { mobile: mobile.value.toString()  }
          });
        }, 1000);
      }
      // const result = await response.Check();
      // if (valid) {
      //   alert('connection success')
      //   router.push('/login')
      // }
    } catch (error) {
      console.log('error has occurred',error)
      throw new Error('Authentification fail!');
    }
  }
}

</script>