<template>

      <div v-if="visible" class="bg-white shadow rounded-lg p-6 w-full my-5">
        <h2 class="text-xl font-semibold text-gray-700 pb-6">
          {{ guid ? 'Modifier le Contact' : 'Ajouter un Contact' }}
        </h2>

        <form @submit.prevent="registerOrUpdateContact">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div class="flex items-center">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="20"  viewBox="0 0 24 24"  fill="currentColor"
                    class="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
              </svg>
              <label for="lastname" class="text-gray-600 pr-5">Nom</label>
              <div class="flex flex-col pr-5">
                <label class="flex items-center">
                  <input v-model="gender" type="radio" value="m" class="mr-2" />
                  Mn
                </label>
                <label class="flex items-center">
                  <input v-model="gender" type="radio" value="f" class="mr-2" />
                  Mne
                </label>
              </div>
              <input
                  v-model="name"
                  type="text"
                  id="name"
                  placeholder="Doe"
                  class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-green-500"
              />
            </div>

            <!-- Mobile -->
            <div class="flex items-center">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"
                    stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-phone">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              </svg>
              <label for="mobile" class="pr-5 text-gray-600">Mobile</label>
              <div class="flex flex-wrap w-full px-3 justify-between items-center border border-gray-300 rounded-lg focus:outline-none focus:border-green-500">
                <select
                    v-model="country"
                    id="country"
                    class="flex rounded-lg p-2 min-w-28" required
                >
                  <option disabled value="">country code</option>
                  <option value="en">+237</option>
                  <option value="en">+234</option>
                  <option value="en">+229</option>
                  <option value="fr">+238</option>
                </select>
                <input
                    v-model="mobile"
                    type="tel"
                    id="mobile"
                    placeholder="06 12 34 56 78"
                    class="flex-1 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                    required
                />
              </div>
            </div>

            <!-- WhatsApp -->
            <div class="flex items-center">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"
                    stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
              </svg>
              <label for="whatsApp" class="text-gray-600 capitalize pr-7">is whatsApp?</label>
              <input
                  v-model="whatsApp"
                  type="checkbox"
                  id="qualified"
                  class="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
            </div>
          </div>

          <!-- Bouton-->
          <div class="flex justify-between pl-28 pt-10">
            <!-- Bouton d'envoi -->
            <button
                class="bg-red-600 hover:bg-red-800 text-white font-semibold rounded-lg p-2"
                @click="viewForm"
            >
              Annuler
            </button>
            <button
                class="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg p-2"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
</template>

<script setup>
import { ref } from 'vue'

const guid = ref<null>(null)
const name = ref('')
const mobile = ref(null)
const gender = ref('')
const country = ref('')
const date = new Date();

const whatsApp = ref(false)
const visible = ref(true)

const viewForm = ()=>{
  visible.value = false
}

async function registerOrUpdateContact() {
  try {
    console.log('mobile.value',mobile.value, 'name.value',name.value, 'gender.value',gender.value, 'country.value',country.value,'date', date.getDate() )
    name.value = '';
    mobile.value = '';
    gender.value = '';
    country.value = '';
    whatsApp.value = false;
  } catch(error) {
    console.error(error);
  }
}

</script>
<style scoped>
</style>

