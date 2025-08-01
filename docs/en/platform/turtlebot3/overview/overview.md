---
layout: archive
lang: en
ref: turtlebot3_overview
read_time: true
share: true
author_profile: false
permalink: /docs/en/platform/turtlebot3/overview/
sidebar:
  title: TurtleBot3
  nav: "turtlebot3"
product_group: turtlebot3
page_number: 1
---

<style>body {counter-reset: h1 0 !important;}</style>

{::options parse_block_html="true" /}

# [Overview](#overview)

**Notice**: With the formation of the Platform Team in 2025, substantial resources will be dedicated to advancing the open platform. As a priority, **TurtleBot3** will receive full support for ROS 2 Humble, with **comprehensive example implementations** set for release in Q1 2025. In Q2, support will expand to **ROS 2 Jazzy** and **Gazebo Sim**, ensuring seamless integration with the latest advancements in the ROS ecosystem and simulation environments.
{: .notice--danger}

![](/assets/images/platform/turtlebot3/overview/overview/turtlebot3_with_logo.png)

{% capture info_00 %}
![](/assets/images/platform/turtlebot3/logo/logo_raspberry_pi.png){: width="30px"} **Rasbperry Pi 4**  
The TurtleBot3 platform has been upgraded to include the `Raspberry Pi 4` as the standard onboard SBC.
{% endcapture %}
<div class="notice--success">{{ info_00 | markdownify }}</div>

{% capture info_01 %}
![](/assets/images/platform/turtlebot3/logo/logo_nvidia.jpg){: width="65px"} **Jetson Nano**  
TurtleBot3 Hardware also supports the use of the Nvidia `Jetson Nano` SBC.  
Please refer to the video below in order to set up a Jetson Nano for use with a TurtleBot3.  
The [Jetson Nano Developer Kit setup](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit) instructions must be completed prior to preparation for TurtleBot3 useage.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fGEq_0aWpoA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{% endcapture %}
<div class="notice--success">{{ info_01 | markdownify }}</div>

**What is TurtleBot?**

[TurtleBot][turtlebot] is a standardized robotic platform developed for [ROS][ros] education and research. The concept of the TurtleBot platform is derived from [Turtle robots](https://en.wikipedia.org/wiki/Turtle_(robot)) used to teach foundational robotics and computer science since the early 1940s. TurtleBot is designed as a simplified, easily upgradable platform to teach people who are new to ROS, and to provide a capable base system for more advanced development. Since it's inception TurtleBot has become the standard educational ROS platform, as well as the most popular robotics platform among developers and students worldwide.

There are 4 versions of the [TurtleBot][turtlebot] available now. TurtleBot1 was developed by Tully (Platform Manager at Open Robotics) and Melonee (CEO of Fetch Robotics) at Willow Garage on top of the iRobot’s Roomba-based research robot, Create, for ROS deployment. It was developed in 2010 and has been on sale since 2011. In 2012, TurtleBot2 was developed by Yujin Robot based on the research robot, iClebo Kobuki. In 2017, TurtleBot3 was developed by ROBOTIS as an improved modular design to supplement the function of its predecessors, and the demands of users. The TurtleBot4, developed by ClearPath Robotics features an iRobot Create3 base as a less modular alternative to the TurtleBot3 platform. For more information on the TurtleBot series, visit [the official TurtleBot Website][history] for a full history of the platform.

The TurtleBot3 in specific is a small, affordable, and customizable, ROS-based mobile robot for use in education, research, hobby projects, and product prototyping. The goal of TurtleBot3 is to provide a low cost, highly flexible robotics development platform without having to sacrifice functionality and quality, while at the same time offering enough expandability to fit a wide variety of complex robotics applications. The TurtleBot3 can be customized in various ways using simple mechanical components and through the use of upgraded electronic components including custom computers and sensors. In addition, the TurtleBot3 has continued to evolve it's out of the box performance by continually upgrading the included cost-effective and small-sized SBC suitable for robust embedded systems. The TurtleBot3’s core technology of [SLAM][slam], [Navigation][navigation] and [Manipulation][manipulation] makes it suitable for a wide variety of research and service robotics applications.

**How to contribute to ROS and TurtleBot?**

<details>
<summary>
![](/assets/images/icon_unfold.png) TurtleBot3 is a collaborative project...
</summary>
TurtleBot3 is a collaborative project between [Open Robotics][open_robotics], [ROBOTIS][robotis], and many more partners including [The Construct][the_construct], [Intel][intel], [Onshape][onshape], [OROCA][oroca], [AuTURBO][auturbo], [ROS in Robotclub Malaysia][ros_in_robotclub_malaysia], [Astana Digital][astana digital], [Polariant Experiment][polariant_experiment], [Tokyo University of Agriculture and Technology, GVlab][gvlab], [Networked Control Robotics Lab at National Chiao Tung University][nctu], [SIM Group at TU Darmstadt][sim_group]. Open Robotics is in charge of software and community activities, while ROBOTIS is in charge of manufacturing and global distribution.

The most important part of the TurtleBot3 collaboration project is the open source based software, hardware, and community around the platform. As such, ROBOTIS is always encouraging more partners and research collaborators to participate in this project to enrich the robotics field as a whole.

If you are interested in partnership with us to continue to further the development of open source robotics, please fill out [this form][partners] to learn more about how we can work together.

- TurtleBot3 Providers  
  ![](/assets/images/platform/turtlebot3/logo/logo_platform_providers.png)

- TurtleBot3 Partners and Research Collaborators  
  ![](/assets/images/platform/turtlebot3/logo/logo_platform_sponsors.png)

  \* Each collaboration member's web page can be found [here][partners].

- TurtleBot3 Distributors  
  ![](/assets/images/platform/turtlebot3/logo/logo_platform_players.png)

  \* Each collaboration member's web page can be found [here][partners].

- TurtleBot3 Map
<div>
<script type="text/javascript" src="https://embed.githubusercontent.com/view/geojson/turtlebot/map/master/Distributors.geojson"></script>
</div>
</details>

## [Notices](#notices)

<details>
<summary>
![](/assets/images/icon_unfold.png) Check out these ROS and TurtleBot3 Publications:
</summary>
- 23/01/2025 Official resumption of TurtleBot3 maintenance and development!
- 09/06/2021 TurtleBot3 has been upgraded with Raspberry Pi 4!!!
- 05/28/2021 [TurtleBot3 Autorace 2020 now runs with ROS Noetic](https://www.youtube.com/playlist?list=PLRG6WP3c31_WsNjwmYID2ulX5g4WcjKbI)
- 05/24/2021 [ROS 2 Galactic Geochelone Release](https://discourse.ros.org/t/ros-2-galactic-geochelone-released/20559)
- 12/20/2020 [Webots supports TurtleBot3 with ROS 2 Foxy](https://discourse.ros.org/t/turtlebot3-and-webots/17880)
- 10/15/2020 [ROS 2 Foxy Release](https://discourse.ros.org/t/new-packages-for-foxy-fitzroy-2020-11-05/17140)
- 08/21/2019 [ROS 2 Dashing Release](https://discourse.ros.org/t/tb3-ros-2-dashing-release/10364)
- 08/20/2019 [Navigation2 Dashing release - demo video](https://discourse.ros.org/t/navigation2-dashing-release-demo-video/10349)
- 02/01/2019 [Announcing new packages for TurtleBot3 in ROS2 (including Cartographer and Navigation2)](https://discourse.ros.org/t/announcing-new-packages-for-turtlebot3-in-ros2-including-cartographer-and-navigation2/7694)
- 12/17/2018 [ros2arduino released: Arduino library for communicating with ROS 2](https://discourse.ros.org/t/ros2arduino-0-0-1-released-arduino-library-for-communicating-with-ros2-dds/7147)
- 09/21/2018 [XEL Network first application + Distributing XEL devices 100 set for free in ROScon2018!](https://discourse.ros.org/t/xel-network-first-application-distributing-xel-devices-100-set-for-free-in-roscon2018/6115)
- 09/13/2018 [Introducing the XEL Network : Modular H/W ecosystem over ROS2](https://discourse.ros.org/t/introducing-the-xel-network-modular-h-w-ecosystem-over-ros2/6050)
- 09/05/2018 [Introducing ROS2 Tutorials](https://discourse.ros.org/t/tb3-introducing-ros2-tutorials/5959)
- 08/08/2018 [Machine Learning tutorial](https://discourse.ros.org/t/tb3-machine-learning-tutorial/5659)
- 08/08/2018 [TurtleBot3 AutoRace in ROS Development Studio](https://discourse.ros.org/t/tb3-turtlebot3-autorace-in-ros-development-studio/5660)
- 08/07/2018 [Tutorial for Task Mission in ROS Development Studio](https://discourse.ros.org/t/tb3-tutorial-for-task-mission-in-ros-development-studio/5651)
- 07/18/2018 [New ROS Online Course for Beginner](https://discourse.ros.org/t/new-ros-online-course-for-beginner/5320)
- 07/03/2018 [TurtleBot3 AutoRace with Gazebo](https://discourse.ros.org/t/tb3-turtlebot3-autorace-with-gazebo/5261)
- 05/25/2018 [Announcing TurtleBot3 Software(v1.0.0) and Firmware(v1.2.0) Update](https://discourse.ros.org/t/announcing-turtlebot3-software-v1-0-0-and-firmware-v1-2-0-update/4888)
- 05/21/2018 [Reinforcement Learning with TB3!](https://discourse.ros.org/t/tb3-reinforcement-learning-with-tb3/4842)
- 05/16/2018 [1 Year of TurtleBot3: Call for Collaboration (by 23 MAY)](https://discourse.ros.org/t/1-year-of-turtlebot3-call-for-collaboration-by-23-may/4792)
- 05/11/2018 [TurtleBot3 with OpenMANIPULATOR is released](https://discourse.ros.org/t/turtlebot3-with-openmanipulator-is-released/4747)
- 04/27/2018 [Awesome TurtleBot3 Projects like BallBot Project](https://discourse.ros.org/t/awesome-turtlebot3-projects-like-ballbot-project/4629)
- 04/20/2018 [TurtleBot3 Automatic Parking under AR detection](https://discourse.ros.org/t/tb3-turtlebot3-automatic-parking-under-ar-detection/4476)
- 03/29/2018 [TurtleBot3 AutoRace 2017 Tutorial & Source Codes released](https://discourse.ros.org/t/tb3-turtlebot3-autorace-2017-tutorial-source-codes-released/4339)
- 03/17/2018 [TurtleBot3 Auto project](https://discourse.ros.org/t/tb3-turtlebot3-auto-project/1402)
- 03/15/2018 [Gazebo Simulation](https://discourse.ros.org/t/tb3-gazebo-simulation/4207)
- 02/19/2018 [Waffle Pi Launching Event!](https://discourse.ros.org/t/tb3-waffle-pi-launching-event/4005)
- 02/08/2018 [ROS Robot Programming, A Handbook is written by TurtleBot3 Developers](http://community.robotsource.org/t/download-the-ros-robot-programming-book-for-free/51/)
- 02/02/2018 [How to use LDS-01 of TurtleBot3](https://discourse.ros.org/t/tb3-how-to-use-lds-01-of-turtlebot3/3862)
- 01/30/2018 [TurtleBot3 Basic operation demo](https://discourse.ros.org/t/tb3-turtlebot3-basic-operation-demo/3840)
- 01/26/2018 [TurtleBot3 projects in KAIST](https://discourse.ros.org/t/turtlebot3-projects-in-kaist/3794)
- 01/18/2018 [TurtleBot3 Software, Firware Update](https://discourse.ros.org/t/turtlebot3-software-and-firmware-update-and-waffle-pi/3729)
- 01/17/2018 [TurtleBot3 Automatic parking demo](https://discourse.ros.org/t/tb3-turtlebot3-automatic-parking-demo/3720)
- 11/07/2017 [ARM TechCon: Best Contribution to an Open-Source Software Project](https://discourse.ros.org/t/arm-techcon-best-contribution-to-an-open-source-software-project/3129)
- 09/20/2017 [TurtleBot3 AutoRace 2017 teaser #2](https://discourse.ros.org/t/tb3-turtlebot3-autorace-2017-teaser-2/2701)
- 09/13/2017 [TurtleBot3 AutoRace 2017 teaser #1](https://discourse.ros.org/t/tb3-turtlebot3-autorace-2017-teaser-1/2626)
- 07/31/2017 [TurtleBot3 Burger Assembly Video](https://discourse.ros.org/t/tb3-turtlebot3-burger-assembly-video/2340)
- 06/07/2017 [TurtleBot3 Follow Demo](https://discourse.ros.org/t/tb3-turtlebot3-follow-demo/1897)
- 05/29/2017 [Exhibition, Party, and Tutorials with TurtleBot3 at ICRA2017](https://discourse.ros.org/t/tb3-exhibition-party-and-tutorials-with-turtlebot3-at-icra2017/1878)
- 05/11/2017 [TurtleBot3 Early-Bird Discount Offer (until May 29)](https://discourse.ros.org/t/tb3-turtlebot3-early-bird-discount-offer-until-may-29/1830)
- 05/08/2017 [Don’t miss FREE TB3 Burger event!](https://discourse.ros.org/t/tb3-dont-miss-free-tb3-burger-event/1809)
- 05/08/2017 [Very informative and detailed review by Erico Guizzo and Evan Ackerman](https://discourse.ros.org/t/tb3-very-informative-and-detailed-review-by-erico-guizzo-and-evan-ackerman/1808)
- 04/24/2017 [TurtleBot3 Friends](https://discourse.ros.org/t/tb3-turtlebot3-friends/1717)
- 04/12/2017 [TurtleBot3 with Laser Distance Sensor (LDS)](https://discourse.ros.org/t/tb3-turtlebot3-with-laser-distance-sensor-lds/1644)
- 04/05/2017 [Gazebo simulator](https://discourse.ros.org/t/tb3-gazebo-simulator/1608)
- 03/21/2017 [TurtleBot3 official wiki site (technical information)](https://discourse.ros.org/t/tb3-turtlebot3-official-wiki-site-technical-information/1536)
- 03/15/2017 [TurtleBot3 with OpenCR](https://discourse.ros.org/t/tb3-turtlebot3-with-opencr/1488)
- 03/08/2017 [TurtleBot3 Hardware: Free for YOU!](https://discourse.ros.org/t/tb3-turtlebot3-hardware-free-for-you/1444)
- 03/01/2017 [TurtleBot3 Auto project](https://discourse.ros.org/t/tb3-turtlebot3-auto-project/1402)
- 02/21/2017 [TurtleBot3 RoadTrain](https://discourse.ros.org/t/tb3-turtlebot3-roadtrain/1364)
- 02/01/2017 [TurtleBot3 Segway](https://discourse.ros.org/t/tb3-turtlebot3-segway/1247)
- 01/25/2017 [Assembling the TurtleBot3](https://discourse.ros.org/t/tb3-assembling-the-turtlebot3/1208)
- 01/17/2017 [TurtleBot3 Tank](https://discourse.ros.org/t/tb3-turtlebot3-tank/1169)
- 12/28/2016 [TurtleBot3 Omni wheel and Mecanum wheel Example](https://discourse.ros.org/t/tb3-turtlebot3-omni-wheel-and-mecanum-wheel-example/1028)
- 12/23/2016 [TurtleBot3 Autonomous Car](https://discourse.ros.org/t/tb3-turtlebot3-autonomous-car/1011)
- 12/21/2016 [The TurtleBot3 - The Journey of the Turtlebot with R2D2](https://discourse.ros.org/t/tb3-the-turtlebot3-the-journey-of-the-turtlebot-with-r2d2/998)
- 12/13/2016 [The TurtleBot3 Example #10 The Journey of the Turtlebot](https://discourse.ros.org/t/tb3-the-turtlebot3-example-10-the-journey-of-the-turtlebot/965)
- 12/05/2016 [SLAM with the TurtleBot3](https://discourse.ros.org/t/tb3-slam-with-the-turtlebot3/927)
- 11/23/2016 [The TurtleBot3 Teleoperation Example](https://discourse.ros.org/t/tb3-the-turtlebot3-teleoperation-example/865)
- 11/21/2016 [The TurtleBot3 Example #01 Parallel Translation with 4 Joints and 4 Wheels](https://discourse.ros.org/t/tb3-the-turtlebot3-example-01-parallel-translation-with-4-joints-and-4-wheels/838)
- 11/16/2016 [Payload Test of TurtleBot3](https://discourse.ros.org/t/tb3-payload-test-of-turtlebot3/827)
- 10/13/2016 [Announcing TurtleBot3](https://discourse.ros.org/t/announcing-turtlebot3/623)
</details>

<details>
<summary>
![](/assets/images/icon_unfold.png) Click to expand recent news.
</summary>
- 11/12/2020 [ROS World 2020: ROBOTIS TurtleBot3 Parallel Session](https://vimeo.com/480460365)
- 07/22/2019 [Top 10 ROS-based robotics companies in 2019, The Robot Report
  ](https://www.therobotreport.com/top-10-ros-based-robotics-companies-2019/)
- 12/10/2018 [Robot Gift Guide 2018, IEEE Spectrum](https://spectrum.ieee.org/automaton/robotics/home-robots/robot-gift-guide-2018)
- 11/26/2018 [AWS RoboMaker – Develop, Test, Deploy, and Manage Intelligent Robotics Apps, AWS News Blog](https://aws.amazon.com/blogs/aws/aws-robomaker-develop-test-deploy-and-manage-intelligent-robotics-apps/)
- 10/01/2018 [Microsoft Announces Experimental Release of ROS for Windows 10, IEEE Spectrum](https://spectrum.ieee.org/automaton/robotics/robotics-software/microsoft-announces-experimental-release-of-ros-for-windows-10)
- 09/29/2018 "XEL Network : modular H/W ecosystem using ROS2" on ROSCon2018, [PDF](https://roscon.ros.org/2018/presentations/ROSCon2018_Lightning1_11.pdf), [Video](https://vimeo.com/292710106)
- 09/14/2018 "Introduction of Open Robot Platform: mobile robot, manipulator, humanoid, hand" on ROSCon JP 2018, [PDF](https://roscon.ros.org/jp/2018/presentations/ROSCon_JP_2018_presentation_4.pdf), [Video](https://vimeo.com/292071289)
- 07/06/2018 [Video Friday: Roboy, AI Ethics, and Big Clapper](https://spectrum.ieee.org/automaton/robotics/robotics-hardware/video-friday-roboy-ai-ethics-big-clapper)
- 02/02/2018 [Video Friday: Waffle Robots, Laser vs. Drone, and TurtleBot Tutorials, IEEE Spectrum](https://spectrum.ieee.org/automaton/robotics/robotics-hardware/video-friday-waffle-robots-laser-vs-drone-turtlebot-tutorials)
- 11/30/2017 [Robot Gift Guide 2017, IEEE Spectrum](https://spectrum.ieee.org/automaton/robotics/home-robots/robot-gift-guide-2017)
- 11/07/2017 [10 Memorable ROS-based Robots, Robotics Trends](http://roboticstrends.com/article/10_memorable_ros_based_robots)
- 11/07/2017 [TurtleBot 3 and Friends: A Lower Barrier of Entry for Exploring A.I. Robotics, ThomasNet](https://news.thomasnet.com/fullstory/40007572)
- 10/24/2017 [Announcing the Arm TechCon Innovation Award Finalists, arm TechCon](http://www.armtechcon.com/announcing-the-arm-techcon-innovation-award-finalists/)
- 10/13/2017 [Top 10 Open Source Linux Robots, Linux.com](https://www.linux.com/blog/2017/10/top-10-open-source-linux-robots)
- 09/22/2017 "TurtleBot3 AutoRace" on ROSCon2017, [PDF](https://roscon.ros.org/2017/presentations/ROSCon%202017%20Lightning%20211.pdf), [Video](https://vimeo.com/236177042#t=1760s)
- 09/21/2017 "Introducing OpenMANIPULATOR; the full open robot platform" on ROSCon2017, [PDF](https://roscon.ros.org/2017/presentations/ROSCon%202017%20OpenManipulator.pdf), [Video](https://vimeo.com/236147296)
- 07/16/2017 [The TurtleBot3 Teacher: Learn the ROS platform with this robot kit, IEEE Spectrum](https://spectrum.ieee.org/geek-life/hands-on/the-turtlebot3-teacher)
- 06/16/2017 [Turtlebot3, the Open Source Ubuntu/ROS-Based Robot Kit, Open Electronics](https://www.open-electronics.org/turtlebot3-the-open-source-ubunturos-based-robot-kit/)
- 06/14/2017 [Open Source TurtleBot 3 Robot Kit Runs Ubuntu and ROS on Raspberry Pi, Linux.com](https://www.linux.com/news/event/open-source-summit-na/2017/6/open-source-turtlebot-3-robot-kit-runs-ubuntu-and-ros-raspberry-pi)
- 06/09/2017 [Ubuntu-driven TurtleBot gets a major rev with a Pi or Joule in the driver’s seat, LinuxGizmos.com](http://linuxgizmos.com/ubuntu-driven-turtlebot-gets-a-major-rev-with-a-pi-or-joule-in-the-drivers-seat/)
- 05/31/2017 [The Turtlebot 3 has launched, Ubuntu](https://insights.ubuntu.com/2017/05/31/the-turtlebot-3-has-launched/)
- 05/29/2017 [All the Latest, Most Exciting Robotics Research From ICRA 2017, IEEE Spectrum](http://spectrum.ieee.org/automaton/robotics/robotics-software/all-the-latest-most-exciting-robotics-research-from-icra-2017)
- 05/17/2017 [The Silicon Valley Startup Creating Robot DNA, Bloomberg](https://www.bloomberg.com/news/videos/2017-05-17/the-silicon-valley-startup-creating-robot-dna-video)
- 05/02/2017 [Hands-on With TurtleBot 3, a Powerful Little Robot for Learning ROS, IEEE Spectrum](http://spectrum.ieee.org/automaton/robotics/robotics-hardware/review-robotis-turtlebot-3)
- 12/28/2016 [Celebrating 9 Years of ROS, ROBOHUB](http://robohub.org/celebrating-9-years-of-ros/)
- 10/13/2016 [Advances in robotics made easier by forthcoming 3D printed TurtleBot, 3D Printing Industry](https://3dprintingindustry.com/news/advances-robotics-made-easier-forthcoming-3d-printed-turtlebot-96844/)
- 10/12/2016 [Robotis and OSRF Announce TurtleBot 3: Smaller, Cheaper, and Modular, IEEE Spectrum](http://spectrum.ieee.org/automaton/robotics/diy/robotis-and-osrf-announce-turtlebot-3-smaller-cheaper-and-modular)
- 09/21/2016 "Introducing the Turtlebot3" on ROSCon2016, [PDF](http://roscon.ros.org/2016/presentations/ROSCon2016_Turtlebot3_ROBOTIS.pdf), [Video](https://vimeo.com/187699447)
- 03/26/2013 [TurtleBot Inventors Tell Us Everything About the Robot, IEEE Spectrum](http://spectrum.ieee.org/automaton/robotics/diy/interview-turtlebot-inventors-tell-us-everything-about-the-robot)
</details>

[turtlebot]: https://www.turtlebot.com/
[ros]: http://www.ros.org/about-ros/
[logo]: http://el.media.mit.edu/logo-foundation/index.html
[turtlesim]: http://wiki.ros.org/turtlesim
[logo_primer]: http://el.media.mit.edu/logo-foundation/what_is_logo/logo_primer.html
[tuturtle]: http://wiki.ros.org/tuturtle
[dynamixel]: http://en.robotis.com/subindex/dxl_en.php
[history]: https://www.turtlebot.com/about/
[slam]: https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping
[navigation]: https://en.wikipedia.org/wiki/Robot_navigation
[manipulation]: https://en.wikipedia.org/wiki/Robotic_manipulation
[openmanipulator]: http://emanual.robotis.com/docs/en/platform/openmanipulator/

[open_robotics]: https://www.openrobotics.org/
[robotis]: http://www.robotis.com/
[the_construct]: http://www.theconstructsim.com/
[intel]: http://www.intel.com/
[onshape]: https://www.onshape.com/
[oroca]: http://www.oroca.org/
[auturbo]: https://github.com/AuTURBO/
[ros_in_robotclub_malaysia]: https://www.youtube.com/channel/UCLvvXbwPkostryBQt4MIbUw
[astana digital]: https://www.youtube.com/channel/UCWiIY_zrKH-LMlx2GBWu3yA
[polariant_experiment]: https://www.polariant.io/
[gvlab]: http://web.tuat.ac.jp/~gvlab/
[nctu]: https://sites.google.com/a/g2.nctu.edu.tw/ncrl/
[sim_group]: https://www.sim.informatik.tu-darmstadt.de/en/index/
[partners]: https://www.turtlebot.com/partners
