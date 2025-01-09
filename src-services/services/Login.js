const axios = require('axios');

class Login {
    constructor() {
        this.baseUrl = "http:192.168.100.103:3000";
        this.username = 'whatsapp';
        this.password = 'hjjjssgdgdhjsdhgs';
    }

    async search(mobile) {
        try {
            const response = await axios.put(`${this.baseUrl}/check/`, {
                mobile: mobile
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
                }
            });
            // console.log(response);
            return response.data;

        } catch (error) {
            console.error('User search failed:', error);
            return null;
        }
    }
    async connect(pin) {
        try {
            const response = await axios.put(`${this.baseUrl}/login/`, {
                pin: pin
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
                }
            });
            // console.log(response);
            return response.data;

        } catch (error) {
            console.error('User login failed :', error);
            return null;
        }
    }
}

module.exports = Login;