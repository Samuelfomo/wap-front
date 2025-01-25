class Login{
    public id: number
    public guid: number | null
    public mobile: number | null
    public pin: number
    public account_name : string | null
    public account_number : number
    public firstname: string | null
    public lastname: string | null
    constructor(
        id : number,
        guid: number| null,
        mobile: number,
        pin: number,
        account_name: string | null,
        account_number: number | null,
        firstname: string | null,
        lastname: string | null
    ) {
        this.id = id
        this.guid = guid
        this.mobile = mobile
        this.pin = pin
        this.account_name = account_name
        this.account_number = account_number
        this.firstname = firstname
        this.lastname = lastname
    }

    public static  fromJson(json: any): Login{
        return new Login(
            json.id || null, json.guid, json.mobile, null,
            json.account_name, json.account_number, json.firstname, json.lastname
        );
    }

    async updateProfile(){
        try {
            console.log('datathis', this)
            const response = await fetch(`http://192.168.100.103:3003/login/update/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( this ),
            })

            if (response.ok && response.status === 200) {

                const result =  await response.json();
                // console.log('result', result.response);
                 const value = Login.fromJson(result.response);
                 console.log('value', value);
                return value;
                // return response.json();
                // return new Login(null, response.data.response.guid,response.data.response.mobile,response.data.response.pin,);
            }
            throw new Error('Invalid server response')


        }
        catch (error) {
            throw new Error('Error during connection')
        }
    }
    // async updateProfile(){
    //     try {
    //         const response = await fetch(`http://192.168.100.103:3003/login/auth/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(this), // Use 'this' to send the current instance data
    //         })
    //
    //         if (response.ok && response.status === 200) {
    //             const result = await response.json();
    //             return Login.fromJson(result.response);
    //         }
    //         throw new Error('Invalid server response')
    //     }
    //     catch (error) {
    //         throw new Error('Error during connection')
    //     }
    // }

    async Login(){
        try {
            const response = await fetch(`http://192.168.100.103:3003/login/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin: this.pin, account_number: this.account_number }),
            })

            if (response.ok && response.status === 200) {

                const result =  await response.json();
                // console.log('result', result.response);
                 const value = Login.fromJson(result.response);
                 console.log('value', value);
                return value;
                // return response.json();
                // return new Login(null, response.data.response.guid,response.data.response.mobile,response.data.response.pin,);
            }
            throw new Error('Invalid server response')


        }
        catch (error) {
            throw new Error('Error during connection')
        }
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


    ACCOUNT_validator(){
        if (!this.account_number) {
            throw new Error('Your account number is required');
        }

        const accountRegex = /^\d{8}$/;
        const cleanedACCOUNT = this.account_number.toString();
        if (!accountRegex.test(cleanedACCOUNT)) {
            console.log('Your ACCOUNT NUMBER is invalid. It must be exactly 8 digits.');
            // throw new Error('Your ACCOUNT NUMBER is invalid. It must be exactly 8 digits.');
            return false;
        }
        return true;
    }

}
export {Login};