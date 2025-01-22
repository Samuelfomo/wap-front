<template>

  <div class="bg-neutral-50 min-h-screen">

    <!-- Header -->
    <Header description="service" />
    <Dashboard />

    <main class="flex-1 p-5 lg:p-10">

    <h3 class="text-2xl font-semibold text-gray-800 mb-6">
<!--      {{!visible? "Gestion des Contacts": "Ajout de Contacts" }}-->
      Gestion des Contacts
    </h3>

      <ContactForm v-if="visible" />

    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-6">
        <h4 class="text-xl font-semibold text-gray-700">Liste des Contacts</h4>
        <div class="flex space-x-4" @click="addForm">
          <span class="text-black-500 text-xl font-black">AJOUTER</span>
          <div
              class="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>

      <table id="contact-table" class="min-w-full bg-white rounded table-class">
        <thead>
        <tr>
          <th class="py-2 px-4 bg-gray-950 border-b border-gray-300 text-left text-sm text-white">
            Nom
          </th>
          <th class="py-2 px-4 bg-gray-950 border-b border-gray-300 text-left text-sm text-white">
            Mobile
          </th>
          <th class="py-2 px-4 bg-gray-950 border-b border-gray-300 text-left text-sm text-white">
            Email
          </th>
          <th class="py-2 px-4 bg-gray-950 border-b border-gray-300 text-left text-sm text-white">
            Ville
          </th>
          <th class="py-2 px-4 bg-gray-950 border-b border-gray-300 text-left text-sm text-white">
            Langue
          </th>
          <th class="py-2 px-4 bg-gray-950 border-b border-gray-300 text-left text-sm text-white">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="hover:bg-gray-50">
          <td class="py-2 px-4 border-b border-gray-300">
              <span class="inline-block font-semibold w-2.5 h-2.5 rounded-full bg-black mr-2 absolute"></span>
          </td>
          <td class="py-2 px-4 border-b border-gray-300">
          </td>
          <td class="py-2 px-4 border-b border-gray-300">
          </td>
          <td class="py-2 px-4 border-b border-gray-300">
          </td>
          <td class="py-2 px-4 border-b border-gray-300">
          </td>
          <td class="py-2 px-4 border-b border-gray-300">
            <div class="relative">
              <button class="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                      d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
              </button>
              <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black
              ring-opacity-5 z-50">
                <div class="py-1">
                  <button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Modifier
                  </button>
                  <button class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Skeleton Loader -->
      <div v-if="isLoading" class="animate-pulse">
<!--        <div class="flex justify-between mb-4">-->
<!--          <div class="h-6 bg-gray-300 w-1/4 rounded"></div>-->
<!--          <div class="flex space-x-2">-->
<!--            <div class="h-10 w-10 bg-gray-300 rounded"></div>-->
<!--            <div class="h-10 w-10 bg-gray-300 rounded"></div>-->
<!--          </div>-->
<!--        </div>-->
        <table class="min-w-full">
          <thead>
          <tr>
            <th
                v-for="n in 6"
                :key="n"
                class="py-2 px-4 bg-gray-200 border-b"
            >
              <div class="h-4 bg-gray-300 w-3/4 rounded"></div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="n in 5" :key="n">
            <td v-for="m in 6" :key="m" class="py-2 px-4 border-b">
              <div class="h-4 bg-gray-200 w-full rounded"></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    </main>

  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import Header from "@public/components/header.vue";
import Dashboard from "@public/components/dashboard.vue";
import Footer from "@public/components/footer.vue";
import ContactForm from "@public/contact-form.vue";

const isLoading = ref(true)
const visible = ref(false)
 const addForm = () =>{
  console.log('form')
  visible.value = !visible.value
 }
</script>

<style scoped>

</style>

