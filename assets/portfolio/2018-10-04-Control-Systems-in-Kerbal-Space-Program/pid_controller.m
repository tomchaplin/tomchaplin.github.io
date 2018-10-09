n = 100000;             % Number of time steps
t = 0.001;              % Time step
x = zeros(1,n);         % Vector storing state
v = 0;                  % Velocity
a = 0;                  % Acceleration
x(1) = 5;               % Initial state

kP = 0.3;               % Proportional gain
kI = 0.05;              % Integral gain
kD = 0.7;               % Derrivative gain

g = 0;                  % Acceleration due to gravity
rho = 0.01;             % Air resistance constant

set_state = 0;          % Initial set stae

% Initialise variables
sum_error = 0;
prev_error = 0;
error = 0;

for i=2:n
    % Calculate new state
    v = v + a*t;
    x(i) = x(i-1) + v*t;
    
    % Calculate new control signal
    prev_error = error;
    error = set_state - x(i);
    sum_error = sum_error + error*t;
    diff_error = (error-prev_error)/t;
    control = kP * error + kI * sum_error + kD * diff_error;
    
    % Update acceleration
    a = control + g - rho*v*v*sign(v);
end

% Plot the simulation
figure
plot(x)

% Plot the set state
y = zeros(1,n);
hold;
plot(y,':')

% Axis labels
xlabel("Time t");
ylabel("State x");
