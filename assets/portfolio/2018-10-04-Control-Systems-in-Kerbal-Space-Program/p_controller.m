n = 500000;             % Number of time steps
t = 0.001;              % Time step
x = zeros(1,n);         % Vector storing state
v = 0;                  % Velocity
a = 0;                  % Acceleration
x(1) = 5;               % Initial state
kP = 0.1;               % Proportional Gain
g = -0.1;               % Acceleration due to gravity
rho = 0.01;             % Air resistance constant

set_state = 0;

for i=2:n
    % Calculate new state
    v = v + a*t;
    x(i) = x(i-1) + v*t;

    % Calculate new control signal
    error = set_state - x(i);
    control = kP * error;
    a = control + g - rho*v*v*sign(v);
end

plot(x)
