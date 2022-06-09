import 'package:flutter/material.dart';

void main() => runApp(MonApplication());

class MonApplication extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Bonjour App'),
          backgroundColor: Color.fromARGB(255, 183, 64, 147),
        ),
        body: SingleChildScrollView(
          child: Center(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text (
                  'Bonjour',
                  style: TextStyle(
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 183, 64, 147),
                  ) 
                ),
                Text (
                  'Je suis Ross',
                  style: TextStyle(
                    fontSize: 30,
                    color: Color.fromARGB(255, 183, 64, 147),
                  ) 
                ),
                Image.network('https://flutter.github.io/assets-for-api-docs/assets/widgets/owl-2.jpg',
                  height: 350,
                ),
                BoutonContactezMoi(),
              ],
            ),
          )
        )
      )
    );
  }
}

class BoutonContactezMoi extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    // TODO code du bouton "Contactez-moi" à compléter
    return ElevatedButton(
      style: ButtonStyle(
        textStyle: MaterialStateProperty.all<TextStyle>(TextStyle(fontSize: 20)),
        backgroundColor: MaterialStateProperty.all<Color>(Color.fromARGB(255, 183, 64, 147)),
      ),
      child: const Text('Contactez-moi'),
      onPressed: () => showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Contactez-moi'),
              content: Text('Je suis joignable à l\'IMT Atlantique'),
            );
          }
      ),
    );

  }
}