const axios = require('axios');

class Login {
    constructor() {
        this.baseUrl = "http://192.168.100.103:3000";
    }

    async connect(pin, account_number) {
        try {
            const response = await axios.put(`${this.baseUrl}/login/auth/`, {
                pin: String(pin),
                account_number: String(account_number)
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

    // async update(data: {
    //     guid?: number,
    //     mobile?: number,
    //     account_number: string,
    //     account_name?: string,
    //     firstname?: string,
    //     lastname?: string
    // }) {
    //     try {
    //         const response = await axios.put(`${this.baseUrl}/login/auth/`, {
    //             guid: data.guid,
    //             mobile: data.mobile,
    //             account_number: String(data.account_number),
    //             account_name: data.account_name,
    //             firstname: data.firstname,
    //             lastname: data.lastname
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             timeout: 5000 // 5 seconds timeout
    //         });
    //
    //         return response.data;
    //
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             if (error.response?.status === 401) {
    //                 throw new Error(error.response.data.message || 'update failed');
    //             } else if (error.code === 'ECONNABORTED') {
    //                 throw new Error('Connection timeout');
    //             }
    //         }
    //
    //         throw new Error('Connection error with update service');
    //     }
    // }
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