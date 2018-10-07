---
layout: portfolio
featured_img: /assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/jeb.jpg
display_latex: true
---
Drone and quadcopter usage is at an all time high with no indication of slowing down, but controlling them isn't exactly plain sailing. In a theoretical setting, applying equal power to each motor should cause the vessel to rise straight up. In practice, with inevitable discrpencies in design and manufacture, producing such a perfectly symmetric system is impossible. So the question arises, how can we vary the speeds of each motor to stabilise and control the aircraft? Such questions are normally answered in an environment such as MATLAB with Simulink but the video game Kerbal Space Program and addon KRPC provide a fun sandbox in which to experiment.
<!--more-->

### The setup

The goal of this project was to design, build and attempt to control a rudimentary "quadcopter" in the video game Kerbal Space Program. To be in with the best chance, the vessel should satisfy a few design requirements. Firstly, the craft should be as symmetric and balanced as possible; more precisely, the centre of mass and centre of thrust should be as close as possible so that the craft doesn't flip over straight away. Secondly, we need the engines to be highly responsive to change in thrust because we will be constantly altering them to keep the craft flying level. In Kerbal Space Program, this means sticking with liquid rocket engines such as the 48-7S "Spark". Note, we don't need any engine gimballing because we will steer the craft by varying the thrust across the 4 engines.

For the design I will be using, please see Figure 1. This design has one considerable drawback over a conventional quadcopter, in that there is no way to control the yaw of the craft. This will be discussed more later, but controlling this axis shouldn't be necessary to achieve stable flight. Moreover, it should be possible to maneuever the craft in 3D space without having any control of the yaw axis (although it will be pointing in a random direction).

<figure>
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/quad.jpg" alt="Quadcopter front view"></div>
        <div><img src="/assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/quad2.jpg" alt="Quadcopter top view"></div>
    </div>
    <figcaption>Figure 1 : Jeb's rocket-powered quadcopter</figcaption>
    <hr class="midrule">
</figure>

Next, we need some way of measuring the current state of the vessel, processing that information somehow, and then adjusting the thrust on each engine accordingly. There are two competing methods for achieving this goal, namely the two mods kRPC and kOS. kOS is arguably simpler to implement but all scripts must be written in its custom programming language. Conversley, kRPC allows you integrating with C++, Java, Python amongst many other languages. In this project, I will be using kRPC with Python.

<figure>
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/model.png" alt="Model of Quadcopter"></div>
    </div>
    <figcaption>Figure 2 : Basic model of quadcopter</figcaption>
    <hr class="midrule">
</figure>


Figure 2 defines the basic model of the quadcopter that we will be flying, including the numbering of the engines 0 through 3 and the defintions of pitch, roll and yaw.

### Control systems

The basic problem presented is how to control the thrust of each engine \\( T_i \\) over time in order to achieve some desired state (normally referred to as the set state). In this case for simplicity, we aim for a set state with both zero pitch and roll, and altitude at a fixed height. In a noisy system finding an analytic solution to this problem is impossible, there are simply too many variables which cannot be accurately measured or predicted. The solution must therefore be reactive; the system will have to be constantly measuring the state of the vessel and making adjustments accordingly. As shown in Figure 3, we must design a controller which accepts our set state and the current state and adjusts the engines accordingly.

<figure>
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/feedback_loop.png" alt="Feedback loop diagram"></div>
    </div>
    <figcaption>Figure 3 : Feedback loop for quadcopter control system</figcaption>
    <hr class="midrule">
</figure>

How to design such a controller? A first idea would be a proportional controller; the current error in the system is multiplied by some pre-defined constant (or gain) and the output is the control signal sent to the engines. Denoting the current error as \\( e(t) \\), we can express the control signal outputted to the engines as
\\[c(t) := k_p e(t)\\]
for some given gain \\( k_p \\).
To test out this idea, I did a quick test in MATALB. To simplify the problem, we reduce to a 1 dimensional system; a point which starts at \\( x = 10 \\) and is aiming for state \\( x = 0 \\). At each time step the state is updated and then the acceleration of the point is set to the control signal of the proportional controller. [Click here](/assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/p_controller.m) to download the m-file I used.

<figure>
    <hr class="midrule">
    <div class="side_by_side">
        <div><img src="/assets/portfolio/2018-10-04-Control-Systems-in-Kerbal-Space-Program/p_controller.jpg" alt="Proportional Control Model"></div>
    </div>
    <figcaption>Figure 4 : Modelling a proportional controller</figcaption>
    <hr class="midrule">
</figure>

Figure 4 shows how this system as evolves over time, there is a clear issue. The controller is only aware of the current error in the system so it keeps wildly overshooting the set state and the point ends up oscillating around the set state. After finely tuning the gain, this might be acceptable in some applications but it would make for a very nauseating flight for Jeb and may even shake the craft apart.

#### PID control

A PID control system aims to remedy the issue with the proportional controller demonstrated above. The name of this control system represents its constituent parts; the proportional, integral and derrivative terms. The PID control system can be expressed mathematically as
{% raw %}
\\[c(t) = k_p\,e(t) + k_i \int_0^t e(x)\;dx + k_d \frac{de(t)}{dt} \\]
{% endraw %}
where \\(e(t)\\) is the error at time \\(t\\), \\(c(t)\\) is the output control signal at time \\(t\\), and \\(k_p\\), \\(k_i\\) and \\(k_d\\) are the proportional, integral and derrivative gains respectively. Note, the proportional term of this system is identical to before, this term deals with the current error in the system. The next term is the integral term. Intuitively, this term adds up all previous erros in the system and so represents past error. The final term is the derrivative term which calculates how quickly the error is changing. This term is very important because it is the only term which predicts the future and can be viewed as the braking term because it will reduce the acceleration as the system appraoches it desired state.

PID controllers are featured in many modern drones across numerous applications and thus it was the natural choice for this project. For this project we will only need 3 PID controllers, one for pitch, one for roll and one for altitude, but real drones would also include a PID controller for yaw. The next question to answer is how these control signals should be combined to control the engines. Note if we wish to increase the altitude of our craft we should increase the power of all engines. To increase the roll of our craft we should increase \\(T_0\\) and \\(T_2\\) while decreasing \\(T_1\\) and \\(T_3\\). Finally, to increase the pitch of our craft we should increase \\(T_0\\) and \\(T_1\\) while decreasing \\(T_2\\) and \\(T_3\\). This gives us the following powers for each of the engine
{% raw %}
\\[
\begin{align}
T_0 &= -c_{pitch}(t) - c_{yaw}(t) - c_{alt}(t), \\\\ T_1 &= -c_{pitch}(t) + c_{yaw}(t) - c_{alt}(t), \\\\ T_2 &= +c_{pitch}(t) - c_{yaw}(t) - c_{alt}(t), \\\\ T_3 &= +c_{pitch}(t) + c_{yaw}(t) - c_{alt}(t). \\\\
\end{align}
\\]
{% endraw %}

The final problem is how to tune the gains \\(k_p\\), \\(k_i\\) and \\(k_d\\) for each of the controllers.

### Working example

* Talk about clamping
* Include Python file
* Result GIF/FLV

### Next steps

* Cascade control
* Apply to rockets (spaceX style)
* Other control systems
* Kalman filter?
