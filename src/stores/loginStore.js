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
                // Ajouter une date d'expiration (par exemple, 24h)
                const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000);
                const dataWithExpiration = {
                    ...data,
                    expiresAt
                };

                this.userData = data;
                localStorage.setItem('userData', JSON.stringify(dataWithExpiration));
            } catch (error) {
                console.error('Error saving userData to localStorage:', error);
            }
        },

        checkSession() {
            try {
                const savedData = localStorage.getItem('userData');
                if (savedData) {
                    const data = JSON.parse(savedData);
                    const now = new Date().getTime();

                    // Vérifier si la session a expiré
                    if (data.expiresAt && now > data.expiresAt) {
                        this.clearUserData();
                        return false;
                    }
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Error checking session:', error);
                return false;
            }
        },
        // setUserData(data) {
        //     try {
        //         this.userData = data
        //         localStorage.setItem('userData', JSON.stringify(data))
        //     } catch (error) {
        //         console.error('Error saving userData to localStorage:', error)
        //     }
        // },

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
        },

        async logout() {
            try {
                // 1. Appel API de déconnexion (si nécessaire)
                // await api.logout();  // Décommentez si vous avez un endpoint de logout

                // 2. Nettoyer les données locales
                this.clearUserData();

                // 3. Retourner true pour indiquer le succès
                return true;
            } catch (error) {
                console.error('Erreur lors de la déconnexion:', error);
                return false;
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