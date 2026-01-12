import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';

export default class CustomContactForm extends LightningElement {

    firstName = '';
    lastName = '';
    email = '';
    phone = '';

    handleFirstName(event) {
        this.firstName = event.target.value;
    }

    handleLastName(event) {
        this.lastName = event.target.value;
    }

    handleEmail(event) {
        this.email = event.target.value;
    }

    handlePhone(event) {
        this.phone = event.target.value;
    }

    handleSave() {
        const fields = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Phone: this.phone
        };

        const recordInput = {
            apiName: 'Contact',
            fields
        };

        createRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created successfully',
                        variant: 'success'
                    })
                );

                // Reset form
                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.phone = '';
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}
