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
        <!-- Pagination entries per page selector -->
        <div class="flex items-center space-x-2">
          <span>Entrées par page:</span>
          <select
              v-model="entriesPerPage"
              class="border rounded p-2"
              @change="resetPagination"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
        <div class="flex w-full max-w-xl justify-between flex-wrap relative">
            <select v-model="filters.country" class="border rounded p-2">
              <option value="">Tous les pays</option>
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
              @click="closeDropdownWithDelay"
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
                   @click="triggerFileUpload"
              >
                Importer
                <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileUpload"
                    accept=".xlsx, .xls"
                    class="hidden"
                />

              </div>
            </div>
          </div>
          </div>

        </div>

      </div>
      <!--      message alert-->
      <div
          v-if="importStatus"
          :class="{
      'bg-green-100 text-green-800': importStatus.type === 'success',
      'bg-red-100 text-red-800': importStatus.type === 'error'
    }"
          class="p-4 rounded mb-4"
      >
        {{ importStatus.message }}
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
            v-for="contact in paginatedContacts"
            :key="contact.id"
            class="hover:bg-gray-50 text-right border-b border-gray-300">
          <td class="py-2 px-4 float-start">
              <span v-if="contact.hasWhatsApp" class="inline-block font-semibold w-2.5 h-2.5 rounded-full bg-black mr-2 absolute">
              </span>
            {{ contact.gender === 'm' ? 'Mn' : contact.gender === 'f' ? 'Mne' : '' }} {{ contact.name }}
          </td>
          <td class="py-2 px-4">
            {{ contact.mobile }}
          </td>
          <td class="py-2 px-4">
            {{formatDate(contact.createdAt) || formatDate(contact.importedAt)}}
          </td>
          <td class="py-2 px-4">
            <div class="relative">
              <button class="p-1 hover:bg-gray-100" @click="Opendoogle(contact.mobile)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                      d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
              </button>
              <div v-if="doogleview === contact.mobile" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black
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

      <!-- Pagination Controls -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-700">
          Page {{ currentPage }} sur {{ totalPages }}
          (Total: {{ filteredContacts.length }} contacts)
        </div>
        <div class="flex space-x-2">
          <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 border rounded bg-white hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border rounded bg-white hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
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

      <!--download error-->
      <div
          v-if="showErrorDownloadModal"
          class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-xl font-semibold mb-4 flex justify-center">Erreurs d'importation détectées</h2>
          <p class="mb-6 text-center font-roboto">
            {{ validationErrors.length }} contacts n'ont pas été importés.
            Voulez-vous télécharger un fichier avec les détails des erreurs ?
          </p>
          <div class="flex justify-between">
            <button
                @click="cancelErrorDownload"
                class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
                @click="downloadErrorFile"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Télécharger
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
  <Footer />

</template>

<script setup>
import {ref, computed, watch, onMounted, onUnmounted} from 'vue'
import Header from "@public/components/header.vue";
import Dashboard from "@public/components/dashboard.vue";
import Footer from "@public/components/footer.vue";
import * as XLSX from 'xlsx'

const isLoading = ref(true)

const fileInput = ref(null)
const contacts = ref([])
const importStatus = ref(null)
const doogleview = ref();
const showErrorDownloadModal = ref(false)
const validationErrors = ref([])


const showAddModal = ref(false)
const isDropdownOpen = ref(false)
const closeDropdownWithDelay = async () => {
  // await new Promise(resolve => setTimeout(resolve, 1000));
  isDropdownOpen.value = !isDropdownOpen.value;
}

const triggerFileUpload = () => {
  fileInput.value.click()
}

const validateContact = (contact) => {
  const errors = []

  console.log(contact.mobile, contact.name, contact.country, contact.importedAt);

  // Validation du mobile (exemple pour un format international)
  const mobileRegex = /^(\+237|237)?6(2[0]\d{6}|[5-9]\d{7})$/;
  if (!mobileRegex.test(contact.mobile)) {
    errors.push('Numéro de mobile invalide', contact.mobile)
  }

  // Validation du nom (au moins 2 caractères)
  if (!contact.name || contact.name.trim().length < 2) {
    errors.push('Nom invalide', contact.name)
  }

  // Validation du pays
  const validCountries = ['+237', '+238']
  if (!validCountries.includes(contact.country)) {
    errors.push('Pays invalide', contact.country)
  }

  return errors
}

function Opendoogle (contact ) {
  doogleview.value = doogleview.value === contact ? null : contact
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
    isLoading.value= false
    currentContact.value.id = Date.now()
    currentContact.value.createdAt = new Date()
    contacts.value.push({ ...currentContact.value })
    console.log('data sender is :',{ ...currentContact.value });
  }

  showAddModal.value = false
  resetCurrentContact()
}

const formatDate = (date) => {
  if (!date) return ''
  const dateObj = date instanceof Date ? date : new Date(date)
  return dateObj.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function editContact(contact) {
  currentContact.value = { ...contact }
  editingContact.value = contact
  console.log(contact);
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

// Pagination-related refs
const entriesPerPage = ref(10)
const currentPage = ref(1)

// Computed property for paginated contacts
const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * entriesPerPage.value
  const end = start + entriesPerPage.value
  return filteredContacts.value.slice(start, end)
})

// Compute total pages based on filtered contacts
const totalPages = computed(() => {
  return Math.ceil(filteredContacts.value.length / entriesPerPage.value)
})

// Pagination methods
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Reset pagination when filters or entries per page change
function resetPagination() {
  currentPage.value = 1
}

// Watch for changes in filtered contacts to reset pagination
watch(filteredContacts, () => {
  resetPagination()
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ]
  if (!validTypes.includes(file.type)) {
    importStatus.value = {
      type: 'error',
      message: 'Format de fichier non supporté. Utilisez Excel (.xlsx, .xls)'
    }
    setTimeout(() => {
      importStatus.value = null
    }, 4000);
    return
  }

  const reader = new FileReader()

  reader.onload = async (e) => {
    try {
      const workbook = XLSX.read(e.target.result, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      const headers = data[0]

      const processedContacts = []
      validationErrors.value = [] // Reset validation errors

      data.slice(1).forEach((row, index) => {
        const contact = {
          id: Date.now() + index,
          mobile: row[headers.indexOf('Mobile')] || row[headers.indexOf('Téléphone')] || row[headers.indexOf('Phone')],
          name: row[headers.indexOf('Nom')] || row[headers.indexOf('Nom Complet')] || row[headers.indexOf('Name')],
          country: row[headers.indexOf('Pays')] || row[headers.indexOf('Country')],
          importedAt: new Date()
        }

        const contactErrors = validateContact(contact)

        if (contactErrors.length === 0) {
          processedContacts.push(contact)
        } else {
          validationErrors.value.push({
            rowData: row,
            row: index + 2,
            errors: contactErrors
          })
        }
      })

      contacts.value.push(...processedContacts)
      isLoading.value = false

      if (validationErrors.value.length > 0) {
        importStatus.value = {
          type: 'error',
          message: `${validationErrors.value.length} contacts n'ont pas été importés. Un fichier d'erreurs a été généré.`
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        showErrorDownloadModal.value = true
        setTimeout(() => {
          importStatus.value = null
        }, 4000);

      } else {
        importStatus.value = {
          type: 'success',
          message: `${processedContacts.length} contacts importés avec succès`
        }
        setTimeout(() => {
          importStatus.value = null
        }, 4000);
      }
    } catch (error) {
      importStatus.value = {
        type: 'error',
        message: 'Erreur lors de la lecture du fichier'
      }
      console.error(error)
    }
  }

  reader.readAsBinaryString(file)
}

const downloadErrorFile = () => {
  // Create headers based on the validation errors data
  const headers = validationErrors.value.length > 0
      ? Object.keys(validationErrors.value[0].rowData)
      : []

  exportValidationErrorsToExcel(headers, validationErrors.value)
  showErrorDownloadModal.value = false
  validationErrors.value = []
}

const cancelErrorDownload = () => {
  showErrorDownloadModal.value = false
  validationErrors.value = []
}

// Nouvelle fonction pour exporter les erreurs de validation
function exportValidationErrorsToExcel(headers, validationErrors) {
  // Ajouter une colonne pour les erreurs
  const extendedHeaders = [...headers, 'Erreurs']

  // Préparer les données avec les erreurs
  const errorData = validationErrors.map(error => [
    ...error.rowData,
    error.errors.join('; ')
  ])

  // Créer une feuille de calcul
  const worksheet = XLSX.utils.aoa_to_sheet([extendedHeaders, ...errorData])

  // Créer un nouveau classeur
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Erreurs de Validation')

  // Générer et télécharger le fichier
  XLSX.writeFile(workbook, 'contacts_erreurs.xlsx')
}

// Fermer le menu si on clique en dehors
const closeDropdown = (e) => {
  if (!e.target.closest('.relative')) {
    isDropdownOpen.value = false
    doogleview.value = false
  }
}

// Ajouter l'écouteur d'événement lors du montage du composant
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

// Nettoyer l'écouteur d'événement lors de la destruction du composant
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>

</style>

