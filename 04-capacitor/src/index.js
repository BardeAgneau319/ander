// chargement de la CSS du Framework Ionic
import '@ionic/core/css/ionic.bundle.css';

import { defineCustomElements } from '@ionic/core/loader';
import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';

import { Camera, CameraResultType } from '@capacitor/camera';

import { Storage } from '@capacitor/storage';

const API_URL = 'https://devfest-nantes-2018-api.cleverapps.io/blog'
const IMAGE_BASE_URL = 'https://devfest2018.gdgnantes.com/'

let currentPost = {};

const savePost = async (post) => {
    if (post.id === undefined) {
        // Dirty id
        post.id = (await Storage.keys()).keys.length;
    }

    await Storage.set({
        key: post.id,
        value: JSON.stringify(post)
    });
};

const savePosts = async (posts) => {
    await Promise.all(posts.map(savePost));
};

const getPost = async (id) => {
    const { value } = await Storage.get({ key: id });

    return JSON.parse(value);
};

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl
  });

  currentPost.image = image.dataUrl;

  await savePost(currentPost);
  document.getElementById("event-list").innerHTML += await getPostElement(currentPost.id);
  currentPost = {};
};

const getPosts = async () => {
    const response = await fetch(API_URL);
    const posts = await response.json();

    return posts.map(post => { return {...post, image: `${IMAGE_BASE_URL}${post.image}`} });
};

const getPostElement = async (id) => {
    const { image, title, brief } = await getPost(id);

    return `
            <ion-card>
                <img src="${image}" />
                <ion-card-header>
                    <ion-card-title>${title}</ion-card-title>
                    <ion-card-content>
                    ${brief}
                </ion-card-content>
            </ion-card>
        `
};

const displayPosts = async (posts) => {
    const eventList = document.getElementById("event-list");

    const postElements = await Promise.all(posts.map(async ({ id }) => await getPostElement(id)));
    postElements.forEach(post => eventList.innerHTML += post);
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

    await Storage.clear();

    listenCameraTrigger();

    const posts = await getPosts();

    await savePosts(posts);

    displayPosts(posts);
}

init()