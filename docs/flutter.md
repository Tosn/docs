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

### Router

Use [go-router](https://pub.dev/packages/go_router)

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('First Screen')
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            GoRouter.of(context).go('/second'); /// also you can use context.go('/second')
          },
          child: const Text('Launch screen')
        )
      )
    );
  }
}

class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Second Screen')
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            context.go('/'); // just like GoRouter.of(context).go('/')
          },
          child: const Text('Go back!')
        )
      )
    );
  }
}

void main(List<String> args) {
  runApp(
    App()
  );
}

class App extends StatelessWidget {
  App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      title: 'GoRouter Example'
    );
  }

  final GoRouter _router = GoRouter(
    routes: <GoRoute>[
      GoRoute(
        path: '/',
        builder: (context, state)  => const FirstScreen()
      ),
      GoRoute(
        path: '/second',
        builder: (context, state) => const SecondScreen()
      )
    ]
  );
}
```

Flutter 提供2中url模式 hash 和 path  https://docs.flutter.dev/development/ui/navigation/url-strategies

```dart
/// default is hash
/// for use path mode need todo:
/// To configure Flutter to use the path instead, use the usePathUrlStrategy function provided by the flutter_web_plugins library in the SDK:
import 'package:flutter_web_plugins/url_strategy.dart';

void main () {
  usePathUrlStrategy();
  runApp(xxx)
}
```

