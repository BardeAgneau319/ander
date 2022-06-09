import 'package:convertisseur_devises/models/devise.dart';
import 'package:convertisseur_devises/styles.dart';
import 'package:flutter/material.dart';

class ConvertisseurDevisePage extends StatefulWidget {

  ConvertisseurDevisePage();

  @override
  State<StatefulWidget> createState() {
    return _ConvertisseurDevisePage();
  }
}

class _ConvertisseurDevisePage extends State<ConvertisseurDevisePage> {

  // les différents "états" de la page

  double _valeur = 0; // valeur saisie
  Devise _deviseInitial = Devise.EURO; // devise initiale sélectionnée
  Devise _deviseFinale = Devise.DOLLAR; // devise finale sélectionnée
  double _resultat = 0; // le résultat de la conversion

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Spacer(),
          Text(
            'Valeur',
            style: AppStyle.labelStyle,
          ),
          Spacer(),
          TextField(
            style: AppStyle.inputStyle,
            onChanged: (value) {
              setState(() {
                _valeur = double.parse(value);
              });
            }
          ),
          Spacer(),
          Text(
            'De',
            style: AppStyle.labelStyle,
          ),
          Spacer(),
          DropdownButton(
              value: _deviseInitial,
              isExpanded: true,
              onChanged: (Devise? newVal) {
                setState(() {
                  _deviseInitial = newVal!;
                });
              },
              items: Devise.values
                .map<DropdownMenuItem<Devise>>((Devise value) {
                  return DropdownMenuItem<Devise>(
                    value: value,
                    child: Text(value.libelle),
                  );
                }).toList(),
          ),
          Spacer(),
          Text('Vers', style: AppStyle.labelStyle),
          Spacer(),
          DropdownButton(
              value: _deviseFinale,
              isExpanded: true,
              onChanged: (Devise? newVal) {
                setState(() {
                  _deviseFinale = newVal!;
                });
              },
              items: Devise.values
                .map<DropdownMenuItem<Devise>>((Devise value) {
                  return DropdownMenuItem<Devise>(
                    value: value,
                    child: Text(value.libelle),
                  );
                }).toList(),
          ),
          Spacer(
            flex: 2,
          ),
          ElevatedButton(onPressed: () {
            setState(() {
              var euros = _valeur * (1 / taux[_deviseInitial]!);
              _resultat = taux[_deviseFinale]! * euros;
            });
          }, child: Text('Convertir')),
          Spacer(
            flex: 2,
          ),
          Text(_resultat.toString(), style: AppStyle.labelStyle),
          Spacer(),
        ],
    ));
  }
}