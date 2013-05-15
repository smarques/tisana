tisana
======

A rich Asana client written in Meteor, planned features are TimeTracking, Budgeting, Statistics and Reporting.

I really like Asana, and I love Meteor.js, so I figured I could try and write a client that adds some features to the standard Asana app.

The starting point was given by https://github.com/codelovers/asana-time-track, but I wanted to use Meteor to learn a new platform.

This is still very experimental. Its my first Meteor application and Meteor is still in beta. So go figure.

## Features:

### User:


- [x] Log in with your asana account

- [x] Synchronize your tasks with asana.

Tasks are saved locally in mongo but can be resynced any time

- [x] Time tracking functions on tasks.


### Admin:

- [x] list users and see what they are working on.

- Detailed Work Statistics and Work Load Visaulization using D3

- Manage Estimated Time on Tasks vs Actual Worked Time

- Add alerts when overworking a task.

- Add Hourly Cost on Users and budget functions


## Getting started

Tisana uses the excellent meteorite package manager for meteor. So start it with 

sudo mrt

### Used technologies

- Meteor.js + Meteorite
- jquery.timer.js
- spin.js
- Twitter Bootstrap
- Icons from http://rrze-icon-set.berlios.de/

**Contributions are very welcome.**

Find me at github.com/smarques





