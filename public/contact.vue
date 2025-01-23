<template>

  <div class="bg-neutral-50 min-h-screen">

    <!-- Header -->
    <Header description="service" />
    <Dashboard />

    <main class="flex-1 p-5 lg:p-10">

    <h3 class="text-2xl font-semibold text-gray-800 mb-6">
      Gestion des Contacts
    </h3>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-6 flex-wrap">
        <h4 class="text-xl font-semibold text-gray-700">Liste des Contacts</h4>

        <div class="flex w-full max-w-xl justify-between flex-wrap relative">
            <select v-model="filters.country" class="border rounded p-2">
              <option value="" disabled>Tous les pays</option>
              <option value="+237">Cameroun (+237)</option>
              <option value="+234">Nigeria (+234)</option>
            </select>

            <select v-model="filters.gender" class="border rounded p-2">
              <option value="">Tous genres</option>
              <option value="m">Monsieur</option>
              <option value="f">Madame</option>
            </select>

            <label class="flex items-center">
              <input
                  type="checkbox"
                  v-model="filters.hasWhatsApp"
                  class="mr-2"
              >
              WhatsApp
            </label>

          <div
              @mouseover="isDropdownOpen = true"
              @mouseleave="isDropdownOpen = false"
              class="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <div
              v-if="isDropdownOpen"
              class="absolute top-full right-0 mt-1 w-full max-w-[150px] bg-white rounded-md shadow-lg border z-10"
          >
            <div class="py-1">
              <div @click="showAddModal = true" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
              >
                Ajouter
              </div>
              <div class="block px-4 py-2 text-gray-700 hover:bg-green-100"
              >
                Importer
              </div>
            </div>
          </div>
          </div>

        </div>
      </div>

      <table id="contact-table" class="min-w-full bg-white rounded table-class">
        <thead>
        <tr class="bg-gray-950">
          <th class="py-2 px-4 border-2 border-white text-left text-sm font-semibold text-white">
            Nom
          </th>
          <th class="px-4 border-2 border-white text-left text-sm font-semibold text-white">
            Mobile
          </th>
          <th class="px-4 border-2 border-white text-left text-sm font-semibold text-white">
            Date
          </th>
          <th class="px-4 border-2 border-white text-left text-sm font-semibold text-white">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="contact in filteredContacts"
            :key="contact.id"
            class="hover:bg-gray-50 text-right">
          <td class="py-2 px-4 border-b border-gray-300">
              <span v-if="contact.hasWhatsApp" class="inline-block font-semibold w-2.5 h-2.5 rounded-full bg-black mr-2 absolute">
              </span>
            {{ contact.gender === 'm' ? 'Mn' : contact.gender === 'f' ? 'Mne' : '' }} {{ contact.name }}
          </td>
          <td class="py-2 px-4 border-b border-gray-300">
            {{ contact.mobile }}
          </td>
          <td class="py-2 px-4 border-b border-gray-300">
            {{formatDate(contact.createdAt) }}
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
                  <button @click="editContact(contact)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
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
        <tr
            v-for="contact in filteredContacts"
            :key="contact.id"
            class="hover:bg-gray-50 hidden"
        >
          <td>{{ contact.hasWhatsApp ? 'Oui' : 'Non' }}{{ contact.gender === 'm' ? 'Mn' : contact.gender === 'f' ? 'Mne' : '' }} {{ contact.name }}</td>
          <td>{{ contact.mobile }}</td>
          <td>{{formatDate(contact.createdAt) }}</td>
          <td>
            <button @click="editContact(contact)" class="text-blue-500 hover:underline">
              Modifier
            </button>
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
                v-for="n in 4"
                :key="n"
                class="py-2 px-4 bg-gray-200 border-b"
            >
              <div class="h-4 bg-gray-300 w-3/4 rounded"></div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="n in 5" :key="n">
            <td v-for="m in 4" :key="m" class="py-2 px-4 border-b">
              <div class="h-4 bg-gray-200 w-full rounded"></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
      <!-- Modal d'ajout/modification -->
      <div
          v-if="showAddModal"
          class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-xl mb-4">
            {{ editingContact ? 'Modifier' : 'Ajouter' }} Contact
          </h2>

          <form @submit.prevent="saveContact">
            <div class="mb-4">
              <label>Nom Complet</label>
              <input v-model="currentContact.name" class="w-full border rounded p-2"/>
            </div>

            <div class="mb-4">
              <label>Genre</label>
              <select v-model="currentContact.gender" class="w-full border rounded p-2">
                <option value="m">Monsieur</option>
                <option value="f">Madame</option>
              </select>
            </div>

            <div class="mb-4">
              <label>Pays</label>
              <select v-model="currentContact.country" class="w-full border rounded p-2" required>
                <option value="+237">Cameroun (+237)</option>
                <option value="+234">Nigeria (+234)</option>
              </select>
            </div>

            <div class="mb-4">
              <label>Mobile</label>
              <input v-model="currentContact.mobile" type="tel" class="w-full border rounded p-2" required/>
            </div>

            <div class="mb-4 flex items-center">
              <input type="checkbox" v-model="currentContact.hasWhatsApp" class="mr-2">
              <label>Numéro WhatsApp</label>
            </div>

            <div class="flex justify-between">
              <button type="button" @click="showAddModal = false" class="bg-red-500 text-white px-4 py-2 rounded">
                Annuler
              </button>
              <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
  <Footer />

</template>

<script setup>
import { ref, computed } from 'vue'
import Header from "@public/components/header.vue";
import Dashboard from "@public/components/dashboard.vue";
import Footer from "@public/components/footer.vue";


const isLoading = ref(true)

const contacts = ref([])
const showAddModal = ref(false)
const isDropdownOpen = ref(false)
const closeDropdownWithDelay = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  isDropdownOpen.value = false;
}

const editingContact = ref(null)

const filters = ref({
  country: '',
  gender: '',
  hasWhatsApp: null
})

const currentContact = ref({
  id: null,
  name: '',
  gender: '',
  country: '',
  mobile: '',
  hasWhatsApp: false,
  createdAt: null
})

const filteredContacts = computed(() => {
  return contacts.value.filter(contact => {
    const countryMatch = !filters.value.country || contact.country === filters.value.country
    const genderMatch = !filters.value.gender || contact.gender === filters.value.gender
    const whatsAppMatch = filters.value.hasWhatsApp === null || contact.hasWhatsApp === filters.value.hasWhatsApp

    return countryMatch && genderMatch && whatsAppMatch
  })
})

function saveContact() {
  if (editingContact.value) {
    // Modification
    const index = contacts.value.findIndex(c => c.id === editingContact.value.id)
    contacts.value[index] = { ...currentContact.value }
  } else {
    // Ajout

    currentContact.value.id = Date.now()
    currentContact.value.createdAt = new Date()
    contacts.value.push({ ...currentContact.value })
    console.log('data sender is :',{ ...currentContact.value });
  }

  showAddModal.value = false
  resetCurrentContact()
}
const formatDate = (date) => {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function editContact(contact) {
  currentContact.value = { ...contact }
  editingContact.value = contact
  showAddModal.value = true
}

function resetCurrentContact() {
  currentContact.value = {
    id: null,
    name: '',
    gender: '',
    country: '',
    mobile: '',
    hasWhatsApp: false,
    createdAt: null
  }
  editingContact.value = null
}
</script>

<style scoped>

</style>

