// chargement de la CSS du Framework Ionic
import '@ionic/core/css/ionic.bundle.css'

import {defineCustomElements} from "@ionic/core/loader"

import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';

pwaElements(window)

const API_URL = 'https://devfest-nantes-2018-api.cleverapps.io/blog'
const IMAGE_BASE_URL = 'https://devfest2018.gdgnantes.com/'

const init = async () => {
    // chargement de tous les composants
    // la démarche n'est pas optimale car nous importons tous les composants
    await defineCustomElements()

    const response = await fetch(API_URL)
    const data = await response.json()

    const eventList = document.getElementById("event-list")

    data.forEach(event => {
        eventList.innerHTML += 
        `
            <ion-card>
                <img src="${IMAGE_BASE_URL}${event.image}" />
                <ion-card-header>
                    <ion-card-title>${event.title}</ion-card-title>
                    <ion-card-content>
                    ${event.brief}
                </ion-card-content>
            </ion-card>
        `
    })

}

init()