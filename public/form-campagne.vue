<script setup>
import { ref } from 'vue'
import Header from "@public/components/header.vue"
import Footer from "@public/components/footer.vue"
import Dashboard from "@public/components/dashboard.vue"


const showModal = ref(false)
const currentStep = ref(0)
const steps = ['Informations', 'Message', 'Validation']

const campaignForm = ref({
  name: '',
  budget: '',
  messageTemplate: '',
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
  campaignForm.value = {
    name: '',
    budget: '',
    messageTemplate: '',
  }
}

const createCampaign = () => {
  // Add campaign creation logic here
  campaigns.value.push({
    id: campaigns.value.length + 1,
    isActive: true,
    name: campaignForm.value.name,
    date: new Date().toISOString(),
    status: 'Planifié',
    budget: Number(campaignForm.value.budget),
    spent: 0,
    stats: { sent: 0, delivered: 0, read: 0 }
  })
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
    // 'Terminé': 'bg-green-100 text-green-800',
    // 'Planifié': 'bg-blue-100 text-blue-800',
    'Erreur': 'bg-red-100 text-red-800'
  }
  return `px-2 py-1 rounded-full text-xs font-medium ${classes[status] || ''}`
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
      <div class="bg-white rounded-lg w-full max-w-4xl mx-4">
        <!-- Modal Header -->
        <div class="border-b px-6 py-4">
          <h2 class="text-xl font-semibold">Créer une nouvelle campagne</h2>
          <div class="flex justify-between items-center mt-4">
            <div class="flex space-x-4">
              <div v-for="(step, index) in steps" :key="index"
                   class="flex items-center">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  currentStep > index ? 'bg-gray-200 text-black' :
                  currentStep === index ? 'bg-green-500 text-white' : 'bg-gray-200'
                ]">
                  {{ index + 1 }}
                </div>
                <div class="ml-2 text-sm" :class="currentStep >= index ? 'text-gray-900' : 'text-gray-400'">
                  {{ step }}
                </div>
                <div v-if="index < steps.length - 1" class="w-10 h-0.5 mx-2"
                     :class="currentStep > index ? 'bg-green-500' : 'bg-gray-200'"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Step 1: Basic Info -->
          <div v-if="currentStep === 0" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Pays</label>
                <select
                    v-model="campaignForm.budget"
                    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" required>
                  <option value="CM">Cameroun (+237)</option>
                  <option value="GA">Gabon (+241)</option>
                  <option value="CG">Congo (+242)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom de la campagne</label>
                <input v-model="campaignForm.name" type="text"
                       class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" required>
              </div>
              <!--              <div>-->
              <!--                <label class="block text-sm font-medium text-gray-700">Budget</label>-->
              <!--                <input v-model="campaignForm.budget" type="number"-->
              <!--                       class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500">-->
              <!--              </div>-->
            </div>
          </div>

          <!-- Step 2: Message Template -->
          <div v-if="currentStep === 1" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Message</label>
              <textarea v-model="campaignForm.messageTemplate" rows="4"
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" required></textarea>
            </div>
          </div>

          <!-- Step 3: Review -->
          <div v-if="currentStep === 2" class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-medium mb-2">Résumé de la campagne</h3>
              <dl class="grid grid-cols-2 gap-4">
                <div>
                  <dt class="text-sm text-gray-500">Nom</dt>
                  <dd class="text-sm font-medium">{{ campaignForm.name }}</dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-500">Budget</dt>
                  <dd class="text-sm font-medium">{{ campaignForm.budget }}€</dd>
                </div>
                <div class="col-span-2">
                  <dt class="text-sm text-gray-500">Message</dt>
                  <dd class="text-sm font-medium">{{ campaignForm.messageTemplate }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-between mt-6">
            <button @click="currentStep > 0 ? currentStep-- : closeModal"
                    class="px-4 py-2 border rounded-md hover:bg-gray-50">
              {{ currentStep > 0 ? 'Précédent' : 'Annuler' }}
            </button>
            <button @click="currentStep < 2 ? currentStep++ : createCampaign"
                    class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              {{ currentStep < 2 ? 'Suivant' : 'Créer la campagne' }}
            </button>
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
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="campaign in campaigns" :key="campaign.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <input type="checkbox" :checked="campaign.isActive"
                         class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
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
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<!--<template>-->
<!--  <div class="flex flex-col min-h-screen bg-neutral-50">-->

<!--    <Header description="campagne" />-->
<!--    <Dashboard />-->

<!--    <div class="flex justify-between items-center my-6 w-full p-2">-->
<!--      <h1 class="font-bold text-2xl lg:pl-20 pl-5">Espace Campagne</h1>-->
<!--      <button-->
<!--          @click="showNewCampaignForm = true"-->
<!--          class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-700 mr-20 flex justify-center items-center w-full max-w-[120px]"-->
<!--      >-->
<!--        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"-->
<!--              stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"-->
<!--              class="icon icon-tabler icons-tabler-outline icon-tabler-plus">-->
<!--          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" />-->
<!--        </svg>-->
<!--        Créer-->
<!--      </button>-->
<!--    </div>-->

<!--    <div class="flex-1 flex flex-col">-->
<!--      <main class="flex-1 p-5 lg:p-10 lg:pt-2 lg:m-5 mb-10">-->

<!--        &lt;!&ndash; Formulaire de création de campagne &ndash;&gt;-->
<!--        <div class="flex flex-wrap justify-center items-center">-->
<!--          <div v-if="showNewCampaignForm" class="mb-8 border p-6 rounded-lg bg-white w-screen max-w-4xl">-->
<!--            <h1 class="text-xl font-semibold mb-4 capitalize">Créer une nouvelle campagne</h1>-->

<!--            <div class="space-y-4">-->
<!--              &lt;!&ndash; Informations de base &ndash;&gt;-->
<!--              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">-->
<!--                <div>-->
<!--                  <label class="block text-md font-medium text-gray-600">Nom de la campagne</label>-->
<!--                  <input-->
<!--                      v-model="newCampaign.name"-->
<!--                      type="text"-->
<!--                      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-2 focus:border-green-600 transition duration-300"-->
<!--                      placeholder="Ex: Promotion Janvier 2025"-->
<!--                  >-->
<!--                </div>-->
<!--                &lt;!&ndash; Variables du message &ndash;&gt;-->
<!--                <div>-->
<!--                  <h4 class="font-medium mb-2">Message</h4>-->
<!--                  <textarea-->
<!--                      v-model="newCampaign.messageTemplate"-->
<!--                      rows="4"-->
<!--                      class="w-full rounded-md border border-gray-400 focus:border-2 focus:outline-none  focus:border-green-600 transition duration-300 px-3 py-2 max-w-lg"-->
<!--                      placeholder="enter your message content"-->
<!--                  ></textarea>-->
<!--                </div>-->
<!--              </div>-->

<!--              &lt;!&ndash; Actions &ndash;&gt;-->
<!--              <div class="flex justify-end space-x-3 pt-4">-->
<!--                <button-->
<!--                    @click="showNewCampaignForm = false"-->
<!--                    class="px-4 py-2 border rounded-lg hover:bg-gray-50"-->
<!--                >-->
<!--                  Annuler-->
<!--                </button>-->
<!--                <button-->
<!--                    @click="createCampaign"-->
<!--                    class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"-->
<!--                >-->
<!--                  Créer la campagne-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Tableau des campagnes &ndash;&gt;-->
<!--        <div class="overflow-x-auto">-->
<!--          <table class="min-w-full border-black border">-->
<!--            <thead class="bg-white">-->
<!--            <tr>-->
<!--              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase bg-black">Nom</th>-->
<!--              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase border-x-4 border-white bg-black">Date</th>-->
<!--              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase border-x-4 border-white bg-black">Destinataires</th>-->
<!--              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase border-x-4 border-white bg-black">Diffusion</th>-->
<!--              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase bg-black">Stats</th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody>-->
<!--            <tr v-for="campaign in campaigns" :key="campaign.id" class="bg-white">-->
<!--              <td class="px-6 py-4 whitespace-nowrap border-r border-black">{{ campaign.name }}</td>-->
<!--              <td class="px-6 py-4 whitespace-nowrap border-r border-black">{{ formatDate(campaign.scheduledDate) }}</td>-->
<!--              <td class="px-6 py-4 whitespace-nowrap border-r border-black">{{ campaign.totalRecipients }}</td>-->
<!--              <td class="px-6 py-4 whitespace-nowrap border-r border-black">-->
<!--              <span :class="getStatusClass(campaign.status)">-->
<!--                {{ campaign.status }}-->
<!--              </span>-->
<!--              </td>-->
<!--              <td class="px-6 py-4 whitespace-nowrap">-->
<!--                <div class="flex space-x-4">-->
<!--                  <div class="text-sm">-->
<!--                    <div class="text-gray-500">Envoyés</div>-->
<!--                    <div class="font-medium">{{ campaign.stats.sent }}</div>-->
<!--                  </div>-->
<!--                  <div class="text-sm">-->
<!--                    <div class="text-gray-500">Livrés</div>-->
<!--                    <div class="font-medium">{{ campaign.stats.delivered }}</div>-->
<!--                  </div>-->
<!--                  <div class="text-sm">-->
<!--                    <div class="text-gray-500">Lus</div>-->
<!--                    <div class="font-medium">{{ campaign.stats.read }}</div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            </tbody>-->
<!--          </table>-->
<!--        </div>-->
<!--      </main>-->

<!--      &lt;!&ndash; Footer &ndash;&gt;-->
<!--      <div class="mt-5 w-full h-full">-->
<!--        <Footer class="flex-shrink-0"/>-->
<!--      </div>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from 'vue'-->
<!--import Header from "@public/components/header.vue";-->
<!--import Footer from "@public/components/footer.vue";-->
<!--import Dashboard from "@public/components/dashboard.vue";-->

<!--// État du formulaire et des données-->
<!--const showNewCampaignForm = ref(false)-->
<!--const recipients = ref([])-->
<!--const newCampaign = ref({name: '', scheduledDate: '', messageTemplate: '',})-->

<!--// Données simulées des campagnes-->
<!--const campaigns = ref([-->
<!--  {id: 1, name: 'Promo Janvier', scheduledDate: '2025-01-20T10:00:00', totalRecipients: 1500, status: 'En cours ...', stats: {sent: 1000, delivered: 950, read: 800}},-->
<!--  // Ajoutez d'autres campagnes...-->
<!--])-->
<!--// Création de la campagne-->
<!--const createCampaign = async () => {-->
<!--  try {-->
<!--    // Simulation d'appel API-->
<!--    console.log('Création de la campagne:', {...newCampaign.value, recipients: recipients.value})-->
<!--    // Réinitialisation du formulaire-->
<!--    newCampaign.value = {name: '', scheduledDate: '', messageTemplate: ''}-->
<!--    recipients.value = []-->
<!--    showNewCampaignForm.value = false-->
<!--  } catch (error) {console.error('Erreur lors de la création:', error)}-->
<!--}-->
<!--// Formatage de la date-->
<!--const formatDate = (date) => {-->
<!--  return new Date(date).toLocaleString('fr-FR', {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'-->
<!--  })-->
<!--}-->
<!--// Classes CSS pour les statuts-->
<!--const getStatusClass = (status) => {-->
<!--  const classes = {'En cours ...': 'text-orange-500', 'Terminé': 'text-green-600 bg-green-100', 'Planifié': 'text-blue-600 bg-blue-100', 'Erreur': 'text-red-600 bg-red-100'-->
<!--  }-->
<!--  return `px-2 py-1 rounded-full text-xs font-medium ${classes[status] || ''}`-->
<!--}-->
<!--</script>-->