<template>
  <div class="min-h-screen bg-neutral-50">

    <!-- Header -->
    <Header />

    <!-- Contenu principal -->
    <main class="min-h-screen p-5 lg:p-10 lg:m-5 md:m-0 sm:m-0">
<!--      <div class="justify-end flex flex-row gap-4 pt-5 pb-5 pl-5">-->
      <div class="flex flex-wrap justify-between mx-auto gap-5 lg:gap-0">

        <Card title="992" description="messages envoyés">
          <template #icon>
            <svg class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"/>
              <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"/>
            </svg>
          </template>
        </Card>

        <Card title="15 XAF" description="Montant par Messages">
          <template #icon>
            <svg class="w-6 h-6 text-green-500 dark:text-white" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 84 84" fill="currentColor" aria-hidden="true">
              <path d="M61.25,55.669c0-7.974-5.207-13.201-15.448-15.57v-20.77c7.415,0.763,8.724,4.249,8.724,11.349
                      c0,0.365,0.168,0.709,0.457,0.934c0.288,0.224,0.66,0.301,1.017,0.212l3.887-0.992c0.542-0.139,0.914-0.639,0.888-1.198
                      c-0.442-9.722-3.152-15.699-14.972-16.656V0.787C45.802,0.352,45.45,0,45.014,0h-5.512c-0.435,0-0.787,0.353-0.787,0.787V13.02
                      c-10.034,1.006-15.131,6.522-15.131,16.468c0,7.891,5.097,13.095,15.131,15.497v20.891c-9.191-0.669-9.198-4.301-9.198-11.396
                      c0-0.354-0.159-0.689-0.434-0.914c-0.275-0.226-0.637-0.315-0.983-0.242l-3.888,0.793c-0.568,0.115-0.968,0.625-0.944,1.205
                      c0.38,9.512,1.74,15.983,15.447,16.887V83.73c0,0.436,0.352,0.787,0.787,0.787h5.512c0.436,0,0.788-0.353,0.788-0.787V72.136
                      C56.046,71.129,61.25,65.613,61.25,55.669z M54.921,55.669c0,5.983-2.928,9.241-9.119,10.089V46.806
                      C51.849,48.863,54.921,51.83,54.921,55.669z M38.715,38.242c-5.838-2.052-8.802-4.982-8.802-8.754
                      c0-5.973,2.825-9.229,8.802-10.084V38.242z"
              />
            </svg>
          </template>
        </Card>

        <Card title="1000 XAF" description="solde du compte">
          <template #icon>
            <svg class="w-6 h-6 text-green-500 dark:text-white" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 84 84" fill="currentColor" aria-hidden="true">
              <path d="M61.25,55.669c0-7.974-5.207-13.201-15.448-15.57v-20.77c7.415,0.763,8.724,4.249,8.724,11.349
                      c0,0.365,0.168,0.709,0.457,0.934c0.288,0.224,0.66,0.301,1.017,0.212l3.887-0.992c0.542-0.139,0.914-0.639,0.888-1.198
                      c-0.442-9.722-3.152-15.699-14.972-16.656V0.787C45.802,0.352,45.45,0,45.014,0h-5.512c-0.435,0-0.787,0.353-0.787,0.787V13.02
                      c-10.034,1.006-15.131,6.522-15.131,16.468c0,7.891,5.097,13.095,15.131,15.497v20.891c-9.191-0.669-9.198-4.301-9.198-11.396
                      c0-0.354-0.159-0.689-0.434-0.914c-0.275-0.226-0.637-0.315-0.983-0.242l-3.888,0.793c-0.568,0.115-0.968,0.625-0.944,1.205
                      c0.38,9.512,1.74,15.983,15.447,16.887V83.73c0,0.436,0.352,0.787,0.787,0.787h5.512c0.436,0,0.788-0.353,0.788-0.787V72.136
                      C56.046,71.129,61.25,65.613,61.25,55.669z M54.921,55.669c0,5.983-2.928,9.241-9.119,10.089V46.806
                      C51.849,48.863,54.921,51.83,54.921,55.669z M38.715,38.242c-5.838-2.052-8.802-4.982-8.802-8.754
                      c0-5.973,2.825-9.229,8.802-10.084V38.242z"
              />
            </svg>
          </template>
        </Card>

        <Card title="546" description="messages lus">
          <template #icon>
            <svg class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z"/>
            </svg>
          </template>
        </Card>

<!--        <Card title="546" description="Réponses">-->
<!--          <template #icon>-->
<!--            <svg class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">-->
<!--              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z"/>-->
<!--            </svg>-->
<!--          </template>-->
<!--        </Card>-->
      </div>
<!--      <div class="flex flex-wrap w-full h-screen max-h-60 bg-white mt-5 border rounded-lg">-->
<!--      </div>-->

      <div class="flex flex-wrap w-full h-screen py-5 justify-between gap-5 lg:gap-0">
        <div class="w-full max-w-3xl p-5">
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
        <div class="rounded-lg w-full max-w-sm border bg-white">
        </div>
      </div>

    </main>

    <!-- Footer -->
    <Footer class="mt-auto" />

  </div>

</template>

<script setup>

import { ref, onMounted } from 'vue'
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Card from "./components/card.vue";

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

</script>
