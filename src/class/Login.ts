// import axios from "axios";

class Login{
    public id: number
    public guid: number | null
    public mobile: number
    public pin: number
    constructor(
        id : number,
        guid: number| null,
        mobile: number,
        pin: number
    ) {
        this.id = id
        this.guid = guid
        this.mobile = mobile
        this.pin = pin
    }

    async Check(){
        try {
            const response = await fetch(` http://localhost:3000/check/mobile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile: this.mobile }),
            })

            if (response.ok && response.status === 200) {
                return response.json()
            }
            throw new Error('Invalid server response')
        }
        catch (error) {
            throw new Error('Error during connection')
        }
    }
    async Login(){
        try {
            const response = await fetch(`http://localhost:3002/login/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin: this.pin, mobile: this.mobile }),
            })

            if (response.ok && response.status === 200) {
                return response.json()
            }
            throw new Error('Invalid server response')
        }
        catch (error) {
            throw new Error('Error during connection')
        }
    }

    // async Check() {
    //     try {
    //         const response = await axios.post(
    //             `http://localhost:3000/check/`,
    //             {
    //                 mobile: this.mobile
    //             },
    //         )
    //         if (response.data && response.status === 200) {
    //             return response.data
    //         }
    //         throw new Error('Invalid server response')
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             const status = error.response?.status
    //             switch (status) {
    //                 case 400:
    //                     throw new Error('Please complete all fields')
    //                 case 401:
    //                     throw new Error('Invalid password')
    //                 case 404:
    //                     throw new Error('No user found')
    //                 default:
    //                     throw new Error(
    //                         error.response?.data?.message || 'Error during connection',
    //                     )
    //             }
    //         }
    //         throw error
    //     }
    // }


    async Mobile_validator(){
        if (!this.mobile){
           return  new Error('your account number is required')
        }
        const regexNumberCam = /^(\+237|237)?6(2[0]\d{6}|[5-9]\d{7})$/;
        const orangeRegex = /^(\+237|237)?6(5[5-9]|8[5-9]|9[0-9])\d{6}$/;
        const mtnRegex = /^(\+237|237)?6(5[0-4]|7[0-9]|8[0-4])\d{6}$/;

        const cleanedPhoneNumber = this.mobile.toString();
        if (!regexNumberCam.test(cleanedPhoneNumber) && !orangeRegex.test(cleanedPhoneNumber) && !mtnRegex.test(cleanedPhoneNumber)){
            console.log('Your account number is invalid.');
            return false;
            // throw new Error('Your account number is invalid.')
        }
        return true;
    }

    PIN_validator() {
        if (!this.pin) {
            throw new Error('Your Pin code must be Numeric');
        }
        const pinRegex = /^\d{4}$/;
        const cleanedPIN = this.pin.toString()

        if (!pinRegex.test(cleanedPIN)) {
            console.log('Your PIN is invalid. It must be exactly 4 digits.');
            // throw new Error('Your PIN is invalid. It must be exactly 4 digits.');
            return false;
        }
        return true;
    }
}
export {Login};