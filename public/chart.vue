<!-- contact.vue -->
<template>
  <div class="container mx-auto p-4">
    <!-- Filtres -->
    <div class="flex space-x-4 mb-4">
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
    </div>

    <!-- Tableau de contacts -->
    <table class="w-full border">
      <thead>
      <tr class="bg-gray-100">
        <th>Nom</th>
        <th>Mobile</th>
        <th>Pays</th>
        <th>Genre</th>
        <th>WhatsApp</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="contact in filteredContacts"
          :key="contact.id"
          class="hover:bg-gray-50"
      >
        <td>{{ contact.name }}</td>
        <td>{{ contact.mobile }}</td>
        <td>{{ contact.country }}</td>
        <td>{{ contact.gender === 'm' ? 'Mn' : 'Mne' }}</td>
        <td>{{ contact.hasWhatsApp ? 'Oui' : 'Non' }}</td>
        <td>
          <button @click="editContact(contact)" class="text-blue-500 hover:underline">
            Modifier
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Bouton Ajouter -->
    <button
        @click="showAddModal = true"
        class="mt-4 bg-green-500 text-white px-4 py-2 rounded"
    >
      Ajouter Contact
    </button>

    <!-- Modal d'ajout/modification -->
    <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl mb-4">
          {{ editingContact ? 'Modifier' : 'Ajouter' }} Contact
        </h2>

        <form @submit.prevent="saveContact">
          <div class="mb-4">
            <label>Nom Complet</label>
            <input
                v-model="currentContact.name"
                class="w-full border rounded p-2"
            />
          </div>

          <div class="mb-4">
            <label>Genre</label>
            <select
                v-model="currentContact.gender"
                class="w-full border rounded p-2"
            >
              <option value="m">Monsieur</option>
              <option value="f">Madame</option>
            </select>
          </div>

          <div class="mb-4">
            <label>Pays</label>
            <select
                v-model="currentContact.country"
                class="w-full border rounded p-2"
                required
            >
              <option value="+237">Cameroun (+237)</option>
              <option value="+234">Nigeria (+234)</option>
            </select>
          </div>

          <div class="mb-4">
            <label>Mobile</label>
            <input
                v-model="currentContact.mobile"
                type="tel"
                class="w-full border rounded p-2"
                required
            />
          </div>

          <div class="mb-4 flex items-center">
            <input
                type="checkbox"
                v-model="currentContact.hasWhatsApp"
                class="mr-2"
            >
            <label>Numéro WhatsApp</label>
          </div>

          <div class="flex justify-between">
            <button
                type="button"
                @click="showAddModal = false"
                class="bg-red-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button
                type="submit"
                class="bg-green-500 text-white px-4 py-2 rounded"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const contacts = ref([])
const showAddModal = ref(false)
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

<!--<template>-->

<!--&lt;!&ndash;  <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash; Line Chart &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="py-6" id="pie-chart"></div>&ndash;&gt;-->

<!--&lt;!&ndash;  </div>&ndash;&gt;-->



<!--&lt;!&ndash;  <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">&ndash;&gt;-->

<!--&lt;!&ndash;    <div id="column-chart"></div>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--  <div class="min-h-screen flex justify-center items-center bg-neutral-50">-->
<!--    <button disabled type="button" class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border-->
<!--    border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700-->
<!--    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">-->
<!--      <svg aria-hidden="true" role="status" class="inline w-32 h-32 me-3 text-gray-200 animate-spin dark:text-gray-600"-->
<!--           viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858-->
<!--        0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50-->
<!--        91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013-->
<!--        9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>-->
<!--        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167-->
<!--        20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541-->
<!--        46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717-->
<!--        44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735-->
<!--        17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781-->
<!--        93.9676 39.0409Z" fill="#3AEA52"/>-->
<!--      </svg>-->
<!--      Loading...-->
<!--    </button>-->
<!--  </div>-->



<!--</template>-->
<!--<script setup>-->
<!--import { ref, onMounted, onBeforeUnmount } from 'vue'-->

<!--const chart = ref(null)-->

<!--const options = {-->
<!--  colors: ["#44db1a"],-->
<!--  series: [-->
<!--    {-->
<!--      name: "Organic",-->
<!--      color: "#44db1a",-->
<!--      data: [-->
<!--        { x : "Mon", y: 231 },-->
<!--        { x : "Tue", y: 122 },-->
<!--        { x : "Wed", y: 63 },-->
<!--        { x : "Thu", y: 421 },-->
<!--        { x : "Fri", y: 122 },-->
<!--        { x : "Sat", y: 323 },-->
<!--        { x : "Sun", y: 111 },-->
<!--      ],-->
<!--    },-->
<!--  ],-->
<!--  chart: {-->
<!--    type: "bar",-->
<!--    height: "320px",-->
<!--    fontFamily: "Inter, sans-serif",-->
<!--    toolbar: {-->
<!--      show: false,-->
<!--    },-->
<!--  },-->
<!--  plotOptions: {-->
<!--    bar: {-->
<!--      horizontal: false,-->
<!--      columnWidth: "70%",-->
<!--      borderRadiusApplication: "end",-->
<!--      borderRadius: 8,-->
<!--    },-->
<!--  },-->
<!--  tooltip: {-->
<!--    shared: true,-->
<!--    intersect: false,-->
<!--    style: {-->
<!--      fontFamily: "Inter, sans-serif",-->
<!--    },-->
<!--  },-->
<!--  states: {-->
<!--    hover: {-->
<!--      filter: {-->
<!--        type: "darken",-->
<!--        value: 1,-->
<!--      },-->
<!--    },-->
<!--  },-->
<!--  stroke: {-->
<!--    show: true,-->
<!--    width: 0,-->
<!--    colors: ["transparent"],-->
<!--  },-->
<!--  grid: {-->
<!--    show: false,-->
<!--    strokeDashArray: 4,-->
<!--    padding: {-->
<!--      left: 2,-->
<!--      right: 2,-->
<!--      top: -14-->
<!--    },-->
<!--  },-->
<!--  dataLabels: {-->
<!--    enabled: false,-->
<!--  },-->
<!--  legend: {-->
<!--    show: false,-->
<!--  },-->
<!--  xaxis: {-->
<!--    floating: false,-->
<!--    labels: {-->
<!--      show: true,-->
<!--      style: {-->
<!--        fontFamily: "Inter, sans-serif",-->
<!--        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'-->
<!--      }-->
<!--    },-->
<!--    axisBorder: {-->
<!--      show: false,-->
<!--    },-->
<!--    axisTicks: {-->
<!--      show: false,-->
<!--    },-->
<!--  },-->
<!--  yaxis: {-->
<!--    show: false,-->
<!--  },-->
<!--  fill: {-->
<!--    opacity: 1,-->
<!--  },-->
<!--}-->

<!--onMounted(() => {-->
<!--  if(typeof ApexCharts !== 'undefined') {-->
<!--    chart.value = new ApexCharts(document.getElementById("column-chart"), options);-->
<!--    chart.value.render();-->
<!--  } else {-->
<!--  console.error("ApexCharts n'est pas chargé")-->
<!--}-->

<!--})-->

<!--onBeforeUnmount(() => {-->
<!--  if (chart.value) {-->
<!--    chart.value.destroy()-->
<!--  }-->
<!--})-->
<!--</script>-->