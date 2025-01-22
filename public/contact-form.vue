<template>

      <div v-if="visible" class="bg-white shadow rounded-lg p-8 w-full my-5">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">
          {{ guid ? 'Modifier le Contact' : 'Ajouter un Contact' }}
        </h2>

        <form @submit.prevent="registerOrUpdateContact">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div class="flex items-center">
              <i class="fas fa-user text-gray-400"></i>&nbsp;&nbsp;
              <label for="lastname" class="w-24 text-gray-600">Nom</label>
              <div class="flex flex-col">
                <label class="flex items-center">
                  <input v-model="gender" type="radio" value="m" class="mr-2" />
                  Mn
                </label>
                <label class="flex items-center">
                  <input v-model="gender" type="radio" value="f" class="mr-2" />
                  Mne
                </label>
              </div>
              &nbsp;&nbsp;
              <input
                  v-model="lastname"
                  type="text"
                  id="lastname"
                  placeholder="Doe"
                  class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <!-- Mobile -->
            <div class="flex items-center">
              <i class="fas fa-phone text-gray-400"></i>&nbsp;&nbsp;
              <label for="mobile" class="w-24 text-gray-600">Mobile</label>
              <input
                  v-model="mobile"
                  type="tel"
                  id="mobile"
                  placeholder="06 12 34 56 78"
                  class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <!-- Prénom -->
            <div class="flex items-center">
              <i class="fas fa-user text-gray-400"></i>&nbsp;&nbsp;
              <label for="firstname" class="w-24 text-gray-600">Prénom</label>
              <input
                  v-model="firstname"
                  type="text"
                  id="firstname"
                  placeholder="John"
                  class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <!-- Email -->
            <div class="flex items-center">
              <i class="fas fa-envelope text-gray-400"></i>&nbsp;&nbsp;
              <label for="email" class="w-24 text-gray-600">Email</label>
              <input
                  v-model="email"
                  type="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <!-- Langue -->
            <div class="flex items-center">
              <i class="fas fa-language text-gray-400"></i>&nbsp;&nbsp;
              <label for="language" class="w-24 text-gray-600">Langue</label>
              <select
                  v-model="language"
                  id="language"
                  class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
              >
                <option disabled value="">Sélectionnez</option>
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>

            <!-- Localisation -->
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt text-gray-400"></i>&nbsp;&nbsp;
              <label for="location" class="w-24 text-gray-600"
              >Localisation</label
              >
              <input
                  v-model="location"
                  type="text"
                  id="location"
                  placeholder="Paris"
                  class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <!-- Qualifié -->
            <div class="flex items-center">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label for="qualified" class="w-24 text-gray-600">Qualifié</label>
              <input
                  v-model="qualified"
                  type="checkbox"
                  id="qualified"
                  class="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
            </div>
          </div>
          <br /><br />

          <!-- Bouton-->
          <div class="col-span-2 text-right">
            <!-- Bouton d'envoi -->
            <button
                class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Enregistrer
            </button>
          </div>
        </form>
        <!-- Bouton annule -->
        <div class="col-span-2 text-right">
          <button
              class="px-4 py-2 bg-red-600 font-semibold text-white rounded hover:bg-red-800 float-left"
              style="margin-top: -42px"
              @click="viewForm"
          >
            Annuler
          </button>
        </div>
      </div>
</template>

<script setup>
import { ref } from 'vue'

const guid = ref<null>(null)
const firstname = ref('')
const lastname = ref('')
const mobile = ref(null)
const email = ref('')
const location = ref('')
const gender = ref('')
const language = ref('')

const qualified = ref(false)
const visible = ref(true)

const viewForm = ()=>{
  visible.value = false
}

async function registerOrUpdateContact() {
  try {

  } catch {
  }
}

</script>

<style scoped>
</style>
