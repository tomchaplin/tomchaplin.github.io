n = 10000;              % Number of time steps
t = 0.01;               % Time step
x = zeros(1,n);         % Vector storing state
v = 0;                  % Velocity
a = 0;                  % Acceleration
x(1) = 10;              % Initial state
kP = 0.1;               % Proportional Gain

set_state = 0;

for i=2:n
    % Calculate new state
    v = v + a*t;
    x(i) = x(i-1) + v*t;

    % Calculate new control signal
    error = set_state - x(i);
    a = kP * error;
end

plot(x)
