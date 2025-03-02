---
layout: archive
lang: en
ref: cpp_groupsyncread
read_time: true
share: true
author_profile: false
permalink: /docs/en/software/dynamixel/dynamixel_sdk/api_reference/cpp/cpp_groupsyncread/
sidebar:
  title: DYNAMIXEL SDK
  nav: "dynamixel_sdk"
---

<style>body {counter-reset: h1 6 !important;}</style>
<div style="counter-reset: h2 2"></div>
<div style="counter-reset: h3 8"></div>

<!--[dummy Header 1]>
  <h1 id="api-reference"><a href="#api-reference">API Reference</a></h1>
  <h2 id="cpp"><a href="#cpp">CPP</a></h2>
<![end dummy Header 1]-->

### [CPP GroupSyncRead](#cpp-groupsyncread)

- Description

  Base class for simultaneous dynamixel control on reading.

- Members

  None


- Methods

| Methods                         | Description                                                |
|:--------------------------------|:-----------------------------------------------------------|
| GroupSyncRead                   | Initializes groupSyncRead instance                         |
| ~GroupSyncRead                  | Clears parameter storage                                   |
| getPortHandler                  | Returns PortHandler instance                               |
| getPacketHandler                | Returns PacketHandler instance                             |
| **[addParam](#addparam)**       | Adds parameter storage for read                            |
| **[removeParam](#removeparam)** | Removes parameter on the storage                           |
| **[clearParam](#clearparam)**   | Clears parameter storage                                   |
| **[txPacket](#txpacket)**       | Transmits packet to the number of DYNAMIXEL's               |
| **[rxPacket](#rxpacket)**       | receives packet from the number of DYNAMIXEL's              |
| **[txRxPacket](#txrxpacket)**   | Transmits and receives packet on the number of DYNAMIXEL's  |
| **[isAvailable](#isavailable)** | Checks whether there is available data in the data storage |
| **[getData](#getdata)**         | Gets data from received packet                             |


- Enumerator

  None

#### Method References

##### addParam
- Syntax
``` cpp
bool addParam(UINT8_T id)
```
- Parameters

| Parameters | Description  |
|:-----------|:-------------|
| id         | DYNAMIXEL ID |

- Detailed Description

   This function pushes id to the DYNAMIXEL ID list, and initializes the parameter storage. It returns false when the class uses Protocol 1.0 or target ID exists already in the ID list, or returns true.


##### removeParam
- Syntax
``` cpp
void removeParam(UINT8_T id)
```
- Parameters

| Parameters | Description  |
|:-----------|:-------------|
| id         | DYNAMIXEL ID |

- Detailed Description

   This function removes target id in the DYNAMIXEL ID list. It returns false when the class uses Protocol 1.0 or target ID does not exists in the ID list, or returns true.


##### clearParam
- Syntax
``` cpp
void clearParam()
```
- Parameters

   None

- Detailed Description

   This function clears the DYNAMIXEL ID list. It returns false when the class uses Protocol 1.0, or returns true.


##### txPacket
- Syntax
``` cpp
int txPacket()
```
- Parameters

   None

- Detailed Description

   This function transmits the packet by using `syncReadTx()` function. It returns `COMM_NOT_AVAILABLE` when the class uses Protocol 1.0, or returns communication result.


##### rxPacket
- Syntax
``` cpp
int rxPacket()
```
- Parameters

   None

- Detailed Description

   This function receives the packet by using `readRx()` function. It returns `COMM_NOT_AVAILABLE` when the class uses Protocol 1.0 or there is no packet that had been received, or returns communication result.


##### txRxPacket
- Syntax
``` cpp
int txRxPacket()
```
- Parameters

   None

- Detailed Description

   This function transmits and receives the packet by using `txPacket()` function and `rxPacket()` function. It returns `COMM_NOT_AVAILABLE` when the class uses Protocol 1.0 or the packet transmission had not succeeded, or returns communication result.

##### isAvailable
- Syntax
``` cpp
bool isAvailable(uint8_t id, uint16_t address, uint16_t data_length)
```
- Parameters

| Parameters | Description                               |
|:-----------|:------------------------------------------|
| id         | DYNAMIXEL ID                              |
| address    | Address on the control table of DYNAMIXEL |
| data       | Packet data                               |


- Detailed Description

   This function checks whether there is available data in the data storage. It returns false when used Protocol is 1.0 version or there is no data from target address, or returns true.

##### getData
- Syntax
``` cpp
uint32_t getData(UINT8_T id, UINT16_T address, UINT16_T data_length)
```
- Parameters

| Parameters  | Description                               |
|:------------|:------------------------------------------|
| id          | DYNAMIXEL ID                              |
| address     | Address on the control table of DYNAMIXEL |
| data length | Data length                               |


- Detailed Description

   This function gets specific data from received packet. It returns value.
