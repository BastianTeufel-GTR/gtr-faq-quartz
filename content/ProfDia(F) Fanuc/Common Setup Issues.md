---
title: Common Setup Issues
draft: false
tags:
---

# Collection of Issues while running the ProfDia setup


### Q: I get the Error on successive palpations

This means that while touching on the **same** spot on the mandrel for 3 times, the deviation from probing to probing is **>3µm**

A:
- Check conductivity of mandrel
- check for impurities on the mandrel (grease, fat) -> clean it
- Check conductivity of chuck relative to machine table
- probe on a different place on the mandrel by rotating the mandrel a few degrees

### Q: The wire does not start probing the mandrel, it moves to the opposite direction or directly to the circumference of the mandrel

A: The Parameter "Ignore G70, G71, G72" is not properly set. Please check the [[Prerequisites]]


### Q: I have issues with the conductivity

A:

Normally the setup can be run in Dry-Run mode. On some machines better results can be achieved:
- when wirefeed is enabled
- when water flows along the wire
- when water is inside the tank

If this does not help:
- check the resistance value of the mandrel relative to the machine table
- check the resistance value of the rotation axis relative to the machine table
- check any parts concerned like chuck, collet, ...