import React, { useEffect } from 'react'
import { EmailJSResponseStatus, init, emailjs } from 'emailjs-com';


function EmailSenderComponent() {

    useEffect(() => {
        
    }, []);



    var heatOnTemplateId = 'template_ji8ko22';
    var heatOffTemplateId = 'template_nq5i03e';




    emailjs.send('service_5xcmrbx', heatOnTemplateId, templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

    return (
        <div>
        </div>
    )
}

export default EmailSenderComponent
