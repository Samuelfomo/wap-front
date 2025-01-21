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

    public static  fromJson(json: any): Login{
        return new Login(
            json.id || null, json.guid, json.mobile, null
        );
    }

    async Login(){
        try {
            const response = await fetch(`http://192.168.100.103:3003/login/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin: this.pin, mobile: this.mobile }),
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
        if (!this.mobile) {
            throw new Error('Your account number is required');
        }

        const accountRegex = /^\d{8}$/;
        const cleanedACCOUNT = this.mobile.toString();
        if (!accountRegex.test(cleanedACCOUNT)) {
            console.log('Your ACCOUNT NUMBER is invalid. It must be exactly 14 digits.');
            // throw new Error('Your ACCOUNT NUMBER is invalid. It must be exactly 14 digits.');
            return false;
        }
        return true;
    }

}
export {Login};