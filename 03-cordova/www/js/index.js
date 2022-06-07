/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/

/**
 * DOM Manipulations
 */
 const createListElement = (title, content) => {
    const element = document.createElement('li');
    element.innerHTML = `${title}: ${content}`;

    return element;
};

const addDeviceInfo = () => {
    const devicePropertiesList = document.createElement('ul');
    
    devicePropertiesList.appendChild(createListElement('Cordova', device.cordova));
    devicePropertiesList.appendChild(createListElement('Model', device.model));
    devicePropertiesList.appendChild(createListElement('Uuid', device.uuid));

    document.getElementById('deviceinfo').append(devicePropertiesList);
};

const cleanNetworkInfo = () => {
    const networkInfo = document.getElementById('networkinfo');
    networkInfo.innerHTML = '';
};

const addNetworkInfo = () => {
    const connection = navigator.connection;
    const networkStatus = connection.type;

    const networkPropertiesList = document.createElement('ul');

    networkPropertiesList.appendChild(createListElement('Network status', networkStatus));

    document.getElementById('networkinfo').append(networkPropertiesList);
};

const updateNetworkStatus = () => {
    cleanNetworkInfo();

    addNetworkInfo();
};

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    addDeviceInfo();

    addNetworkInfo();
}

/**
 * Add a listener for the Online and Offline events.
 */
document.addEventListener("online", onOnline, false);
document.addEventListener("offline", onOffline, false);

const onOnline = () => {
    updateNetworkStatus();
};

const onOffline = () => {
    updateNetworkStatus();
};
