import React, { useState, useEffect } from 'react';
import classes from './App.module.css';
import queryServices from './QueryConfig/QueryService.js';
import { useQuery } from 'react-query';
import URLService from './QueryConfig/UrlService';
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';

var initialHeatValue = "";
function Display() {

    const [tempObject, settempObject] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    var heatOnTemplateId = 'template_ji8ko22';
    var heatOffTemplateId = 'template_nq5i03e';

    let tempPromis = async () => {
        setIsLoading(true);
        await queryServices._fetch(URLService.getTemperatureData()).
            then(temp => {
                var result = {};
                var proprieties = temp.split(',');
                proprieties.forEach(prop => {
                    var keyValuePair = prop.split(':');
                    result[keyValuePair[0]] = keyValuePair[1];

                });
                settempObject(result);
                debugger;

                Object.keys(tempObject).map(async (key) => {

                    if (key == 'isHeatOn' && tempObject[key] != initialHeatValue) {
                        debugger;

                        let templateId = heatOnTemplateId;

                        initialHeatValue = tempObject[key];

                        if (tempObject[key] == false) {
                            templateId = heatOffTemplateId;
                        }

                        if (templateId) {

                            let templateParams = {
                                replay_to: 'rosian_mihai22@yahoo.com'
                            }

                            debugger;
                            await emailjs.send('service_5xcmrbx', templateId, templateParams)
                                .then(function (response) {
                                    console.log('SUCCESS!', response.status, response.text);
                                }, function (error) {
                                    console.log('FAILED...', error);
                                });
                        }
                    }

                })

                setIsLoading(false);
            });
    };

    let turnOnHeat = () => { }
    let turnOffHeat = () => { }

    useEffect(() => {
        init("user_SFQYzxwVQ9qt3YMnz4A4T");

        let interval = setInterval(async () => {
            await tempPromis();
        }, 10000);

        return () => {
            clearInterval(interval)
        }

    }, [])

    return (
        isLoading ? <h1>Loading... </h1> :
            <div className={classes['data-container']}>
                {
                    Object.keys(tempObject).map(key => {
                        var title = key;
                        var value = tempObject[key];
                        var templateId;

                        if (title === 'isHeatOn') {
                            if (value == true) {
                                value = "ON";
                            }
                            else {
                                value = "OFF";
                            }
                        }

                        if (title === 'Temperature') {
                            value = value + '°C';
                        }

                        if (title === 'Humidity') {
                            value = value + '%';
                        }



                        return (
                            <div key={"parent" + key} className={classes['tempdata']}>
                                <span className={classes['tempdata-title']}>{title}</span>
                                <p className={classes['tempdata-value']}>{value}</p>
                            </div>
                        )
                    })

                }
                <div className={classes['actions-container']}>
                    <h3>Heat </h3>
                    <button onClick={() => { turnOffHeat() }}>Turn on</button>
                    <button onClick={() => { turnOffHeat() }}>Turn off</button>
                </div>
            </div>
    )
}

export default Display;



    // tempPromis();

    // useEffect(() => {

    //     let interval = setInterval(() => {
    //         tempPromis();
    //     }, 60000);

    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])