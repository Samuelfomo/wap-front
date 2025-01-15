<template>
  <div class="flex flex-col min-h-screen bg-neutral-50">

    <!-- Header -->
    <Header />

    <!-- Contenu principal -->
    <div class="flex-1 flex flex-col">
      <main class="flex-1 p-5 lg:p-10 lg:pt-2 lg:m-5 mb-10">
  <!--      <div class="justify-end flex flex-row gap-4 pt-5 pb-5 pl-5">-->
          <h2 class="text-3xl font-medium text-black lg:px-20">Votre solde</h2>
          <div class="flex flex-wrap w-full justify-between items-center lg:px-20">
            <!-- Solde du compte -->
            <div class="w-full md:w-[32.33333%] pb-4">
              <div class="bg-white rounded-lg p-4 h-full border">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-700">Solde Disponible</h3>
                  <span class="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
                </div>
                <div class="text-2xl font-bold text-gray-900">{{ formatPrice(accountInfo.balance) }}</div>
                <div class="text-sm text-gray-500 mt-2">Dernière recharge: {{ formatDate(accountInfo.lastRecharge) }}</div>
              </div>
            </div>

            <!-- Tarification -->
            <div class="w-full md:w-[32.33333%] pb-4">
              <div class="bg-white rounded-lg p-4 h-full border">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-700">Tarification</h3>
                  <span class="text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
                </div>
                <div class="text-2xl font-bold text-gray-900">{{ formatPrice(accountInfo.pricing) }} / message</div>
                <div class="text-sm text-gray-500 mt-2">Messages restants: {{ Math.floor(accountInfo.balance / accountInfo.pricing) }}</div>
              </div>
            </div>

            <!-- depense -->
            <div class="w-full md:w-[32.33333%] pb-4">
              <div class="bg-white rounded-lg p-4 h-full border">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-700">Montant déboursé</h3>
                  <span class="text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </span>
                </div>
                <div class="text-2xl font-bold text-gray-900">{{ formatPrice(accountInfo.ceiling) }}</div>
                <div class="text-sm text-gray-500 mt-2">Utilisé depuis le:{{ formatDate(accountInfo.lastRecharge) }}</div>
              </div>
            </div>
          </div>

        <div class="flex flex-wrap justify-between items-center my-4 border lg:mx-20">
        </div>

        <h2 class="text-3xl font-medium text-black lg:px-20">Vos messages</h2>
        <div class="flex flex-wrap justify-between mx-auto pb-4 lg:px-20">
          <div class="w-full md:w-[24%] pb-4">
            <div class="bg-white rounded-lg p-4 h-full border">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-700">Messages envoyés</h3>
            <div class="text-purple-600 bg-cyan-100 rounded-full h-16 w-16 flex items-center justify-center">
  <!--            <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">-->
  <!--              <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"/>-->
  <!--              <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"/>-->
  <!--            </svg>-->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M3 8L10.89 13.94C11.2187 14.1942 11.6049 14.3292 12 14.3292C12.3951 14.3292 12.7813 14.1942 13.11 13.94L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                    stroke="#FE8317" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M21 5L12 14L3 5" stroke="#FE8317" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
              </div>
              <div class="text-2xl font-bold text-gray-900">{{ accountInfo.usedThisMonth }} Messages</div>
              <div class="text-sm text-gray-500 mt-2">Depuis le: {{ formatDate(accountInfo.lastRecharge) }}</div>
            </div>
          </div>
          <div class="w-full md:w-[24%] pb-4">
            <div class="bg-white rounded-lg p-4 h-full border">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-700">Messages livrés</h3>
            <div class="text-purple-600 bg-cyan-100 rounded-full h-16 w-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M1.5 12.5L7.5 18.5L15.5 6.5" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
              </div>
              <div class="text-2xl font-bold text-gray-900">{{ accountInfo.usedThisMonth }} Messages</div>
              <div class="text-sm text-gray-500 mt-2">Depuis le: {{ formatDate(accountInfo.lastRecharge) }}</div>
            </div>
          </div>
          <div class="w-full md:w-[24%] pb-4">
            <div class="bg-white rounded-lg p-4 h-full border">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-700">Messages lus</h3>
            <div class="text-purple-600 bg-cyan-100 rounded-full h-16 w-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M1.5 12.5L7.5 18.5L15.5 6.5" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M6.5 12.5L12.5 18.5L20.5 6.5" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
              </div>
              <div class="text-2xl font-bold text-gray-900">{{ accountInfo.usedThisMonth }} Messages</div>
              <div class="text-sm text-gray-500 mt-2">Depuis le: {{ formatDate(accountInfo.lastRecharge) }}</div>
            </div>
          </div>
          <div class="w-full md:w-[24%] pb-4">
            <div class="bg-white rounded-lg p-4 h-full border">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-700">Echec</h3>
            <div class="text-purple-600 bg-cyan-100 rounded-full h-16 w-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#F44336" stroke-width="2" fill="none"/>
                <path d="M8 8L16 16M16 8L8 16" stroke="#F44336" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
              </div>
              <div class="text-2xl font-bold text-gray-900">{{ accountInfo.usedThisMonth }} Messages</div>
              <div class="text-sm text-gray-500 mt-2">Depuis le: {{ formatDate(accountInfo.lastRecharge) }}</div>
            </div>
          </div>

  <!--        <Card title="1000 XAF" description="solde du compte">-->
  <!--          <template #icon>-->
  <!--            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
  <!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />-->
  <!--            </svg>-->
  <!--          </template>-->
  <!--        </Card>-->

  <!--        <Card title="546" description="messages lus">-->
  <!--          <template #icon>-->
  <!--            <svg class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">-->
  <!--              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z"/>-->
  <!--            </svg>-->
  <!--          </template>-->
  <!--        </Card>-->

        </div>
        <div class="flex flex-wrap w-full justify-between items-center mb-4 border">
        </div>

        <div class="flex flex-wrap w-full h-screen py-4 justify-between gap-4 lg:gap-0">
          <div class="rounded-lg w-full max-w-md border bg-white flex flex-col justify-between">
          <h2 class="text-xl sm:text-2xl font-bold capitalize text-center sm:text-left p-10">Poucentage des echanges</h2>
            <!-- Légende -->
            <div class="flex flex-wrap gap-4 justify-center sm:justify-start m-5">

              <!-- Envoyé -->
              <div class="flex flex-col items-end sm:text-base">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <span class="text-xl">56%</span>
                </div>
                <span class="text-xs text-gray-400 float-end">Envoyé</span>
              </div>
              <!-- Livré -->
              <div class="flex flex-col items-end sm:text-base">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span class="text-xl">50%</span>
                </div>
                <span class="text-xs text-gray-400 float-end">Livré</span>
              </div>
              <!-- Lu -->
              <div class="flex flex-col items-end sm:text-base">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span class="text-xl">45%</span>
                </div>
                <span class="text-xs text-gray-400 float-end">Lu</span>
              </div>
              <!-- Échec -->
              <div class="flex flex-col items-end sm:text-base">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span class="text-xl">6%</span>
                </div>
                <span class="text-xs text-gray-400 float-end">Échec</span>
              </div>
            </div>
          </div>

          <div class="w-full max-w-3xl p-5 lg:pb-5 pb-8 bg-white rounded-lg border">
  <!--        <div class="rounded-lg w-full max-w-3xl border bg-white p-5">-->
              <!-- En-tête -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 p-5 gap-4">
              <!-- Titre -->
              <h2 class="text-xl sm:text-2xl font-bold capitalize text-center sm:text-left">Statistiques des échanges</h2>

              <!-- Légende -->
              <div class="flex flex-wrap gap-4 justify-center sm:justify-start">
                <!-- Envoyé -->
                <div class="flex items-center gap-2 text-sm sm:text-base">
                  <div class="w-4 h-4 bg-blue-600 rounded"></div>
                  <span>Envoyé</span>
                </div>
                <!-- Reçu -->
                <div class="flex items-center gap-2 text-sm sm:text-base">
                  <div class="w-4 h-4 bg-sky-400 rounded"></div>
                  <span>Reçu</span>
                </div>
                <!-- Réponse -->
                <div class="flex items-center gap-2 text-sm sm:text-base">
                  <div class="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Réponse</span>
                </div>
              </div>
            </div>

            <!-- Graphique -->

            <div class="relative lg:h-[500px] sm:h-[400px] md:h-[300px]">
              <!-- Axe Y -->
              <div class="absolute left-0 h-full flex flex-col justify-between text-gray-600 border-r-2 border-gray-400">
                <span class="border-b-2 border-gray-400 lg:text-md sm:text-sm">200</span>
                <span class="border-b-2 border-gray-400 lg:text-md  sm:text-sm">150</span>
                <span class="border-b-2 border-gray-400 lg:text-md  sm:text-sm">100</span>
                <span class="border-b-2 border-gray-400 lg:text-md  sm:text-sm">50</span>
                <span class="sm:text-sm">0</span>
              </div>

              <!-- Barres -->
              <div class="ml-8 sm:ml-12 h-full flex items-end justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs">
                <div
                    v-for="data in Data"
                    :key="data.month"
                    class="relative flex-1 flex flex-col items-center border-b-2 border-gray-400"
                >
                  <!-- envoyés -->
                  <div
                      class="w-[30%] sm:w-[20%] bg-blue-600"
                      :style="{ height: calculateHeight(data.send) }"
                  ></div>
                  <!-- reçu -->
                  <div
                      class="w-[30%] sm:w-[20%] bg-sky-400 -mt-[1px]"
                      :style="{ height: calculateHeight(data.received) }"
                  ></div>
                  <!-- Réponse -->
                  <div
                      class="w-[30%] sm:w-[20%] bg-orange-500 -mt-[1px]"
                      :style="{ height: calculateHeight(data.response) }"
                  ></div>
                  <!-- Mois -->
                  <span class="absolute -bottom-6 text-gray-600 text-xs sm:text-sm">{{ data.month }}</span>
                </div>
              </div>
            </div>


          </div>

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

import { ref, onMounted } from 'vue'
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";

// Données pour le graphique
const Data = ref([
  { month: 'Jan', send: 110, received: 50, response: 40 },
  { month: 'Feb', send: 100, received: 35, response: 30 },
  { month: 'Mar', send: 95, received: 30, response: 20 },
  { month: 'Apr', send: 85, received: 30, response: 25 },
  { month: 'May', send: 80, received: 25, response: 20 },
  { month: 'Jun', send: 55, received: 25, response: 25 },
  { month: 'Jul', send: 40, received: 35, response: 30 },
  { month: 'Aug', send: 45, received: 35, response: 30 },
  { month: 'Sep', send: 90, received: 35, response: 25 },
  { month: 'Oct', send: 55, received: 40, response: 30 },
  { month: 'Nov', send: 95, received: 40, response: 35 },
  { month: 'Dec', send: 60, received: 20, response: 20 },
])

// Calculer la hauteur maximale pour l'échelle
const maxValue = ref(0)
onMounted(() => {
  maxValue.value = Math.max(...Data.value.map(data =>
      data.send + data.received + data.response
  ))
})

// Fonction pour calculer la hauteur des barres
const calculateHeight = (value) => {

  const result = `${(value / maxValue.value) * 400}px`
  console.log(result);
  return result;
}

const accountInfo = ref({
  balance: 1000.00,
  lastRecharge: new Date('2024-01-10'),
  pricing: 25.00,
  ceiling: 900,
  usedThisMonth: 245
})

// Formater le prix en FCFA
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0
  }).format(price)
}

// Formater la date
const formatDate = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>
