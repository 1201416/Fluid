# Glossary
For a better comprehension of the problem, a glossary is intended to solve the problems in comprehension of the problem

- Azure Fluid Relay: built-in Fluid server functionality, with cloud-native storage for the information of each DDS.
- Board: a operating table that can have many entries. These entries may be created and updated by any user who can access them.
- Container: describes the Fluid objects available.
- Distributed Data Structure (DDS): singular of DDSes. It is not a local object, although behaves like a local data structure. These may be used as key-value data, hierarchical data, strings, specialized data structures and consensus data structures.
- Fluid Framework: collection of client librares for distributing and synchronizing shared state. Multiple clients may create and update shared data strtuctures.
- SharedMap: DDS to store key-value data used in the project. Acts as a traditional map, but ensures any edits are communicated between clients. 