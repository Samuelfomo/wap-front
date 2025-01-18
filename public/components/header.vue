<template>
  <header class="bg-white p-5 lg:py-3 lg:px-10 flex justify-between items-center border-b-2 border-t-2 border-t-green-400 w-full flex-wrap" description="">
  <div class="text-xl font-bold text-blue-600">
    <img :src="logo" alt="Logo" class="lg:w-24 lg:h-8 w-16 h-6">
    </div>
    <h1 class="lg:text-md font-bold text-gray-500 uppercase">{{ description }}</h1>
    <div class="text-sm text-gray-700 flex relative">
      <div class="flex items-center space-x-2">
        <img @click="toggleDropdown" :src="avatar" alt="image" class="rounded-full border-2 border-green-500 lg:h-8 lg:w-8 h-6 w-6 cursor-pointer">
        <h2 @click="toggleDropdown" class="cursor-pointer hover:text-green-600 lg:text-lg text-xs">hello@imediatis.net</h2>
      </div>
      <!-- Menu déroulant -->
      <div v-if="isDropdownOpen" class="absolute right-0 mt-16 w-full bg-white rounded-md shadow-lg border">
        <div class="py-1">
          <router-link to="/home" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'home' ? activeClass : inactiveClass]"
          >
            Home
          </router-link>
          <router-link to="/compte" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'compte' ? activeClass : inactiveClass]"
          >
            Compte
          </router-link>
          <router-link to="/campagne" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'campagne' ? activeClass : inactiveClass]"
          >
            Campagne
          </router-link>
          <router-link to="#" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'prospect' ? activeClass : inactiveClass]"
          >
            Prospect
          </router-link>
          <router-link to="/form-message" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'message' ? activeClass : inactiveClass]"
          >
            Message
          </router-link>
          <router-link to="#" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'historique' ? activeClass : inactiveClass]"
          >
            Historique
          </router-link>
          <router-link to="#" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'support' ? activeClass : inactiveClass]"
          >
            Support & Aide
          </router-link>
          <button @click="logout" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-100">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </header>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import Logo from "@/assets/images/logo-wap.svg"
import Avatar from "@/assets/images/avatar.svg"

const logo = ref(Logo)
const avatar = ref(Avatar)
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const activeClass = ref(
    'bg-green-100',
)
const inactiveClass = ref(
    '',
)

// Fermer le menu si on clique en dehors
const closeDropdown = (e) => {
  if (!e.target.closest('.relative')) {
    isDropdownOpen.value = false
  }
}
defineProps({
  description: {
    type: String,
    required: true // or false depending on your needs
  }
});
// Ajouter l'écouteur d'événement lors du montage du composant
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

// Nettoyer l'écouteur d'événement lors de la destruction du composant
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

const logout = () => {
  // Ajoutez ici votre logique de déconnexion
  console.log('Déconnexion...')
}
</script>