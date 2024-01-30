---
dg-publish: true
---
## Pendulum grinding / eroding

### Setup

To enable the pendulum grinding / eroding option in ProfDie the following values have to be added to `PPFanuc.INI` file.


````ini
[Parameter]
; Technologie-Register-Bereich, der für das Pendelschleifen der Rundschlifffase benutzt wird
; In Technologiebearbeitungsfolge müssen diese Register wie unten angegeben verwendet werden
;
; Technology register range for technologies used for pendulum grinding of round grinding chamfer
; These technologies have to be added to the ProfDia technology for pendulum grinding
Pendelschleif_regnr_anf=199
Pendelschleif_regnr_end=202

; Schrittweite/Intervall für Pendelbewegung entlang der Kontur
;
; width for one pendulum movement along the profile
Schrittlaenge=0.05

; Fasenhöhe für Überschwenken an Plattenoberseite
;
; chamfer height for swinging over at top of plate
Fasenueberlaufoben=0.2
; 
; Fasenhöhe für Berechnung des Schwenkwinkels an der Fase
;
; chamfer height for calculating the swivel angle at the chamfer 
Fasenbreiteunten=0.8

````
The technology registers need to be added to a technology inside ProfDia

![[round_grind_pendulum_tech.png]]

> [!note] 
> It's important to have a constant feedrate along the profile


### Create Program in ProfDia - Step 1

First the diameter offset needs to be determined using a CAD system.

![[round_grind_construct.png]]

| Parameter | Value |
| --- | --- |
| Tool Radius | R=10mm |
| Height for Chamfer | 0.4mm |
| Radial Relief Angle|  20° |

The 20° radial relief angle are drawn below the 0.4mm chamfer area on the fly circle.
The relief surface is tangentialy extended to the PCD surface.

The calculated **radius offset** for this tool example is 0.138mm => 0.276mm diameter offset

Highlighted in `green` is the surface which will be removed by the selected round grinding approach

### Create Program in ProfDia - Step 2

Create the cutting profile as needed on regular radius (in example radius 10mm)

![[round_grind_profile_r10.png]]

### Create Program in ProfDia - Step 3

- Add a new project to ProfDia and import the drawing

- Add the cutting profile as main profile for probing and cutting with the desired radial relief angle

![[round_grind_pendulum_cut_ps.png]]

- Open `Enter additional parameters`

![[round_grind_cut_ps_add_para.png]]

- set the diamter offset to the previously calculated value (here 0.276mm)

> [!note] 
> When a value > 0.2mm can not be entered, the limit for fine adjustment has to be increased in `IMCSDIA.INI` file. Set the value to 0.5 or higher
>  ```ini
>  [Parameter]
>  Offset_Feinkorrektur_limit=0.5
>  ```

- Add the profile for round grinding

![[round_grind_pendulum_ps.png]]

- No diameter offset
- No relief angles
- Save the profile

Back in Profile Section Management:

- Make the **RoundGrinding** profile a sub profile of the **cutting edge** profile
- Disable measuring for the **RoundGrinding** profile

![[round_grind_psm.png]]

Now measure and cut the tool as usual.

### Caveats for Pendulum Grinding / Eroding approach

- Machining of a round grinding chamfer using the pendulum grinding / eroding methods could be time consuming. For smaller tool batches this is a good option. When it comes to optimization of machining times a special machine for machining round grinding chamfers should be considered to be used
- The machine needs to be very well prepared
- Technologies need to be adjusted and tested prior to receive good results

