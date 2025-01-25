<template>
  <header class="bg-white p-5 lg:py-3 lg:px-10 flex justify-between items-center border-b border-t-2 border-b-green-400 w-full flex-wrap" description="">
  <div class="text-xl font-bold text-blue-600">
    <img :src="logo" alt="Logo" class="lg:w-24 lg:h-8 w-16 h-6">
    </div>
    <h1 class="lg:text-md font-bold text-gray-500 uppercase">{{ description }}</h1>
    <div class="text-sm text-gray-700 flex relative">
      <div class="flex items-center space-x-2">
        <img @click="toggleDropdown" :src="avatar" alt="image" class="rounded-full border-2 border-green-500 lg:h-8 lg:w-8 h-6 w-6 cursor-pointer">
        <h2 @click="toggleDropdown" class="cursor-pointer hover:text-green-600 lg:text-lg text-xs">{{lastname}} {{firstname}}<select>
        </select></h2>
      </div>

      <!-- Menu déroulant -->
      <div v-if="isDropdownOpen" class="absolute right-0 mt-16 w-full bg-white rounded-md shadow-lg border">
        <div class="py-1">
          <router-link to="/home" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'home' ? activeClass : inactiveClass]"
          >
            Accueil
          </router-link>
          <router-link to="/campagne" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'campagne' ? activeClass : inactiveClass]"
          >
            Campagne
          </router-link>
          <router-link to="/service" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'service' ? activeClass : inactiveClass]"
          >
            Service
          </router-link>

          <router-link to="/contact" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'contact' ? activeClass : inactiveClass]"
          >
            Contacts
          </router-link>
          <router-link to="/compte" class="block px-4 py-2 text-gray-700 hover:bg-green-100"
                       :class="[$route.name === 'compte' ? activeClass : inactiveClass]"
          >
            Recharge
          </router-link>
          <button @click="handleLogout" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-100">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </header>

</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import Logo from "@/assets/images/logo-wap.svg";
import Avatar from "@/assets/images/avatar.svg";

import { useLoginStore } from '@/stores/loginStore';
import { storeToRefs } from 'pinia'
import {useRouter} from "vue-router";


const router = useRouter()
const store = useLoginStore()
const { mobile, guid, account_name, account_number, firstname, lastname, isLoggedIn } = storeToRefs(store)

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

const handleLogout = async () => {
  try {
    // Appel API pour la déconnexion
    console.log('Déconnexion');
    const success = await store.logout();
    if (success){
      await router.push('/');
    }
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};
</script>