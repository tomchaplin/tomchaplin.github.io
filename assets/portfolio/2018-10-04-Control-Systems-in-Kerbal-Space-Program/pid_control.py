# Importing modules
import time
import krpc
import math
from operator import add,mul,sub,truediv
conn = krpc.connect(name='Motor Control')
vessel = conn.space_center.active_vessel

def clampAlt(inputList, low, hi):
    #output = []
    #for i in inputList:
    #    output.append(max(low, min(i, hi)))
    #return output
    inputList[2] = max(low, min(hi, inputList[2]))
    return inputList

# PID Defaults
pitch_Kp = 0.4
pitch_Ki = 0.2
pitch_Kd = 0.1

roll_Kp = 0.4
roll_Ki = 0.2
roll_Kd = 0.1

alt_Kp  = 0.8
alt_Ki  = 0.1
alt_Kd  = 2.0

######### GUI ####################################################################
canvas = conn.ui.stock_canvas
# Get the size of the game window in pixels
screen_size = canvas.rect_transform.size
# Add a panel to contain the UI elements
panel = canvas.add_panel()
# Position the panel on the left of the screen
rect = panel.rect_transform
rect.size = (250, 260)
rect.position = (135-(screen_size[0]/2), 0)
# Adding activate PID button and tuning fields
pid_button = panel.add_button("Activate PID")
pid_button.rect_transform.position = (0, 100)
pid_button_clicked = conn.add_stream(getattr, pid_button, 'clicked')
pitch_text = panel.add_text("Pitch : ")
pitch_text.rect_transform.position = (0, 60)
roll_text = panel.add_text("Roll  : ")
roll_text.rect_transform.position = (0,20)
roll_text = panel.add_text("Altitude  : ")
roll_text.rect_transform.position = (0,-20)
update_button = panel.add_button("Update Tuning")
update_button.rect_transform.position=(0,-60)
update_button_clicked = conn.add_stream(getattr, update_button, 'clicked')

pitch_Kp_field = panel.add_input_field()
pitch_Ki_field = panel.add_input_field()
pitch_Kd_field = panel.add_input_field()
pitch_Kp_field.rect_transform.position = (-10,65)
pitch_Ki_field.rect_transform.position = (40, 65)
pitch_Kd_field.rect_transform.position = (90, 65)
pitch_Kp_field.rect_transform.size     = (40,30)
pitch_Ki_field.rect_transform.size     = (40,30)
pitch_Kd_field.rect_transform.size     = (40,30)
roll_Kp_field = panel.add_input_field()
roll_Ki_field = panel.add_input_field()
roll_Kd_field = panel.add_input_field()
roll_Kp_field.rect_transform.position = (-10,25)
roll_Ki_field.rect_transform.position = (40,25)
roll_Kd_field.rect_transform.position = (90,25)
roll_Kp_field.rect_transform.size     = (40,30)
roll_Ki_field.rect_transform.size     = (40,30)
roll_Kd_field.rect_transform.size     = (40,30)
alt_Kp_field = panel.add_input_field()
alt_Ki_field = panel.add_input_field()
alt_Kd_field = panel.add_input_field()
alt_Kp_field.rect_transform.position = (-10, -15)
alt_Ki_field.rect_transform.position = ( 40, -15)
alt_Kd_field.rect_transform.position = ( 90, -15)
alt_Kp_field.rect_transform.size     = (40,30)
alt_Ki_field.rect_transform.size     = (40,30)
alt_Kd_field.rect_transform.size     = (40,30)

alt_field = panel.add_input_field()
alt_field.rect_transform.position = (0, -100)
alt_field.value = "100.0"

tuningFields = [pitch_Kp_field, pitch_Ki_field, pitch_Kd_field, roll_Kp_field, roll_Ki_field, roll_Kd_field, alt_Kp_field, alt_Ki_field, alt_Kd_field]
defaultValues = [pitch_Kp, pitch_Ki, pitch_Kd, roll_Kp, roll_Ki, roll_Kd, alt_Kp, alt_Ki, alt_Kd]

for i in range(0,len(tuningFields)):
    tuningFields[i].value = str(defaultValues[i])

####### Telemetry Streams #########################################################

ref_frame = vessel.orbital_reference_frame
#control = conn.add_stream(getattr, vessel, 'control')
pitch = conn.add_stream(getattr, vessel.flight(), 'pitch')
roll  = conn.add_stream(getattr, vessel.flight(), 'roll')
alt   = conn.add_stream(getattr, vessel.flight(), 'surface_altitude')

####### Initialisation ############################################################
#
# Drone schematic
#
#    0   ^   1
#        |
#        |
#        |
#    2       3
#
# Engine i starts with  thrust at (i/10)

# Orders engines into list according to above schematic
init_engines = vessel.parts.engines
engines = []
for i in range (0,len(init_engines)):
    #print(i,' : ',init_engines[i].thrust_limit)
    init_thrust = init_engines[i].thrust_limit
    #print "Going in position " + str(int(round(init_thrust*10)))
    engines.insert(int(round(init_thrust*10)),init_engines[i])
    init_engines[i].thrust_limit = 0.8


####### Main Program ############################################################

while not pid_button_clicked():
    time.sleep(0.5)

pid_button.clicked = False

# PID Loop
# [ Pitch, Roll, Altitude ]
setState       = [ 0.0, 0.0, float(alt_field.value)]
currentState   = [ 0.0, 0.0, 0.0 ]
sumError       = [ 0.0, 0.0, 0.0 ]
previousError = [ 0.0, 0.0, 0.0 ]
currentError   = [ 0.0, 0.0, 0.0 ]
dError         = [ 0.0, 0.0, 0.0 ]
time_step      = 0.01
count          = 0

while True:
    if count%(int(round(1/time_step))) == 0:
        sumError = [ 0.0, 0.0, 0.0]

    currentState = [ pitch(), roll(), alt() ]
    currentError = map(sub, currentState, setState)
    sumError = map(add, sumError, map(mul, [time_step, time_step, time_step], currentError))
    dError = map(truediv, map(sub, currentError, previousError), [time_step, time_step, time_step])
    pControl = map(mul, [pitch_Kp, roll_Kp, alt_Kp], currentError)
    iControl = map(mul, [pitch_Ki, roll_Ki, alt_Ki], sumError)
    dControl = map(mul, [pitch_Kd, roll_Kd, alt_Kd], dError)
    pidControl = map(add, pControl, map(add, iControl, dControl))
    pidControlFrac = map(truediv, pidControl, [90.0, 90.0, 100.0])
    pidControlFrac = clampAlt(pidControlFrac, -0.8, 0.0)
    engines[0].thrust_limit = (-pidControlFrac[1] - pidControlFrac[0] - pidControlFrac[2] )
    engines[1].thrust_limit = (pidControlFrac[1] - pidControlFrac[0] - pidControlFrac[2]  )
    engines[2].thrust_limit = (-pidControlFrac[1] + pidControlFrac[0] - pidControlFrac[2] )
    engines[3].thrust_limit = (pidControlFrac[1] + pidControlFrac[0] - pidControlFrac[2]  )
    # print str(currentError) + " : " + str(pitchControl) + " : " + str(engines[0].thrust_limit)
    # pitch_text.content = "Pitch : " + str(currentError + setStatePitch)
    # control_text.content = "Control : "+str(pitchControl)
    print pidControlFrac
    previousError = currentError
    time.sleep(time_step)
    count += 1

    # Check if we've changed any of the PID tuning values
    if update_button_clicked():
        pitch_Kp = float(tuningFields[0].value)
        pitch_Ki = float(tuningFields[1].value)
        pitch_Kd = float(tuningFields[2].value)
        roll_Kp  = float(tuningFields[3].value)
        roll_Ki  = float(tuningFields[4].value)
        roll_Kd  = float(tuningFields[5].value)
        alt_Kp   = float(tuningFields[6].value)
        alt_Ki   = float(tuningFields[7].value)
        alt_Kd   = float(tuningFields[8].value)
        setState[2] = float(alt_field.value)
        update_button.clicked = False
        print str(pitch_Kp)+","+str(pitch_Ki)+","+str(pitch_Kd)+":"+str(roll_Kp)+","+str(roll_Ki)+","+str(roll_Kd)+":"+str(alt_Kp)+","+str(alt_Ki)+","+str(alt_Kd)
