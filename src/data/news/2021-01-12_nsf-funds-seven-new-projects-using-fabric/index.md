---
path: /news/2021-01-12_nsf-funds-seven-new-projects-using-fabric
date: 2021-01-15
title: "NSF Funds Seven New Campus Cyberinfrastructure Projects Using FABRIC"
subtitle: ""
tags: ["NSF", "CC*", "FABRIC Profiles"]
seo:
  title: "NSF Funds Seven New Campus Cyberinfrastructure Projects Using FABRIC"
  description: "We are excited to announce that we will be working with seven recent Campus Cyberinfrastructure (CC&ast;) solicitation awardees as they use FABRIC to perform experimental deployment, protocol testing, and evaluation."
  keywords: []
---

The NSF Campus Cyberinfrastructure (CC&ast;) program invests in coordinated campus-level networking and cyberinfrastructure improvements, innovation, integration, and engineering for science applications and distributed research projects. We are excited to be working with seven awardees from this [CC&ast; solicitation](https://www.nsf.gov/pubs/2020/nsf20507/nsf20507.htm) (NSF 20-507) as they use FABRIC to perform experimental deployment, protocol testing, and evaluation. Learn more about each project below: 

**CC&ast; Integration-Large: Q-Factor: A Framework to Enable Ultra High-Speed Data Transfer Optimization based on Real-Time Network State Information provided by Programmable Data Planes**

_PI: Jeronimo Bezerra_ | Florida International University | [Award Abstract](https://nsf.gov/awardsearch/showAward?AWD_ID=2018754) | [Project Overview Slides](https://drive.google.com/file/d/1-9kQHFDdC6qAOecBFS3rcDhJfo_AfQ7Y/view?usp=sharing)

Communication networks are critical components of today’s scientific workflows. Researchers require long-distance, ultra high-speed networks to transfer huge data from acquisition sites (such as Vera C. Rubin Observatory, also known as the Large Synoptic Survey Telescope in Chile) to processing sites, and to share measurements with scientists worldwide. However, while network bandwidth is continuously increasing, the majority of data transfers are unable to efficiently utilize the added capacity due to inherent limitations of parameter settings of the network transport protocols and the lack of network state information at the end hosts. To address these challenges, Q-Factor plans to use temporal network state data to dynamically configure current transport protocol parameters to reach higher network utilization and, as a result, to improve scientific workflows.

**CC&ast; Integration-Small: Science Traffic as a Service (STAAS)**

_PI: Jack Brassil_ | Princeton University | [Award Abstract](https://nsf.gov/awardsearch/showAward?AWD_ID=2018308) | [Project Overview Slides](https://drive.google.com/file/d/1hGI50J5udEzgsN80NMmDqZPYWHR3oTdo/view?usp=sharing)

Science Traffic as a Service (STAAS) is a decentralized system to collect, create and distribute a diverse collection of real and synthetic science network traffic to the experimental research infrastructure user community. Available on-demand to experimenters through a publish-subscribe dashboard, the tool will elevate traffic selection and distribution to a first class experimental instrumentation resource. 

The STAAS team is developing a cooperative, scalable, infrastructure-agnostic end system traffic generation service. They will deploy the system first on the Network Programming Initiative testbed reaching from Princeton to Cornell, and then ready STAAS for later deployment on the FABRIC research infrastructure. Their key insight is that plenty of science flows are already in transit at any moment, either on campus or crossing the campus border. They plan to tap these available active science flows and process each for forwarding onto the experimental testbed, while preserving both the timing integrity of the flows and the data privacy of their headers and payloads. To do this safely, science traffic will flow only when offered by an originating campus and requested by the experimenter. By introducing a service model, STAAS hopes to help advance the networking research community’s understanding of emerging science traffic and to help the operators of scientific instruments improve the efficiency of global data distribution.

**CC&ast; Integration-Small: Integrating Application Agnostic Learning with FABRIC for Enabling Realistic High-Fidelity Traffic Generation and Modeling**

_PI: Deniz Gurkan_ | University of Houston | [Award Abstract](https://nsf.gov/awardsearch/showAward?AWD_ID=2018472) | [Project Overview Slides](https://drive.google.com/file/d/1-5WwuQeSCS1aVUnfuGTvYoZkk4BcN1xI/view?usp=sharing)

Novel approaches to networking and application development require high-fidelity testing and evaluation supported by realistic network usage scenarios. This project will provide researchers the means to easily utilize the capabilities of the FABRIC testbed through a suite of new tools - smoothing the transition of existing experiments to the testbed and enabling exciting new areas of research through three systems facilitating end to end traffic modeling and generation in the FABRIC environment. A model repository will be created for the storage and access of custom models by experimenters and will be seeded with stock models of some popular applications for immediate use. The use of the models within FABRIC-hosted experiments will be advanced through a bespoke matching system that will align experiment resources with model requirements. Finally, for experiments developing novel applications, a tool will be provided for creating new models using data captured with FABRIC infrastructure components.

**CC&ast; Integration-Large: SciStream: Architecture and Toolkit for Data Streaming between Federated Science Instruments**

_PI: Rajkumar Kettimuthu_ | University of Chicago | [Award Abstract](https://nsf.gov/awardsearch/showAward?AWD_ID=2019073) | [Project Overview Slides](https://drive.google.com/file/d/1-7zy2B5azhUzVqI4qmrmwZ8b6xTv0bpG/view?usp=sharing)

Scientific instruments are capable of generating data at very high speeds. However, with traditional file-based data movement and analysis methods, data are often processed at a much lower speed, leading to either operating the instruments at a lower speed or discarding a portion of the data without processing it. To address this issue, the SciStream project will develop software tools to stream data at very high speeds from scientific instruments to supercomputers at a distant location. Through a set of gateway nodes optimized for wide area memory-to-memory transfers at the perimeter of the campus network, SciStream establishes necessary bridging between source and destination. SciStream hides the complexities in network connections from the end user and provides a high level of security for all the network connections. Key design choices such as application-agnostic streaming and support for best-effort streaming will make SciStream appealing to a broader science community.

**CC&ast; Integration-Small: Error Free File Transfer for Big Science**

_PI: Craig Patridge_ | Colorado State University | [Award Abstract](https://nsf.gov/awardsearch/showAward?AWD_ID=2019163) | [Project Overview Slides](https://drive.google.com/file/d/1JvED186R8fLfoGPguC99tDBsEDPIQpro/view?usp=sharing)

This project will improve the Internet's ability to support big data transfers, both for science and commerce, for decades to come. Scientific data transfers have gotten so large that previously rare transmission errors in the Internet are causing some scientific data transfers to be corrupted. The Internet's error checking mechanisms were designed at a time when a megabyte was a large file. Now files can contain terabytes. The old error checking mechanisms are in danger of being overwhelmed. This project seeks to find new error checking mechanisms for the Internet to safely move tomorrow's scientific data efficiently and without errors by addressing two fundamental issues. 

First, the Internet's checksums and message digests are too small (32-bits) and probably are poorly tuned to today's error patterns. The first step in this project is to collect information about the kinds of transmission errors currently happening in the Internet for a comprehensive study. Second, today's file transfer protocols, if they find a file has been corrupted in transit, simply discard the file and transfer it again. Rather, the file transfer protocol should seek to repair the corrupted parts of the file. As the project collects data about errors, it will also design a new file transfer protocol that can incrementally verify and repair files.

**CC&ast; Integration-Large: N-DISE: NDN for Data Intensive Science Experiments**

_PI: Edmund Yeh_ | Northeastern University | [Award Abstract](https://nsf.gov/awardsearch/showAward?AWD_ID=2019012) | [Project Overview Slides](https://drive.google.com/file/d/1-Au9Nj4bfddyDmshOzwKhqD38rKo374H/view?usp=sharing)

The project, N-DISE (Named Data Networking for Data Intensive Science Experiments), aims to accelerate the pace of breakthroughs and innovations in data-intensive science fields such as the Large Hadron Collider (LHC) high energy physics program and the BioGenome and human genome projects. Based on Named Data Networking (NDN), a data-centric architecture, N-DISE will deploy and commission a highly efficient and field-tested petascale data distribution, caching, access and analysis system serving major science programs.

The N-DISE project will design and develop high-throughput caching and forwarding methods, containerization techniques, hierarchical memory management subsystems, congestion control mechanisms, integrated with Field Programmable Gate Arrays (FPGA) acceleration subsystems, to produce a system capable of delivering LHC and genomic data over a wide area network at throughputs approaching 100 Gbits per second, while significantly decreasing download time. In addition, N-DISE will utilize NDN's built-in data security support to ensure data integrity and provenance tracing. N-DISE will leverage existing infrastructure and build an enhanced testbed with four additional high performance NDN data cache servers at participating institutions.

**CC&ast; Integration-Large: An 'On-the-fly' Deeply Programmable End-to-End Network-Centric Platform for Edge-to-Core Workflows**

_PI: Michael Zink_ | University of Massachusetts Amherst | [Award Abstract](https://nsf.gov/awardsearch/showAward?AWD_ID=2018074) | [Project Overview Slides](https://drive.google.com/file/d/1-6mhtdvuk8WXNWACNyxs_tJYW5_uZ_cd/view?usp=sharing)

Unmanned Aerial Vehicles (also known as drones) are becoming popular in the sky. Their application reaches from hobby drones for leisurely activities to life-critical drones for organ transport to commercial applications such as air taxis. The safe, efficient, and economic operation of such drones poses a variety of challenges that have to be addressed by the science community. For example, drones need very detailed, close to the ground weather information for safe operations, and data processing and energy consumption of drones need to be intelligently handled. This project will provide tools that will allow researchers and drone application developers to address operational drone challenges by using advanced computer and network technologies.

This project will provide an architecture and tools that will enable scientists to include edge computing devices in their computational workflows. This capability is critical for low latency and ultra-low latency applications like drone video analytics and route planning for drones. The proposed work will include four major tasks. First, cutting edge network and compute infrastructure will be integrated into the overall architecture to make them available as part of scientific workflows. Second, in-network processing at the network edge and core will be made available through new programming abstractions. Third, enhanced end-to-end monitoring capabilities will be offered. Finally, the architecture will leverage the Pegasus Workflow Management System to integrate in-network and edge processing capabilities.


**Do you have a project idea that would benefit from using FABRIC? We are interested in working with you. Apply for a Campus Cyberinfrastructure (CC&ast;) grant - the [solicitation's](https://www.nsf.gov/pubs/2021/nsf21528/nsf21528.htm) next deadline is March 1, 2021.**
