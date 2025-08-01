
## [Basic Operation](#basic-operation)

### [Teleoperation](#teleoperation)

**WARNING**: Make sure to run the [Bringup][bringup] from the TurtleBot3 SBC before teleoperation. Teleoperate the robot, and be careful when testing the robot on the table as the robot might fall.
{: .notice--warning}

The TurtleBot3 can be teleoperated by various remote controllers. Make sure that the necessary ROS packages are supported for your SBC and ROS version. 

<iframe width="640" height="360" src="https://www.youtube.com/embed/Z4s18hlazb4" frameborder="0" allowfullscreen></iframe>

#### [Keyboard](#keyboard)

**TIP**: Before executing this command, you have to specify the model name of TurtleBot3. The `${TB3_MODEL}` is the name of the model you are using in `burger`, `waffle`, `waffle_pi`.  
{: .notice--success}

1. Launch `turtlebot3_teleop_key` node from Remote PC for the teleoperation using a keyboard.  
  Please use the proper keyword among `burger`, `waffle`, `waffle_pi` for the `TURTLEBOT3_MODEL` parameter.  
  ```bash
> set TURTLEBOT3_MODEL=waffle
> roslaunch turtlebot3_teleop turtlebot3_teleop_key.launch
  ```

2. If the node is successfully launched, the following instruction will be appeared to the terminal window.  
```bash
Control Your Turtlebot3
Moving around
        w
    a   s   d
        x
w/x : increase/decrease linear velocity
a/d : increase/decrease angular velocity
space key, s : force stop
CTRL-C to quit
```

#### [RC100](#rc100)

The settings for [ROBOTIS RC-100B][rc100] controller is included in the OpenCR firmware for TurtleBot3 Burger, Waffle and Waffle Pi. This controller can be used with the Bluetooth module [BT410][bt410]. The TurtleBot3 Waffle Pi includes the RC-100 controller and Bluetooth modules. When using RC-100, it is not necessary to execute a specific node because `turtlebot_core` node creates a `/cmd_vel` topic in the firmware directly connected to OpenCR.

![](/assets/images/platform/turtlebot3/quick_start/basic_operation/rc100b_with_bt410.png)

1. Connect BT-410 to OpenCR UART1 port (as described [here][appendix_opencr1_0]).

2. Control TurtleBot3 with RC-100.
  - Up / Down : Increase or decrease linear velocity
  - Left / Right : Increase or decrease angular velocity

#### [Joysticks](#joysticks)
The Windows implementation of the Joystick control uses the [Open Source Simple DirectMedia Layer](https://www.libsdl.org/), which supports many tethered and wireless joysticks. The Joystick driver is currently (As of January 2020) deployed as a source package, which you need to clone into your catkin workspace.

``` bash
> git clone -b init_windows https://github.com/ms-iot/joystick_drivers
```

### [Topic Monitor](#topic-monitor)

<details>
<summary>
![](/assets/images/icon_unfold.png) **Read more about Topic Monitor**
</summary>
In order to check the topics of TurtleBot3, we will use [rqt][rqt] provided by ROS. The rqt is a Qt-based framework for GUI development for ROS. The rqt is a tool that allows users to easily see the topic status by displaying all the topics in the topic list. There are topic names, types, bandwidth, Hz, value in GUI.
</details>

1. Run the rqt from PC with the command below. If the topic monitor window is not displayed, select the `plugin` -> `Topics` -> `Topic Monitor`.
  ```bash
> rqt
  ```  
  ![](/assets/images/platform/turtlebot3/quick_start/basic_operation/legacy/rqt_1.png)

2. When the topic monitor loaded, the topic values are not monitored. Click the checkbox next to each topic to monitor the topic.  
  ![](/assets/images/platform/turtlebot3/quick_start/basic_operation/legacy/rqt_2.png)

3. To see more detailed topic message, click the `▶` icon next to the checkbox.  
  ![](/assets/images/platform/turtlebot3/quick_start/basic_operation/legacy/rqt_3.png)

  - `/battery_state` indicates a message relating to the battery condition, such as the current battery voltage and remaining capacity.  
  ![](/assets/images/platform/turtlebot3/quick_start/basic_operation/legacy/rqt_4.png)

  - `/diagnostics` indicates a message the status of the components connected to the TurtleBot3, such as a MPU9250, DYNAMIXEL-X, a HLS-LFCD-LDS, a battery and a OpenCR.  
  ![](/assets/images/platform/turtlebot3/quick_start/basic_operation/legacy/rqt_5.png)

  - `/odom` indicates a message the odometry of the TurtleBot3. This topic has orientation and position by the encoder data.  
  ![](/assets/images/platform/turtlebot3/quick_start/basic_operation/legacy/rqt_6.png)

  - `/sensor_state` indicates a message the encoder values, battery and torque.  
  ![](/assets/images/platform/turtlebot3/quick_start/basic_operation/legacy/rqt_7.png)

  - `/scan` indicates a message all of the LDS data, such as angle_max and min, range_max and min, indicates, ranges.  
  ![](/assets/images/platform/turtlebot3/quick_start/basic_operation/legacy/rqt_8.png)

[topic_monitor]: /docs/en/platform/turtlebot3/topic_monitor/
[teleoperation]: /docs/en/platform/turtlebot3/teleoperation/
[basic_examples]: /docs/en/platform/turtlebot3/basic_examples/
[additional_sensors]: /docs/en/platform/turtlebot3/additional_sensors/
[appendix_opencr1_0]: /docs/en/platform/turtlebot3/appendix_opencr1_0/