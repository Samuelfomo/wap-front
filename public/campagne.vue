<script setup>
import { ref } from 'vue'
import Header from "@public/components/header.vue"
import Footer from "@public/components/footer.vue"
import Dashboard from "@public/components/dashboard.vue"


const showModal = ref(false)
const currentStep = ref(0)
const activeMenu = ref(false)
const showVariableModal = ref(false)

const viewVariableModal = () =>{
  showVariableModal.value = !showVariableModal.value
}

const availableVariables = ref([
  { name: 'nom', placeholder: '{{nom}}' },
  { name: 'prénom', placeholder: '{{prénom}}' },
  { name: 'téléphone', placeholder: '{{téléphone}}' },
  // Ajoutez d'autres variables selon vos besoins
])

const insertVariable = (variable) => {
  const textarea = document.getElementById('messageTemplate')
  const cursorPos = textarea.selectionStart
  const textBefore = campaignForm.value.messageTemplate.substring(0, cursorPos)
  const textAfter = campaignForm.value.messageTemplate.substring(cursorPos)

  campaignForm.value.messageTemplate = `${textBefore}${variable.placeholder}${textAfter}`
  showVariableModal.value = false
}

const campaignForm = ref({
  name: '',
  messageTemplate: '',
  scheduledDate: new Date().toISOString().slice(0, 16), // Format YYYY-MM-DDTHH:mm
  variables: [],
  selectedVariable: null
})

const campaigns = ref([
  {
    id: 1,
    isActive: true,
    name: 'Promo Janvier',
    date: '2025-01-20T10:00:00',
    status: 'En cours',
    budget: 5000,
    spent: 2500,
    stats: { sent: 1000, delivered: 950, read: 800 }
  },
  // Add more sample data as needed
])

const openModal = () => {
  showModal.value = true
  currentStep.value = 0
}

const closeModal = () => {
  showModal.value = false
  // Réinitialiser le formulaire
  campaignForm.value = {
    name: '',
    messageTemplate: '',
    variables: [],
    selectedVariable: null
  }
  // Fermer aussi le modal des variables si ouvert
  showVariableModal.value = false
}

const createCampaign = () => {
  // Validation des champs
  if (!campaignForm.value.name || !campaignForm.value.messageTemplate) {
    alert('Veuillez remplir tous les champs obligatoires')
    return
  }

  // Ajout de la campagne
  campaigns.value.push({
    id: campaigns.value.length + 1,
    isActive: true,
    name: campaignForm.value.name,
    date: new Date().toISOString(),
    status: 'Planifié',
    budget: 0,
    spent: 0,
    stats: { sent: 0, delivered: 0, read: 0 }
  })

  console.log( 'campaigns.value', campaigns.value);

  closeModal()
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const classes = {
    'En cours': 'bg-yellow-100 text-yellow-800',
    'Terminé': 'bg-green-100 text-green-800',
    'Planifié': 'bg-blue-100 text-blue-800',
    'Erreur': 'bg-red-100 text-red-800'
  }
  return `px-2 py-1 rounded-full text-xs font-medium ${classes[status] || ''}`
}

const todoMenu = () =>{
  // console.log(activeMenu.value, !activeMenu.value)
  activeMenu.value = !activeMenu.value;
}
</script>
<template>
  <div class="flex flex-col min-h-screen bg-neutral-50">
    <Header description="campagne" />
    <Dashboard />

    <!-- Header Section -->
    <div class="flex justify-between items-center my-6 w-full p-2">
      <h1 class="font-bold text-2xl lg:pl-20 pl-5">Espace Campagne</h1>
      <button
          @click="openModal"
          class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-700 mr-20 flex justify-center items-center w-full max-w-[120px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" />
        </svg>
        Créer
      </button>
    </div>

    <!-- Multi-step Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="flex justify-between rounded-lg w-full max-w-6xl bg-white h-[75vh]">
            <div class="p-6 w-full border-r">
              <div class="border-b px-6 py-4">
                <h1 class="text-xl font-semibold">Créer une nouvelle campagne</h1>
                <div class="flex justify-between items-center mt-4">
                  <div class="flex space-x-4">
                    <div class="flex items-center">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white">
                        1
                      </div>
                      <div class="ml-2 text-sm text-gray-900">
                        informations
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4 p-6">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Intitulé de la campagne*</label>
                    <input v-model="campaignForm.name" type="text"
                           class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                           required>
                  </div>
                </div>

                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700">Message*</label>
<!--                  <div class="flex gap-2 mb-2">-->
<!--                    <button @click="showVariableModal = true"-->
<!--                            type="button"-->
<!--                            class="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">-->
<!--                      Ajouter une variable-->
<!--                    </button>-->
<!--                  </div>-->
                  <textarea id="messageTemplate"
                            v-model="campaignForm.messageTemplate"
                            rows="4"
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                            required></textarea>
                  <div class="flex gap-2 mt-1">
                    <button @click="viewVariableModal"
                            type="button"
                            class="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600">
                      Ajouter une variable
                    </button>
                  </div>
                  <!-- Modal pour les variables -->
                  <div v-if="showVariableModal"
                       class="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div class="p-2">
                      <div v-for="variable in availableVariables"
                           :key="variable.name"
                           @click="insertVariable(variable)"
                           class="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
                        {{ variable.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-6">
                <button @click="closeModal"
                        class="px-4 py-2 border rounded-md hover:bg-gray-50">
                  Annuler
                </button>
                <button @click="createCampaign"
                        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Soumettre
                </button>
              </div>
            </div>
            <div class="py-6 px-2 w-full max-w-md border-l h-full">
              <div class="border-b px-6 py-4">
                <h1 class="text-xl font-semibold">Résumé de la campagne</h1>
                <div class="flex justify-between items-center mt-4">
                  <div class="flex space-x-4">
                    <div class="flex items-center">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white">
                        2
                      </div>
                      <div class="ml-2 text-sm text-gray-900">
                        Resume
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg h-[52vh]">
            <dl class="grid grid-cols-2 gap-4">
                  <div>
                    <dt class="text-sm text-gray-500">Intitulé</dt>
                    <dd class="text-sm font-medium">{{ campaignForm.name }}</dd>
                  </div>
                  <div class="col-span-2">
                    <dt class="text-sm text-gray-500">Message</dt>
                    <dd class="text-sm font-medium">{{ campaignForm.messageTemplate }}</dd>
                  </div>
                </dl>
              </div>
            </div>
      </div>

    </div>

    <!-- DataTable -->
    <div class="min-h-screen flex-1 p-5 lg:p-10 lg:pt-2 lg:m-5 mb-10">
      <div class="bg-white rounded-lg shadow">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-950">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Actif</th>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Campagne</th>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Date</th>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Diffusion</th>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Budget</th>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Dépensé</th>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Stats</th>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider text-white">Action</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="campaign in campaigns" :key="campaign.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <input type="checkbox" :checked="campaign.isActive"
                         class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ campaign.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(campaign.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(campaign.status)">
                    {{ campaign.status }}
                  </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ campaign.budget }} XAF</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ campaign.spent }} XAF</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-4">
                  <div class="text-sm">
                    <div class="text-gray-500">Envoyés</div>
                    <div class="font-medium">{{ campaign.stats.sent }}</div>
                  </div>
                  <div class="text-sm">
                    <div class="text-gray-500">Livrés</div>
                    <div class="font-medium">{{ campaign.stats.delivered }}</div>
                  </div>
                  <div class="text-sm">
                    <div class="text-gray-500">Lus</div>
                    <div class="font-medium">{{ campaign.stats.read }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-4">
                  <div class="text-sm">
                    <div class="font-medium">{{ campaign.stats.sent }}</div>
                  </div>
                </div>
              </td>
              <td class="py-2 px-4 whitespace-nowrap border-b border-gray-300">
                <div class="relative">
                  <button
                      @click=" todoMenu"
                      class="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                      <path
                          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg>
                  </button>
                  <div
                      v-if="activeMenu"
                      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div class="py-1">
                      <button
                          @click=""
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left capitalize"
                      >
                        importer des contacts
                      </button>
                      <button
                          @click=""
                          class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left capitalize"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
  </div>

</template>