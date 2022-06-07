// chargement de la CSS du Framework Ionic
import '@ionic/core/css/ionic.bundle.css';

import { defineCustomElements } from '@ionic/core/loader';
import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';

import { Camera, CameraResultType } from '@capacitor/camera';

const API_URL = 'https://devfest-nantes-2018-api.cleverapps.io/blog'
const IMAGE_BASE_URL = 'https://devfest2018.gdgnantes.com/'

const currentPost = {
    image: '',
    title: '',
    brief: ''
};

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64
  });

  currentPost.image = image.base64String;
};

const getPosts = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

const displayPosts = (posts) => {
    const eventList = document.getElementById("event-list");

    posts.forEach(({image, title, brief}) => {
        eventList.innerHTML += 
        `
            <ion-card>
                <img src="${IMAGE_BASE_URL}${image}" />
                <ion-card-header>
                    <ion-card-title>${title}</ion-card-title>
                    <ion-card-content>
                    ${brief}
                </ion-card-content>
            </ion-card>
        `
    });
};

const listenCameraTrigger = () => {
    const cameraTrigger = document.getElementById("camera-trigger");
    cameraTrigger.addEventListener("click", takePicture);
};

const init = async () => {
    // chargement de tous les composants
    // la démarche n'est pas optimale car nous importons tous les composants
    await defineCustomElements();
    await pwaElements(window);

    const posts = await getPosts();

    displayPosts(posts);

    listenCameraTrigger();
}

init()