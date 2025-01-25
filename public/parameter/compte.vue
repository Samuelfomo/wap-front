<script setup>
import {ref, reactive} from "vue";
import {useRouter} from "vue-router";

import Footer from "@public/components/footer.vue";
import Header from "@public/components/header.vue";
import Avatar from "@/assets/images/avatar.svg";
import Lock from "@/assets/images/lock.svg";
import Logout from "@/assets/images/logout.svg";
import Recharge from "@/assets/images/recharge.svg";

import Dashboard from "@public/components/dashboard.vue";

import { useLoginStore } from '@/stores/loginStore'
import { storeToRefs } from 'pinia'
// import {data} from "autoprefixer";

import {Login} from "@/class/Login";

const router = useRouter()
const store = useLoginStore()
// Utiliser storeToRefs pour préserver la réactivité
const { mobile, guid, account_name, account_number, firstname, lastname, isLoggedIn } = storeToRefs(store)
console.log("data received is :", mobile.value, guid.value, account_name.value, account_number.value, firstname.value, lastname.value, isLoggedIn.value  );

const avatar = Avatar;
const lock = Lock;
const logout = Logout;
const recharge = Recharge;
const modify = ref(true);
const resetPass = ref(false);
const reload = ref(false);
const modif = () => {
  modify.value = true
  resetPass.value = false
  reload.value = false
}
const reset = () => {
  modify.value = false
  resetPass.value = true
  reload.value = false
}
const relo = () => {
  modify.value = false
  resetPass.value = false
  reload.value = true
}

const profileForm = reactive({
  guid: guid.value || '',
  firstName: firstname.value || '',
  lastName: lastname.value || '',
  name: account_name.value || '',
  phone: mobile.value || '',
  address: account_number.value || ''
});
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const rechargeForm = reactive({
  amount: '',
  number:''
});
// État des erreurs
const errors = reactive({
  profile: {},
  password: {},
  recharge: {}
});
// Fonctions de validation
const validateProfile = () => {
  errors.profile = {};
  // if (!profileForm.firstName) errors.profile.firstName = 'Le prénom est requis';
  if (!profileForm.lastName) errors.profile.lastName = 'Le nom est requis';
  if (!profileForm.name) errors.profile.name = 'Le nom du compte est requis';
  if (!profileForm.phone) errors.profile.phone = 'Le téléphone est requis';
  return Object.keys(errors.profile).length === 0;
};

const validatePassword = () => {
  errors.password = {};
  if (!passwordForm.currentPassword) errors.password.currentPassword = 'Le mot de passe actuel est requis';
  if (!passwordForm.newPassword) errors.password.newPassword = 'Le nouveau mot de passe est requis';
  if (passwordForm.newPassword.length < 8) errors.password.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errors.password.confirmPassword = 'Les mots de passe ne correspondent pas';
  }
  return Object.keys(errors.password).length === 0;
};

const validateRecharge = () => {
  errors.recharge = {};
  if (!rechargeForm.amount) errors.recharge.amount = 'Le montant est requis';
  if (rechargeForm.amount <= 0) errors.recharge.amount = 'Le montant doit être supérieur à 0';
  if (!rechargeForm.number) errors.recharge.number = 'La méthode de paiement est requise';
  return Object.keys(errors.recharge).length === 0;
};

// Handlers de soumission
const handleProfileSubmit = async () => {
  if (!validateProfile()) return;
  try {
    const Profile = new Login(
        null,
        profileForm.guid,
        profileForm.phone,
        null,
        profileForm.name,
        profileForm.address,
        profileForm.firstName,
        profileForm.lastName
    )
    // Appel API pour mettre à jour le profil
    console.log('Mise à jour du profil:', Profile);
    await Profile.updateProfile();
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
  }
};

const handlePasswordReset = async () => {
  if (!validatePassword()) return;
  try {
    // Appel API pour réinitialiser le mot de passe
    console.log('Réinitialisation du mot de passe');
    // await resetPassword(passwordForm);
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
  }
};

const handleRecharge = async () => {
  if (!validateRecharge()) return;
  try {
    // Appel API pour recharger le compte
    console.log('Recharge du compte:', rechargeForm);
    // await rechargeAccount(rechargeForm);
  } catch (error) {
    console.error('Erreur lors de la recharge du compte:', error);
  }
};

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

<template>
  <div class="flex flex-col min-h-screen bg-neutral-50">

    <!-- Header -->
    <Header description="compte" />
    <Dashboard />
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
            <h2 class="capitalize text-lg font-medium text-black">{{profileForm.name}}</h2>
            <h3 class="text-md font-medium text-gray-500 capitalize">{{ profileForm.address }} {{guid}}</h3>
          </div>

          <div class="shadow bg-white my-5 ">
            <div class="flex flex-col justify-center items-start mx-auto px-2 py-5">
              <div class="flex w-full items-center capitalize text-md font-roboto text-black py-3 px-5 space-x-2 cursor-pointer
              hover:bg-green-100" @click="modif" :class="{'bg-green-100': modify, 'bg-white': !modify}"
              >
                <div class="rounded-full flex justify-center items-center h-6 w-6 border">
                  <img :src="avatar" alt="image" class="h-4 w-4">
                </div>
                <span>modifier le profil</span>
              </div>
              <div class="flex w-full items-center capitalize text-md font-roboto text-black py-3 px-5 space-x-2 cursor-pointer
              hover:bg-green-100" @click="reset" :class="{'bg-green-100': resetPass, 'bg-white': !resetPass}">
                <div class="rounded-full flex justify-center items-center h-6 w-6 border">
                  <img :src="lock" alt="image" class="h-4 w-4">
                </div>
                <span>réinitialiser le mot de passe</span>
              </div>
              <div class="flex w-full items-center capitalize text-md font-roboto text-black py-3 px-5 space-x-2 cursor-pointer
              hover:bg-green-100" @click="relo" :class="{'bg-green-100': reload, 'bg-white': !reload}">
                <div class="rounded-full flex justify-center items-center h-6 w-6 border">
                  <img :src="recharge" alt="image" class="h-4 w-4">
                </div>
                <span>recharger mon compte</span>
              </div>
              <div class="flex w-full items-center capitalize text-md font-roboto text-black py-3 px-5 space-x-2 cursor-pointer hover:text-red-600  hover:bg-red-100" @click="handleLogout">
                <div class="rounded-full flex justify-center items-center h-6 w-6 border">
                  <img :src="logout" alt="image" class="h-4 w-4">
                </div>
                <span>déconnexion</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="modify" class="w-full max-w-[860px] bg-white rounded-lg p-5 shadow mt-6">
          <h2 class="font-roboto text-xl capitalize mb-6">Mon profil</h2>
          <form @submit.prevent="handleProfileSubmit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                    type="text"
                    v-model="profileForm.firstName"
                    class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                    :class="{'border-red-500': errors.profile.firstName}"
                >
                <span v-if="errors.profile.firstName" class="text-red-500 text-sm">{{ errors.profile.firstName }}</span>
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Nom</label>
                <input
                    type="text"
                    v-model="profileForm.lastName"
                    class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                    :class="{'border-red-500': errors.profile.lastName}"
                >
                <span v-if="errors.profile.lastName" class="text-red-500 text-sm">{{ errors.profile.lastName }}</span>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Nom du compte</label>
              <input
                  type="text"
                  v-model="profileForm.name"
                  class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                  :class="{'border-red-500': errors.profile.name}"
              >
              <span v-if="errors.profile.name" class="text-red-500 text-sm">{{ errors.profile.name }}</span>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                  type="tel"
                  v-model="profileForm.phone"
                  class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                  :class="{'border-red-500': errors.profile.phone}"
              >
              <span v-if="errors.profile.phone" class="text-red-500 text-sm">{{ errors.profile.phone }}</span>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Numéro de compte </label>
              <textarea
                  v-model="profileForm.address"
                  class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                  rows="3"
              ></textarea>
            </div>
            <button type="submit" class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Enregistrer les modifications
            </button>
          </form>
        </div>

        <!-- Formulaire de réinitialisation de mot de passe -->
        <div v-if="resetPass" class="w-full max-w-[860px] bg-white rounded-lg p-5 shadow mt-6">
          <h2 class="font-roboto text-xl capitalize mb-6">Réinitialiser le mot de passe</h2>
          <form @submit.prevent="handlePasswordReset" class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
              <input
                  type="password"
                  v-model="passwordForm.currentPassword"
                  class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                  :class="{'border-red-500': errors.password.currentPassword}"
              >
              <span v-if="errors.password.currentPassword" class="text-red-500 text-sm">{{ errors.password.currentPassword }}</span>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
              <input
                  type="password"
                  v-model="passwordForm.newPassword"
                  class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                  :class="{'border-red-500': errors.password.newPassword}"
              >
              <span v-if="errors.password.newPassword" class="text-red-500 text-sm">{{ errors.password.newPassword }}</span>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
              <input
                  type="password"
                  v-model="passwordForm.confirmPassword"
                  class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                  :class="{'border-red-500': errors.password.confirmPassword}"
              >
              <span v-if="errors.password.confirmPassword" class="text-red-500 text-sm">{{ errors.password.confirmPassword }}</span>
            </div>
            <button type="submit" class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Réinitialiser le mot de passe
            </button>
          </form>
        </div>

        <!-- Formulaire de recharge -->
        <div v-if="reload" class="w-full max-w-[860px] bg-white rounded-lg p-5 shadow mt-6">
          <h2 class="font-roboto text-xl capitalize mb-6">Recharger mon compte</h2>
          <form @submit.prevent="handleRecharge" class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Montant</label>
              <input
                  type="number"
                  v-model="rechargeForm.amount"
                  class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                  :class="{'border-red-500': errors.recharge.amount}"
                  min="0"
                  step="0.01"
              >
              <span v-if="errors.recharge.amount" class="text-red-500 text-sm">{{ errors.recharge.amount }}</span>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Numéro de compte</label>
              <input
                  type="number"
                  v-model="rechargeForm.number"
                  class="w-full p-2 border rounded-md focus:outline-none focus:border-green-500 focus:ring-1
                 focus:ring-green-400 transition duration-300"
                  :class="{'border-red-500': errors.recharge.number}"
                  min="0"
                  step="0.01"
              >
              <span v-if="errors.recharge.number" class="text-red-500 text-sm">{{ errors.recharge.number }}</span>
            </div>
            <button type="submit" class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Recharger
            </button>
          </form>
        </div>

      </main>
    </div>
    <Footer />
  </div>
</template>

<style scoped>

</style>