<template>
  <header class="bg-white shadow p-5 flex justify-between items-center border-b-2 w-full flex-wrap">
  <div class="text-xl font-bold text-blue-600">
      <img :src="logo" alt="Logo" class="lg:w-32 lg:h-12 w-16 h-6">
    </div>
    <h1 class="lg:text-4xl font-light uppercase">Welcome</h1>
    <div class="text-sm text-gray-700 flex relative">
      <div class="flex items-center space-x-2">
        <img @click="toggleDropdown" :src="logo" alt="image" class="rounded-full border lg:h-12 lg:w-12 h-6 w-6 cursor-pointer">
        <h2 @click="toggleDropdown" class="cursor-pointer hover:text-blue-600 lg:text-xl text-xs">hello@imediatis.net</h2>
      </div>
      <!-- Menu déroulant -->
      <div v-if="isDropdownOpen" class="absolute right-0 mt-16 w-48 bg-white rounded-md shadow-lg border">
        <div class="py-1">
          <router-link to="/home" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Home
          </router-link>
          <router-link to="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Compte
          </router-link>
          <router-link to="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Campagne
          </router-link>
          <router-link to="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Prospect
          </router-link>
          <router-link to="/form-message" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Message
          </router-link>
          <router-link to="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Historique
          </router-link>
          <router-link to="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Support & Aide
          </router-link>
          <button @click="logout" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
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

const logo = ref(Logo)
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Fermer le menu si on clique en dehors
const closeDropdown = (e) => {
  if (!e.target.closest('.relative')) {
    isDropdownOpen.value = false
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

const logout = () => {
  // Ajoutez ici votre logique de déconnexion
  console.log('Déconnexion...')
}
</script>