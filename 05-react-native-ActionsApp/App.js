// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, {useState} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Entete} from './src/Entete'
import {Saisie} from './src/Saisie'
import {BoutonCreer} from './src/BoutonCreer'
import {ListeActions} from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default function App() {

  // états de l'application
  // il y aura probablement d'autres informations à stocker
  const [texteSaisie, setTexteSaisie] = useState('')
  const [actions, setActions] = useState([])


  /**
   * Méthode invoquée lorsque que la saisie change.
   *
   * @param nouvelleSaisie la valeur saisie
   */
  const quandLaSaisieChange = (nouvelleSaisie) => {
    console.log('la saisie à changée', nouvelleSaisie)
    setTexteSaisie(nouvelleSaisie)
    console.log(texteSaisie)
  }

  /**
   * Méthode invoquée lors du clic sur le bouton `Valider`.
   */
  const validerNouvelleAction = () => {
    console.log('Vous avez cliqué sur Valider !')
    const newAction = {
      title: texteSaisie?.length > 0 ? texteSaisie : `Action ${actions.length + 1}`,
      done: false,
      key: actions.length,
    }

    setActions([...actions, newAction])

    console.log(actions)
    
    setTexteSaisie("")
  }

  const onToogleDone = (i) => {
    console.log("Toogle done", !actions[i].done)
    actions[i].done = !actions[i].done;
    setActions(actions)
  }

    return (
        <View style={styles.conteneur}>
          <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
            <Entete/>
            <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => quandLaSaisieChange(titre)}/>
            <ListeActions actions={actions} evtToogleDone={i => onToogleDone(i)}/>
            <BoutonCreer onValider={() => validerNouvelleAction()}/>
          </ScrollView>
          <Menu/>
        </View>
    )
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
})
