import React, { useState, useEffect } from 'react';
import classes from './App.module.css';
import queryServices from './QueryConfig/QueryService.js';
import { useQuery } from 'react-query';
import URLService from './QueryConfig/UrlService';
function Display() {

    const [tempObject, settempObject] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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
                setIsLoading(false);
            });
    };

    let turnOnHeat = () => {}
    let turnOffHeat = () => {}


    useEffect(() => {
        tempPromis();
    }, []);

    return (
        isLoading ? <h1>Loading... </h1> :
            <div className={classes['data-container']}>
                {
                    Object.keys(tempObject).map(key => {
                        return (
                            <div key={"parent" + key} className={classes['tempdata']}>
                                <div className={classes['tempdata-title']}>{key}</div>
                                <div className={classes['tempdata-value']}>{tempObject[key]}</div>
                            </div>
                        )
                    })

                }
                <div className={classes['actions-container']}>
                    <h3>Heat </h3>
                    <button onClick={() => {turnOffHeat()}}>Turn on</button>
                    <button onClick={() => {turnOffHeat()}}>Turn off</button>
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