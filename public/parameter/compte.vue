<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

import Footer from "@public/components/footer.vue";
import Header from "@public/components/header.vue";
import Avatar from "@/assets/images/avatar.svg";
import Lock from "@/assets/images/lock.svg";
import Logout from "@/assets/images/logout.svg";

const router = useRouter();

const avatar = Avatar;
const lock = Lock;
const logout = Logout;
const view = ref(true);

</script>

<template>
  <div class="flex flex-col min-h-screen bg-neutral-50">

    <!-- Header -->
    <Header />
    <h1 class="font-bold text-2xl pt-8 lg:pl-20 pl-5">Espace compte</h1>
    <div class="flex min-h-screen">
      <main class="flex flex-wrap w-full gap-20 lg:gap-5 justify-between lg:px-20 px-5 py-10">
        <div class="flex-col w-full lg:max-w-[320px]">
          <h1 class="font-medium text-2xl">Compte > Profil</h1>
          <div class="flex flex-col items-center mx-auto bg-white rounded-t-lg p-5 shadow h-full max-h-[290px]">
            <div class=" flex w-full justify-center items-center">
              <div class="rounded-full flex justify-center items-center h-24 w-24 border-green-400 border-4">
                <img :src="avatar" alt="image" class="h-20 w-20 p-1">
              </div>
            </div>
            <h2 class="capitalize text-lg font-medium text-black">mon compte</h2>
            <h3 class="text-md font-medium text-gray-500 capitalize">mon numero de compte</h3>
          </div>


          <div class="shadow bg-white my-5 ">
            <div class="flex flex-col justify-center items-start mx-auto px-2 py-5">
              <div class="flex items-center capitalize text-md font-roboto text-green-500 p-5 space-x-2 cursor-pointer"  @click="router.push('/compte')">
                <div class="rounded-full flex justify-center items-center h-6 w-6 bg-green-500 border">
                  <img :src="avatar" alt="image" class="h-4 w-4">
                </div>
                <span>Mon profil</span>
              </div>
              <div class="flex items-center capitalize text-md font-roboto text-black p-5 pt-0 space-x-2 cursor-pointer">
                <div class="rounded-full flex justify-center items-center h-6 w-6 border">
                  <img :src="avatar" alt="image" class="h-4 w-4">
                </div>
                <span>modifier le profil</span>
              </div>
              <div class="flex items-center capitalize text-md font-roboto text-black p-5 pt-0 space-x-2 cursor-pointer">
                <div class="rounded-full flex justify-center items-center h-6 w-6 border">
                  <img :src="lock" alt="image" class="h-4 w-4">
                </div>
                <span>réinitialiser le mot de passe</span>
              </div>
              <div class="flex items-center capitalize text-md font-roboto text-black p-5 pt-0 space-x-2 cursor-pointer hover:text-red-600">
                <div class="rounded-full flex justify-center items-center h-6 w-6 border">
                  <img :src="logout" alt="image" class="h-4 w-4">
                </div>
                <span>déconnexion</span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full max-w-[860px] bg-white rounded-lg p-5 shadow mt-6 flex flex-col gap-5 justify-between" v-if="view">
          <h2 class="font-roboto text-xl">Mon profil</h2>
          <div class="w-full  h-full max-h-20 border">John</div>
          <div class="w-full  h-full max-h-20 border">Kalvin</div>
          <div class="w-full  h-full max-h-20 border"></div>
          <div class="w-full  h-full max-h-20 border"></div>
          <div class="w-full  h-full max-h-20 border"></div>
        </div>
      </main>
    </div>
    <Footer />
  </div>
</template>

<style scoped>

</style>