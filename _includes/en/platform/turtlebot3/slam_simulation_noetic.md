
When SLAM in Gazebo simulator, you can select or create various environments and robot models in virtual world. Other than preparing simulation environment instead of bringing up the robot, SLAM Simulation is pretty similar to that of [SLAM][slam] with the actual TurtleBot3.  

The following instructions require prerequisites from the previous sections, so please review to the [Simulation][simulation] section first.

### Launch Simulation World  
Three Gazebo environments are prepared, but for creating a map with SLAM, it is recommended to use either **TurtleBot3 World** or **TurtleBot3 House**.  
Use one of the following commands to load the Gazebo environment.  

In this instruction, TurtleBot3 World will be used.  
Please use the proper keyword among `burger`, `waffle`, `waffle_pi` for the `TURTLEBOT3_MODEL` parameter.  
**[Remote PC]**  
```bash
$ export TURTLEBOT3_MODEL=burger
$ roslaunch turtlebot3_gazebo turtlebot3_world.launch
```

<details>
<summary>
![](/assets/images/icon_unfold.png) Read more about **How to load TurtleBot3 House**
</summary>
```bash
$ export TURTLEBOT3_MODEL=burger
$ roslaunch turtlebot3_gazebo turtlebot3_house.launch
```
</details>

### Run SLAM Node  
Open a new terminal from Remote PC with `Ctrl` + `Alt` + `T` and run the SLAM node. Gmapping SLAM method is used by default.  
Please use the proper keyword among `burger`, `waffle`, `waffle_pi` for the `TURTLEBOT3_MODEL` parameter.  
**[Remote PC]**  
```bash
$ export TURTLEBOT3_MODEL=burger
$ roslaunch turtlebot3_slam turtlebot3_slam.launch slam_methods:=gmapping
```

### Run Teleoperation Node  
Open a new terminal from Remote PC with `Ctrl` + `Alt` + `T` and run the teleoperation node from the Remote PC.  
Please use the proper keyword among `burger`, `waffle`, `waffle_pi` for the `TURTLEBOT3_MODEL` parameter.  
**[Remote PC]**  
```bash
$ export TURTLEBOT3_MODEL=burger
$ roslaunch turtlebot3_teleop turtlebot3_teleop_key.launch

 Control Your TurtleBot3!
 ---------------------------
 Moving around:
        w
   a    s    d
        x

 w/x : increase/decrease linear velocity
 a/d : increase/decrease angular velocity
 space key, s : force stop

 CTRL-C to quit
```

### Save Map
When the map is created successfully, open a new terminal from Remote PC with `Ctrl` + `Alt` + `T` and save the map.

![](/assets/images/platform/turtlebot3/simulation/virtual_slam.png)  
**[Remote PC]**  
```bash
$ rosrun map_server map_saver -f ~/map
```

![](/assets/images/platform/turtlebot3/simulation/map.png)

> The saved map.pgm file

[slam]: /docs/en/platform/turtlebot3/slam/#slam
[simulation]: /docs/en/platform/turtlebot3/simulation/
