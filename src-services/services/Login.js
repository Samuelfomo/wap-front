const axios = require('axios');

class Login {
    constructor() {
        this.baseUrl = "http://192.168.100.103:3000";
    }

    async connect(pin, mobile) {
        try {
            const response = await axios.put(`${this.baseUrl}/login/auth/`, {
                pin: String(pin),
                mobile: String(mobile)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;

        } catch (error) {
            if (error.response?.status === 401) {
                // Message d'erreur simplifié
                const errorMessage = error.response.data.message || 'Authentication failed';
                throw new Error(errorMessage);
            } else {
                // Message générique pour les autres erreurs
                throw new Error('Connection error with authentication service');
            }
        }
    }
}

// class Login {
//     constructor() {
//         this.baseUrl = "http://192.168.100.103:3000";
//
//     }
//
//     async connect(pin, mobile) {
//         try {
//             const response = await axios.put(`${this.baseUrl}/login/auth/`, {
//                 pin: String(pin),
//                 mobile: String(mobile)
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//             return response.data;
//
//         } catch (error) {
//             if (error.response.status === 401) {
//                 console.error('Invalid credentials:', error.response.data.message);
//                 throw error;
//             } else {
//                 console.error('An unexpected error occurred:', error.message);
//                 throw error;
//             }
//         }
//     }
//
//     // async search(data) {
//     //     try {
//     //         const response = await axios.put(`${this.baseUrl}/check/`, {
//     //             data: data,
//     //         }, {
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //                 'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
//     //             }
//     //         });
//     //         // console.log(response);
//     //         return response.data;
//     //
//     //     } catch (error) {
//     //         console.error('User search failed:', error);
//     //         return null;
//     //     }
//     // }
// }

module.exports = Login;