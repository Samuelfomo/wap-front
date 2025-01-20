<template>
  <header class="bg-gray-100 p-0 lg:py-0 lg:px-10 flex justify-between items-center border-b w-full flex-row">
    <div :class="[$route.name === 'home' ? activeClass : inactiveClass,'text-md font-bold justify-center items-center flex px-4 py-2 gap-1']">
      <router-link to="/home" class="flex items-center gap-1">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="currentColor"
              class="icon icon-tabler icons-tabler-filled icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176
         -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414
          0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
        </svg>
        <span class="font-medium">Accueil</span>
      </router-link>
    </div>
    <div :class="[$route.name === 'campagne' ? activeClass : inactiveClass,'text-md font-bold justify-center items-center flex px-4 py-2 gap-1']">
      <router-link to="/campagne" class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-coinbase"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12.95 22c-4.503 0 -8.445 -3.04 -9.61 -7.413c-1.165 -4.373 .737 -8.988 4.638 -11.25a9.906 9.906 0 0 1 12.008 1.598l-3.335 3.367a5.185 5.185 0 0 0 -7.354 .013a5.252 5.252 0 0 0 0 7.393a5.185 5.185 0 0 0 7.354 .013l3.349 3.367a9.887 9.887 0 0 1 -7.05 2.912z" />
        </svg>
        <span class="font-medium">Campagne</span>
      </router-link>
    </div>

    <div :class="[$route.name === 'message' ? activeClass : inactiveClass,'text-md font-bold justify-center items-center flex px-4 py-2 gap-1']">
<!--    <div class="text-md font-bold text-gray-950 justify-center items-center flex px-4 py-2 gap-1 hover:bg-gray-500 hover:text-white hover:border hover:border-green-300 ">-->
      <router-link to="#" class="flex items-center gap-1">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="currentColor"
              class="icon icon-tabler icons-tabler-filled icon-tabler-message-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-2.586l-2.707 2.707a1 1 0 0 1 -1.32 .083l-.094 -.083l-2.708 -2.707h-2.585a4
        4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 4 -4zm-4 9h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m2 -4h-8a1 1 0 1 0 0 2h8a1 1 0 0 0
        0 -2" />
        </svg>
        <span class="font-medium">Service</span>
      </router-link>
    </div>
    <div :class="[$route.name === 'prospect' ? activeClass : inactiveClass,'text-md font-bold justify-center items-center flex px-4 py-2 gap-1']">
      <router-link to="#" class="flex items-center gap-1">
<!--        <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"-->
<!--              stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"-->
<!--              class="icon icon-tabler icons-tabler-outline icon-tabler-users-group">-->
<!--          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />-->
<!--          <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />-->
<!--          <path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />-->
<!--          <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />-->
<!--        </svg>-->
        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"
              stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
        <span class="font-medium">Contacts</span>
      </router-link>
    </div>
    <div :class="[$route.name === 'compte' ? activeClass : inactiveClass,'text-md font-bold justify-center items-center flex px-4 py-2 gap-1']">
      <router-link to="compte" class="flex items-center gap-1">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"
              stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-history">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l0 4l2 2" />
          <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
        </svg>
        <span class="font-medium">Recharge</span>
      </router-link>
    </div>
<!--    <div :class="[$route.name === 'compte' ? activeClass : inactiveClass,'text-md font-bold justify-center items-center flex px-4 py-2 gap-1']">-->
<!--      <router-link to="/compte" class="flex items-center gap-1">-->
<!--        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"-->
<!--              stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" @click="router.push('/compte')"-->
<!--              class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>-->
<!--          <path d="M12 21h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4.5" /><path d="M16 3v4" /><path d="M8 3v4" />-->
<!--          <path d="M4 11h16" /><path d="M19 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M22 22a2 2 0 0 0 -2 -2h-2a2 2 0 0 0 -2 2" />-->
<!--        </svg>-->
<!--        <span class="font-medium">Compte</span>-->
<!--      </router-link>-->
<!--    </div>-->
<!--    <div :class="[$route.name === 'support' ? activeClass : inactiveClass,'text-md font-bold justify-center items-center flex px-4 py-2 gap-1']">-->
<!--      <router-link to="#" class="flex items-center gap-1">-->
<!--        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"-->
<!--              stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"-->
<!--              class="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-question"><path stroke="none" d="M0 0h24v24H0z"-->
<!--              fill="none"/><path d="M15 21h-9a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />-->
<!--          <path d="M9 18h5" /><path d="M19 22v.01" /><path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />-->
<!--        </svg>-->
<!--        <span class="font-medium">Support & Aide</span>-->
<!--      </router-link>-->
<!--    </div>-->
  </header>

</template>

<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";
const router = useRouter();
const activeClass = ref('bg-gray-500 text-white border border-green-300');
const inactiveClass = ref('text-gray-950 hover:bg-gray-500 hover:text-white hover:border-2 hover:border-green-300');
</script>