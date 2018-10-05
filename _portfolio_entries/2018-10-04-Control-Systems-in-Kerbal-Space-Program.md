---
layout: portfolio
featured_img: /assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/jeb.png
---
Drone and quadcopter usage is at an all time high with no indication of slowing down, but controlling them isn't exactly plain sailing. In a theoretical setting, applying equal power to each motor should cause the vessel to rise straight up. In practice, with inevitable discrpencies in design and manufacture, producing such a perfectly symmetric system is impossible. So the question arises, how can we vary the speeds of each motor to stabilise and control the aircraft? Such questions are normally answered in an environment such as MATLAB with Simulink but the video game Kerbal Space Program and addon KRPC provide a fun sandbox in which to experiment.
<!--more-->

# The setup

The goal of this project was to design, build and attempt to control a rudimentary "quadcopter" in the video game Kerbal Space Program. To be in with the best chance, the vessel should satisfy a few design requirements. Firstly, the craft should be as symmetric and balanced as possible; more precisely, the centre of mass and centre of thrust should be as close as possible so that the craft doesn't flip over straight away. Secondly, we need the engines to be highly responsive to change in thrust because we will be constantly altering them to keep the craft flying level. In Kerbal Space Program, this means sticking with liquid rocket engines such as the 48-7S "Spark". Note, we don't need any engine gimballing because we will steer the craft by varying the thrust across the 4 engines.

For the design, I will be using, please see Figure 1. This design has one considerable drawback over a conventional quadcopter, in that there is no way to control the yaw of the craft. This will be discussed more later, but controlling this axis shouldn't be necessary to achieve stable flight. Moreover, it should be possible to maneuever the craft in 3D space without having any control of the yaw axis (although it will be pointing in a random direction).

Next, we need some way of measuring the current state of the vessel, processing that information somehow, and then adjusting the thrust on each engine accordingly. There are two competing methods for achieving this goal, namely the two mods kRPC and kOS. kOS is arguably simpler to implement but all scripts must be written in its custom programming language. Conversley, kRPC allows you integrating with C++, Java, Python amongst many other languages. In this project, I will be using kRPC with Python.

## Basic model of the vessel

# Control systems

## PID control

# Working example

# Next steps

I'm going to include a link to the [Python file](/assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/pid_control.py).
