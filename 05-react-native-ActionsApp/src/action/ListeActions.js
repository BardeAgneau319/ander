import React from 'react'
import {View, Text} from 'react-native'
import {UneAction} from './UneAction'


export const ListeActions = ({actions, evtToogleDone}) => {

    return (
        <View>
            {actions.map(a => (<UneAction action={a} key={a.key} evtToogleDone={evtToogleDone}></UneAction>) )}
        </View>
    )
}
