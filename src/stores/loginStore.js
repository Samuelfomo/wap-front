// stores/loginStore.js
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => {
        try {
            const savedData = localStorage.getItem('userData')
            return {
                userData: savedData ? JSON.parse(savedData) : null
            }
        } catch (error) {
            console.error('Error loading userData from localStorage:', error)
            return {
                userData: null
            }
        }
    },

    getters: {
        mobile: (state) => state.userData?.mobile || null,
        guid: (state) => state.userData?.guid || null,
        isLoggedIn: (state) => !!state.userData,
        // Ajout d'un getter pour obtenir toutes les données utilisateur
        allUserData: (state) => state.userData
    },

    actions: {
        setUserData(data) {
            try {
                this.userData = data
                localStorage.setItem('userData', JSON.stringify(data))
            } catch (error) {
                console.error('Error saving userData to localStorage:', error)
            }
        },

        clearUserData() {
            try {
                this.userData = null
                localStorage.removeItem('userData')
            } catch (error) {
                console.error('Error clearing userData from localStorage:', error)
            }
        },

        // Optionnel : Action pour recharger les données depuis localStorage
        loadFromStorage() {
            try {
                const savedData = localStorage.getItem('userData')
                if (savedData) {
                    this.userData = JSON.parse(savedData)
                }
            } catch (error) {
                console.error('Error loading userData from localStorage:', error)
            }
        }
    }
})

// export const useLoginStore = defineStore('login', {
//     state: () => ({
//         userData: null
//     }),
//
//     getters: {
//         // Modifier les getters pour renvoyer les valeurs correctement
//         // mobile: (state) => state.userData?.mobile || null,
//         mobile: (state) => {
//             // console.log('State in getter:', state.userData)
//             return state.userData?.mobile || null
//         },
//         guid: (state) => state.userData?.guid || null,
//         isLoggedIn: (state) => !!state.userData
//     },
//
//     actions: {
//         setUserData(data) {
//             this.userData = data
//         },
//         clearUserData() {
//             this.userData = null
//         }
//     }
// })