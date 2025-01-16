<template>
  <div class="flex flex-col min-h-screen bg-neutral-50">

    <Header description="campagne" />
    <Dashboard />

    <div class="flex justify-between items-center my-6 w-full p-2">
      <h1 class="font-bold text-2xl lg:pl-20 pl-5">Espace Campagne</h1>
      <button
          @click="showNewCampaignForm = true"
          class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-700 mr-20 flex justify-center items-center w-full max-w-[120px]"
      >
        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"
              stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" />
        </svg>
        Créer
      </button>
    </div>

    <div class="flex-1 flex flex-col">
      <main class="flex-1 p-5 lg:p-10 lg:pt-2 lg:m-5 mb-10">

    <!-- Formulaire de création de campagne -->
        <div class="flex flex-wrap justify-center items-center">
    <div v-if="showNewCampaignForm" class="mb-8 border p-6 rounded-lg bg-white w-screen max-w-4xl">
      <h1 class="text-xl font-semibold mb-4 capitalize">Créer une nouvelle campagne</h1>

      <div class="space-y-4">
        <!-- Informations de base -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label class="block text-md font-medium text-gray-600">Nom de la campagne</label>
            <input
                v-model="newCampaign.name"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-2 focus:border-green-600 transition duration-300"
                placeholder="Ex: Promotion Janvier 2025"
            >
          </div>
<!--          <div>-->
<!--            <label class="block text-sm font-medium text-gray-700">Date d'envoi</label>-->
<!--            <input-->
<!--                v-model="newCampaign.scheduledDate"-->
<!--                type="datetime-local"-->
<!--                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"-->
<!--            >-->
<!--          </div>-->
          <!-- Variables du message -->
          <div>
            <h4 class="font-medium mb-2">Message</h4>
            <textarea
                            v-model="newCampaign.messageTemplate"
                            rows="4"
                            class="w-full rounded-md border border-gray-400 focus:border-2 focus:outline-none  focus:border-green-600 transition duration-300 px-3 py-2 max-w-lg"
                            placeholder="enter your message content"
            ></textarea>
          </div>
        </div>

        <!-- Import des destinataires -->
<!--        <div class="border-t pt-4">-->
<!--          <h4 class="font-medium mb-2">Import des destinataires</h4>-->
<!--          <div class="flex items-center space-x-4">-->
<!--            <label class="flex items-center px-4 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">-->
<!--              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                <path d="M12 4v16m8-8H4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--              </svg>-->
<!--              <span>Importer CSV</span>-->
<!--              <input-->
<!--                  type="file"-->
<!--                  accept=".csv"-->
<!--                  class="hidden"-->
<!--                  @change="handleFileUpload"-->
<!--              >-->
<!--            </label>-->
<!--            <span class="text-sm text-gray-500" v-if="recipients.length">-->
<!--              {{ recipients.length }} destinataires importés-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
              @click="showNewCampaignForm = false"
              class="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
              @click="createCampaign"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Créer la campagne
          </button>
        </div>
      </div>
    </div>
        </div>

    <!-- Tableau des campagnes -->
    <div class="overflow-x-auto">
      <table class="min-w-full border-black border">
        <thead class="bg-white">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase bg-black">Nom</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase border-x-4 border-white bg-black">Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase border-x-4 border-white bg-black">Destinataires</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase border-x-4 border-white bg-black">Statut</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase bg-black">Stats</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="campaign in campaigns" :key="campaign.id" class="bg-white">
          <td class="px-6 py-4 whitespace-nowrap border-r border-black">{{ campaign.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap border-r border-black">{{ formatDate(campaign.scheduledDate) }}</td>
          <td class="px-6 py-4 whitespace-nowrap border-r border-black">{{ campaign.totalRecipients }}</td>
          <td class="px-6 py-4 whitespace-nowrap border-r border-black">
              <span :class="getStatusClass(campaign.status)">
                {{ campaign.status }}
              </span>
          </td>
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
        </tr>
        </tbody>
      </table>
    </div>
      </main>

      <!-- Footer -->
      <div class="mt-5 w-full h-full">
        <Footer class="flex-shrink-0"/>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from "@public/components/header.vue";
import Footer from "@public/components/footer.vue";
import Dashboard from "@public/components/dashboard.vue";

// État du formulaire et des données
const showNewCampaignForm = ref(false)
const recipients = ref([])
const newCampaign = ref({
  name: '',
  scheduledDate: '',
  messageTemplate: '',
})

// Données simulées des campagnes
const campaigns = ref([
  {
    id: 1,
    name: 'Promo Janvier',
    scheduledDate: '2025-01-20T10:00:00',
    totalRecipients: 1500,
    status: 'En cours',
    stats: {
      sent: 1000,
      delivered: 950,
      read: 800
    }
  },
  // Ajoutez d'autres campagnes...
])

// Gestion de l'import CSV
// const handleFileUpload = (event) => {
//   const file = event.target.files[0]
//   if (file) {
//     // Ici, ajoutez la logique de parsing CSV
//     console.log('Fichier importé:', file.name)
//   }
// }

// Création de la campagne
const createCampaign = async () => {
  try {
    // Simulation d'appel API
    console.log('Création de la campagne:', {
      ...newCampaign.value,
      recipients: recipients.value
    })

    // Réinitialisation du formulaire
    newCampaign.value = {
      name: '',
      scheduledDate: '',
      messageTemplate: ''
    }
    recipients.value = []
    showNewCampaignForm.value = false

  } catch (error) {
    console.error('Erreur lors de la création:', error)
  }
}

// Formatage de la date
const formatDate = (date) => {
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Classes CSS pour les statuts
const getStatusClass = (status) => {
  const classes = {
    'En cours': 'text-yellow-600 bg-yellow-100',
    'Terminé': 'text-green-600 bg-green-100',
    'Planifié': 'text-blue-600 bg-blue-100',
    'Erreur': 'text-red-600 bg-red-100'
  }
  return `px-2 py-1 rounded-full text-xs font-medium ${classes[status] || ''}`
}
</script>