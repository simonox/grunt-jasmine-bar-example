Grunt-Build mit JSHint, Jasmine und JSDoc
=========================================

[![Build Status](https://travis-ci.org/simonox/grunt-jasmine-bar-example.png)](https://travis-ci.org/simonox/grunt-jasmine-bar-example)



Enterprise-Entwicklung ist in der Regel Teamarbeit. Eine umfangreiche Codebasis muss wartbar bleiben. Dies gilt auch für Projekte, in denen große Teile des Codes in JS entwickelt werden.


JS-Code gilt für viele Entwickler als nicht wartbar. Dies liegt daran, dass Konzepte, die im Java-Umfeld eigentlich als selbstverständlich gelten, für JS-Code missachtet werden. Zu diesen Konzepten gehören einfache Dinge wie Coding Conventions aber auch Continous Integration und testgetriebene Entwicklung.

Die Aufgabe eines Build-Systems ist es, wiederkehrende Aufgaben zu automatisieren. Zur Automatisierung eignet sich theoretisch sogar ein einfaches Shell-Script. Im Java Enterprise-Umfeld haben sich jedoch Build-Systeme wie Maven durchgesetzt. Mit Maven lassen sich auch Frontend-Artefakte integrieren.

In einem Projekt, in dem sich der Frontend-Anteil entkoppelt vom Backend-Teil bauen lässt, kann man jedoch auch ein Bild-Systeme verwenden, das komplett auf JS aufsetzt, z.B. Grunt.

[Grunt](http://gruntjs.com/) ist ein taskbasiertes Buildsystem, das über die Kommandaozeile bedient wird. Grunt basiert auf [Node.js](http://nodejs.org/) und dem dazu gehörenden [Package Manager NPM für Node Packaged Modules](https://npmjs.org/). Nachdem Node.js installiert ist, lässt sich Grunt über NPM global (für alle Nutzer) installieren.

    sudo npm install –g grunt-cli

In diesem Beispiel-Projekt ist ein sehr einfacher Build-Prozess exemplarisch implementiert. Dieser Build-Prozess besteht nur aus drei Schritten:

+ Linting mit JSHint
+ Testing mit Jasmine
+ Dokumentieren mit JSDoc


Linting findet mit JSHint statt. JSHint ist ein Community-Projekt, das dem Vorblid JSLint ähnelt. Sowohl JSHint als auch JSHint untersuchen JS-Quellen nach potentiellen Fehlern oder Problemverursachern. Darüber hinaus lässt es sich einsetzen, um die Coding Conventions eines Teams durchzusetzen.

Jasmine ist ein Testframework, das den BDD-Ansatz verfolgt. Es basiert auf RSpec und JSpec. Da es keine Abhängigkeit zu einem Webbrowser hat, lässt es sich sehr gut in einem flinken Build einsetzen.

JsDoc Toolkit ist eine Applikation, die für JS-Code das leistet, was JavaDoc für Java-Code leiset. Es geniert eine Website auf Basis eines Templates, in welcher der Quellcode einer JS-Anwendung dokumentiert wird. Als Basis für die Dokumentation werden Kommentare im JS-Code verwendet.

Ein Build-Script ist ein Grunt eine JS-Datei. Das Build-Script ist also in der gleichen Sprache formuliert, in der auch der Quellcode des Projekts geschrieben ist. Grunt verzichtet also auf schlecht zu lesende XML-Dateien o.ä.

Das Build-Script eines Projekts befindet sich in der Datei Gruntfile.js.

    module.exports = function(grunt) {
      grunt.initConfig({
        watch: {
            files: ['Gruntfile.js', 'spec/**/*js', 'src/**/*js'],
            tasks: ['jshint', 'jasmine']
        },
        jsdoc: {
            dist: {
                src: ['src/*.js', 'test/*.js'],
                dest: 'doc'
            }
        },
        jasmine: {
            pivotal: {
                src: 'src/**/*.js',
                options: {
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js'
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            all: ['src/*.js', 'Gruntfile.js']
        }
      });
      grunt.loadNpmTasks('grunt-contrib-jasmine');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-jsdoc');
      // Default task.
      grunt.registerTask('default', ['jshint', 'jasmine', 'jsdoc']);
    
    };
	
In dieser Datei werden im Task “default” die o.g. drei Build-Schritte registriert: grunt.registerTask('default', ['jshint', 'jasmine', 'jsdoc']);. Jeder dieser Schritte wird zudem in einem eigenen Block konfiguriert. Exemplarisch betrachten wir die Konfiguration des JSHint-Tasks.


    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true
      },
      all: ['src/*.js', 'Gruntfile.js']
    }

JSHint wird mit einigen Regel initialisert. Beispielsweise sollen Blöcke, die durch Bedingungen oder Schleifen angesprochen werden, immer in geschweiften Klammern stehen (curly: true) und Gleichheit soll ohne automatische Typanpassung überpüft werden (eqeqeq: true). Diese Regeln werden auf alle JS-Dateien im src-Verzeichnis und auf das Build-Script selbst, das eine gültige JS-Datei ist, angewendet (all: ['src/*.js', 'Gruntfile.js']).

Man startet das Build-Script, indem man auf der Kommandozeile grunt aufruft.


    $ grunt
    Running "jshint:all" (jshint) task
    >> 2 files lint free.
     
    Running "jasmine:pivotal" (jasmine) task
    Testing jasmine specs via phantom
    2 specs, 0 failures in 0.001s.
    >> 0 failures
     
    Running "jsdoc:dist" (jsdoc) task
    Documentation generated to /Users/simonox/js-workshop/grunt-jasmine-bar/doc
    Done, without errors.

Neben dem Default-Task gibt es auch einen Watch-Task. Dieser lässt sich über grunt watch aufrufen. Wenn sich eine Datei im Projekt verändert, dann wird automatisch ein Build angestoßen. Im Watch-Modus werden hier allerdings lediglich JSHint und Jasmine, nicht jedoch JSDoc aufgerufen, um die Roundtrip-Zeit zu verkürzen.


    watch: {
        files: ['Gruntfile.js', 'spec/**/*js', 'src/**/*js'],
        tasks: ['jshint', 'jasmine']
    }

Wie man an diesem einfachen Beispiel sieht, lässt sich ein geordneter Build, der hilft, die Softwarequalität zu verbessern, auch in JS umsetzen. Ein Artikel, der Grunt für eine automatisierte Webperformance-Optimierung nutzt, ist in der aktuellen WEAVE 03/2013 abgedruckt. Dort zeige ich, wie man einer Webanwendung durch ein flinkes Build-Script Beine machen kann.
