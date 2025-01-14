<template>
  <div class="flex flex-col min-h-screen bg-neutral-50">

    <!-- Header -->
    <Header />
    <div class="flex-1 flex flex-col">
      <main class="flex-1 p-5 lg:p-10">
        <div class="max-w-2xl mx-auto bg-black rounded-t-lg p-5 shadow-black shadow-sm">
          <h2 class="text-xl font-roboto text-center text-white" >Envoyer un message</h2>
        </div>
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-b-lg shadow-black shadow-sm m-5 mt-0">
    <form @submit.prevent="sendMessage" class="space-y-6">

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Sélection du pays -->
        <div class="md:col-span-1">
          <label class="block text-md font-roboto text-gray-700">Pays</label>
          <select
              v-model="messageData.country"
              class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="CM">Cameroun (+237)</option>
            <option value="GA">Gabon (+241)</option>
            <option value="CG">Congo (+242)</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-md font-roboto text-gray-700">Numéro du destinataire</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
              +237
            </span>
            <input
                v-model="messageData.recipient"
                type="tel"
                class="block w-full rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="6XXXXXXXX"
                pattern="[6-9][0-9]{8}"
                required
            >
          </div>
          <p class="mt-1 text-sm font-light text-gray-500">Format: 6XXXXXXXX</p>
        </div>
      </div>

      <div>
        <label class="block text-md font-roboto text-gray-700">Message</label>
        <div class="mt-1">
          <textarea
              v-model="messageData.content"
              rows="4"
              class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
          ></textarea>
          <p class="mt-1 text-xs font-light text-gray-500">{{ messageData.content.length }}/1000 caractères</p>
        </div>
      </div>

      <div>
        <div class="flex items-center">
          <input
              v-model="isScheduled"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          >
          <label class="ml-2 text-md font-roboto text-gray-700">Programmer l'envoi</label>
        </div>

        <div v-if="isScheduled" class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
                v-model="messageData.scheduledDate"
                type="date"
                class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :min="minDate"
            >
          </div>
          <div>
            <input
                v-model="messageData.scheduledTime"
                type="time"
                class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <button
            type="button"
            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            @click="resetForm"
        >
          Annuler
        </button>
        <button
            type="submit"
            class="rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :disabled="isSending"
        >
          {{ isSending ? 'Envoi en cours...' : 'Envoyer' }}
        </button>
      </div>
    </form>
  </div>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from "@public/components/header.vue";
import Footer from "@public/components/footer.vue";

const messageData = ref({
  country: 'CM',
  recipient: '',
  content: '',
  scheduledDate: '',
  scheduledTime: ''
})

const isScheduled = ref(false)
const isSending = ref(false)

// Date minimum pour la programmation (aujourd'hui)
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Envoi du message
const sendMessage = async () => {
  try {
    isSending.value = true

    let payload = {
      country: messageData.value.country,
      recipient: messageData.value.recipient,
      content: messageData.value.content
    }

    // Ajout de la date programmée si nécessaire
    if (isScheduled.value) {
      const scheduledDateTime = `${messageData.value.scheduledDate} ${messageData.value.scheduledTime}`
      payload.scheduled = scheduledDateTime
    }

    // Simulation d'appel API (à remplacer par votre vraie API)
    // const response = await fetch('https://api.wame.cm/message/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(payload)
    // })

    // Simulation de délai
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Message envoyé:', payload)
    resetForm()

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
  } finally {
    isSending.value = false
  }
}

// Réinitialisation du formulaire
const resetForm = () => {
  messageData.value = {
    country: 'CM',
    recipient: '',
    content: '',
    scheduledDate: '',
    scheduledTime: ''
  }
  isScheduled.value = false
}
</script>