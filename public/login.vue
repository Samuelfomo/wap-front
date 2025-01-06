<template>

  <div class="bg-gray-100 flex items-center justify-center min-h-screen ">
    <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 backdrop-blur-sm">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      <p class="ml-4 font-medium" style="color: #FF4200">Chargement...</p>
    </div>

    <div class="bg-gray-100 w-full max-w-md p-3 ">
      <div class="flex flex-wrap h-14 shadow-lg shadow-gray-600">
        <!-- Carte -->
        <div class="bg-gray-800 p-1 flex-1 w-full">
          <div class="text-lg mb-2">
            <p class=" text-center text-white font-roboto pt-2 capitalize"> Creer mon compte croco+ </p>
          </div>
        </div>
      </div>
        <div class="bg-white shadow-lg shadow-gray-600 w-full max-w-md p-3">
          <header class="py-2 px-4 rounded-t-lg text-center">
            <img :src="croco" alt="Croco" class="max-w-40 mx-auto mt-4"/>
          </header>
          <div class="p-4">
            <p class="text-right"><span class="text-red-600 text-2xl" >⋆</span>champs obligatoires</p>
            <p class="text-gray-600 mb-4"><span class="text-red-600 text-2xl" >⋆</span>Entrez votre email</p>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="Votre adresse mail"
                class="w-full px-6 py-2 text-lg border-2 border-gray-300 rounded-xl
                 focus:outline-none focus:border-green-500 focus:ring-2
                 focus:ring-green-200 transition duration-300
                 placeholder-gray-400"
              />
              <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
            </div>
            <p class="text-gray-600 mb-4"><span class="text-red-600 text-2xl" >⋆</span>Entrez votre mot de passe</p>
            <div class="relative">
              <input
                v-model="password"
                type="password"
                placeholder="Votre mot de passe"
                class="w-full px-6 py-2 text-lg border-2 border-gray-300 rounded-xl
                 focus:outline-none focus:border-green-500 focus:ring-2
                 focus:ring-green-200 transition duration-300
                 placeholder-gray-400"
              />
              <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
            </div>
            <p class="text-gray-600 mb-4"><span class="text-red-600 text-2xl" >⋆</span>Entrez à nouveau votre mot de passe</p>
            <div class="relative">
              <input
                v-model="confirmed"
                type="password"
                placeholder="Confirmer votre mot de passe"
                class="w-full px-6 py-2 text-lg border-2 border-gray-300 rounded-xl
                 focus:outline-none focus:border-green-500 focus:ring-2
                 focus:ring-green-200 transition duration-300
                 placeholder-gray-400"
              />
                          <p v-if="errors.confirmed" class="text-red-600 text-sm mt-1">{{ errors.confirmed }}</p>
            </div>

            <button
              @click="handleSubmit"
              class="w-full bg-green-800 text-white font-bold py-3 mt-8 rounded-xl hover:bg-green-900
            transition duration-300 lowercase"
            >
              Créer un compte
            </button>

            <div class="text-center text-sm text-gray-500 mt-4 mb-2">
              Besoin d'aide ? <a href="#" class="text-green-700 hover:underline">Contactez-nous</a>
            </div>
          </div>
        </div>

    </div>
  </div>

</template>

<script setup lang="ts" >
import croco from "@/assets/images/croco1.png"
import { ref } from 'vue'

const isLoading = ref(false);
const email = ref('');
const password = ref('')
const confirmed = ref('')

const errors = ref({
  email: '',
  password: '',
  confirmed: ''
});

const handleSubmit = () => {
  // Reset errors
  errors.value = {
    email: '',
    password: '',
    confirmed: ''
  };

  // Validate fields
  if (!email.value) {
    errors.value.email = 'Veuillez entrer votre adresse email';
  }
  if (!password.value) {
    errors.value.password = 'Veuillez entrer votre mot de passe';
  }
  if (!confirmed.value) {
    errors.value.confirmed = 'Veuillez confirmer votre mot de passe';
  }

  // If no errors, proceed with form submission
  if (!errors.value.email && !errors.value.password && !errors.value.confirmed) {
    // Add form submission logic here
    const submit = confirmed.value
    console.log('Form submitted',submit);
  }
};



</script>

<style scoped>
/* Styles personnalisés supplémentaires si nécessaire */
</style>

<!--<template>-->
<!--  <div class="bg-gray-100 flex items-center justify-center min-h-screen ">-->
<!--    <div-->
<!--      v-if="isLoading"-->
<!--      class="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 backdrop-blur-sm">-->
<!--      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>-->
<!--      <p class="ml-4 font-medium" style="color: #FF4200">Chargement...</p>-->
<!--    </div>-->

<!--    <div class="bg-gray-100 w-full max-w-md p-3 ">-->
<!--      <div class="flex flex-wrap h-14 shadow-lg shadow-gray-600">-->
<!--        <div class="bg-gray-800 p-1 flex-1 w-full">-->
<!--          <div class="text-lg mb-2">-->
<!--            <p class="text-center text-white font-roboto pt-2 capitalize">Creer mon compte croco+</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="bg-white shadow-lg shadow-gray-600 w-full max-w-md p-3">-->
<!--        <header class="py-2 px-4 rounded-t-lg text-center">-->
<!--          <img :src="croco" alt="Croco" class="max-w-40 mx-auto mt-4"/>-->
<!--        </header>-->
<!--        <div class="p-4">-->
<!--          <p class="text-right"><span class="text-red-600 text-2xl">⋆</span>champs obligatoires</p>-->
<!--          <p class="text-gray-600 mb-4"><span class="text-red-600 text-2xl">⋆</span>Entrez votre email</p>-->
<!--          <div class="relative">-->
<!--            <input-->
<!--              v-model="email"-->
<!--              type="email"-->
<!--              placeholder="Votre adresse mail"-->
<!--              class="w-full px-6 py-2 text-lg border-2 border-gray-300 rounded-xl-->
<!--               focus:outline-none focus:border-green-500 focus:ring-2-->
<!--               focus:ring-green-200 transition duration-300-->
<!--               placeholder-gray-400"-->
<!--            />-->
<!--            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>-->
<!--          </div>-->
<!--          <p class="text-gray-600 mb-4"><span class="text-red-600 text-2xl">⋆</span>Entrez votre mot de passe</p>-->
<!--          <div class="relative">-->
<!--            <input-->
<!--              v-model="password"-->
<!--              type="password"-->
<!--              placeholder="Votre mot de passe"-->
<!--              class="w-full px-6 py-2 text-lg border-2 border-gray-300 rounded-xl-->
<!--               focus:outline-none focus:border-green-500 focus:ring-2-->
<!--               focus:ring-green-200 transition duration-300-->
<!--               placeholder-gray-400"-->
<!--            />-->
<!--            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>-->
<!--          </div>-->
<!--          <p class="text-gray-600 mb-4"><span class="text-red-600 text-2xl">⋆</span>Entrez à nouveau votre mot de passe</p>-->
<!--          <div class="relative">-->
<!--            <input-->
<!--              v-model="confirmed"-->
<!--              type="password"-->
<!--              placeholder="Confirmer votre mot de passe"-->
<!--              class="w-full px-6 py-2 text-lg border-2 border-gray-300 rounded-xl-->
<!--               focus:outline-none focus:border-green-500 focus:ring-2-->
<!--               focus:ring-green-200 transition duration-300-->
<!--               placeholder-gray-400"-->
<!--            />-->
<!--            <p v-if="errors.confirmed" class="text-red-500 text-sm mt-1">{{ errors.confirmed }}</p>-->
<!--          </div>-->

<!--          <button-->
<!--            @click="handleSubmit"-->
<!--            class="w-full bg-green-800 text-white font-bold py-3 mt-8 rounded-xl hover:bg-green-900-->
<!--            transition duration-300 lowercase"-->
<!--          >-->
<!--            Créer un compte-->
<!--          </button>-->

<!--          <div class="text-center text-sm text-gray-500 mt-4 mb-2">-->
<!--            Besoin d'aide ? <a href="#" class="text-green-700 hover:underline">Contactez-nous</a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import croco from "@/assets/images/croco1.png"-->
<!--import { ref } from 'vue'-->

<!--const isLoading = ref(false);-->
<!--const email = ref('');-->
<!--const password = ref('');-->
<!--const confirmed = ref('');-->
<!--const errors = ref({-->
<!--  email: '',-->
<!--  password: '',-->
<!--  confirmed: ''-->
<!--});-->

<!--const handleSubmit = () => {-->
<!--  // Reset errors-->
<!--  errors.value = {-->
<!--    email: '',-->
<!--    password: '',-->
<!--    confirmed: ''-->
<!--  };-->

<!--  // Validate fields-->
<!--  if (!email.value) {-->
<!--    errors.value.email = 'Veuillez entrer votre adresse email';-->
<!--  }-->
<!--  if (!password.value) {-->
<!--    errors.value.password = 'Veuillez entrer votre mot de passe';-->
<!--  }-->
<!--  if (!confirmed.value) {-->
<!--    errors.value.confirmed = 'Veuillez confirmer votre mot de passe';-->
<!--  }-->

<!--  // If no errors, proceed with form submission-->
<!--  if (!errors.value.email && !errors.value.password && !errors.value.confirmed) {-->
<!--    // Add form submission logic here-->
<!--    console.log('Form submitted');-->
<!--  }-->
<!--};-->
<!--</script>-->
