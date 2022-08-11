### appBar

```dart
import 'package:flutter/material.dart';

void main(List<String> args) {
  runApp(
    const MaterialApp(
      home: Scaffold(
        appBar: MyAppBar(title: 'Hello World'),
        body: MyApp()
      )
    )
  );
}
/// https://stackoverflow.com/questions/52678469/the-appbardesign-cant-be-assigned-to-the-parameter-type-preferredsizewidget
class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  const MyAppBar({required this.title, super.key});
  final String title;

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight); // kToolbarHeight or double

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(title),
      leading: const Icon(Icons.menu),
    );
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('Hello World');
  }
}
```

### useful Widget

```dart
// some useful widget
SizedBox() // key width height child, use for box or space
// Container
Container(
	decoration: const BoxDecoration(
  	color: Colors.deepPurple, // container background-color
    image: DecorationImage(image: AssetImage('images/1.jpeg'), fit: BoxFit.cover) // constainer background-image mode: cover
  )
)
```

### Image.asset vs AssetImage

```dart
/// Image is a StatefulWidget and Image.asset is just a named constructor, you can use it directly on your widget tree.
///
/// AssetImage is an ImageProvider which is responsible for obtaining the image of the specified path.
///
/// When use for image, Image.asset use as a Widget, AssetImage use as a parameter also Image.asset class use AssetImage inside

// example
Row(
	children: [
    Image.asset('xxxxx') // here is a widget
  ]
)
  
Container(
	decoration: BoxDecoration(
  	image: DecorationImage(
    	image: AssetImage('xxxxx') // here AssetImage just as a parameter
    )
  )
)
```

### Get Widget List from List Data

```dart

class Test {
  final IconData icon;
  final String name;

  Test({ required this.icon, required this.name });
}

List<Test> init() {
  List listData = [
    { 'icon': Icons.menu, 'name': 'Menu' },
    { 'icon': Icons.share, 'name': 'Share' },
    { 'icon': Icons.car_rental, 'name': 'Cart' },
  ];

  var ll = listData.map((e) => Test(icon: e['icon'], name: e['name'])).toList();
  return ll;
}

List<Widget> initWidget() {
  return init().map((e) => Column(
    children: [
      Icon(e.icon),
      Text(e.name)
    ],
  )).toList();
}

void main(List<String> args) {
  runApp(
    const MyApp()
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Row(
          children: initWidget(),
        ),
      ),
    );
  }
}
```
