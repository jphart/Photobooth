Photobooth
==========

Modified heavily from the Pluralsight example by Jake Trent.

Todo
====

Must
----

* Switcher for backgrounds - Done
* Restore screen after photo taken - Done
* Save mirrored version - Done

Should
------

* Save original as well as with frame - Done
* Mirror canvas is more natural - Done
* Display picture for a few seconds after taking Done



Could
-----

* Save as JPG rather than PNG Done



Development
===========

Initial setup
```sh
$ npm install
```

To run
```sh
$ npm start
```


To package an executable

```sh
$ electron-bundler ./
```

Package manager alternative
npm install -g electron-packager --save-dev

electron-packager ./ appName --platform=win32 --arch=x64 --electron-version=1.4.3