---
layout: archive
lang: en
ref: msgs_op3_JointOffsetPositionData_msg
read_time: true
share: true
author_profile: false
permalink: /docs/en/platform/msgs/op3_JointOffsetPositionData_msg/
sidebar:
  title: MSGS
  nav: "msgs"
---

# [op3_JointOffsetPositionData_msg](#op3-jointoffsetpositiondata-msg)

- File: `op3_offset_tuner_msgs/JointOffsetPositionData.msg`

- Message Definition
    ```c
    string    joint_name
    float64   goal_value
    float64   offset_value
    float64   present_value
    int32     p_gain
    int32     i_gain
    int32     d_gain
    ```

- Description  
This message is used when creating [GetPresentJointOffsetData.srv]{: .popup}.  

    * `string  joint_name`  
&emsp;&emsp; joint name  

    * `float64 goal_value`  
&emsp;&emsp; Joint position for Offset Tuning(Unit in rad)  

    * `float64 offset_value`  
&emsp;&emsp; Offset(Unit in rad)  

    * `float64   present_value`  
&emsp;&emsp; Current position of the joint  

    * `int32   p_gain`  
&emsp;&emsp; P Gain of the joint Position  

    * `int32   i_gain`  
&emsp;&emsp; I Gain of the joint Position(Not used)  

    * `int32   d_gain`  
&emsp;&emsp; D Gain of the joint Position(Not used)  


[GetPresentJointOffsetData.srv]: /docs/en/popup/op3_GetPresentJointOffsetData.srv/
