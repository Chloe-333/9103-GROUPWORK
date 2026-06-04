# 9103-GROUPWORK
# Final Project Pitch
README.md: Your repository must include a well-formatted README.md file containing:

Inspiration: What inspired your team's project? This might include artworks, websites, games, concepts, or specific aspects of the source material. Explain briefly how these inspirations shaped your approach.)
Techniques: What p5.js techniques were implemented in the project and why? Give a short overview of how your code works and the key decisions your team made.
Mechanic ownership: Which team member was responsible for which mechanic, and a brief description of what each mechanic does.)
AI acknowledgement: If you used ChatGPT, Claude, DeepSeek, or any other AI tool to help generate code, you must reference it here and explain what it was used for and how the generated code works. This must also be commented in the actual code (e.g. // this code was generated with the help of ChatGPT and does xyz).
External references: If you borrowed or were influenced by code found online, in a book, or from any other source, reference it with a link and an explanation. This must also be commented in the code (e.g. // this technique is from www.source-url.com).
Interaction instructions: How does someone experience your work? E.g., "move the mouse slowly over the screen," "click play and wait for audio to start," "use arrow keys to move."
## Inspirations
- **Links**
    - *Link 1* 
[Inspiration link1](https://www.tiktok.com/@gaabz.drop/video/7637272522060287239?q=Jarvis&t=1778729950655)
    - *Link 2*
[Inspiration link2](https://www.tiktok.com/@projecthailmary/video/7620935910770707743?q=Project%20Hail%20Mary%20Rocky&t=1778729762426)


## Part 1: **Project Direction**
### Project Path
For our Creative Coding final project, we aim to create an immersive and interactive experience that is built on abstract ideas like experiencing emotions. We have collectively decided to create a concept from scratch and not repurpose any existing artwork. We will, however, take inspiration for art styles, colour palette, and visual language to maintain consistency. 

Our concept takes inspiration from various characters that portray other worldly characteristics like Rocky from Project Hail Mary, Stitch from Lilo and Stitch and Emi from Ultraman: Rising. The idea is to portray emotions without the use of the word, and communication can be extended to visual, sound, and reaction.  

In immersive side of things, the concept takes inspiration from Tamagotchi. The users have to interact with an abstract idea of life, similar to that of an amoeba or an alien. The organisms would react based on user input and movement. 

### Vision
- **Pictures**
    - *Picture 1*
![An image of project script](READMEImages/script.png)
    - *Picture 2*
![An image of moodboard](READMEImages/moodboard.jpg)


---
## Part 2: **Techniques**

## Part 3: **Mechanics**


### Mechanic 1 — *Audio*
The audio mechanic drives the emotional atmosphere of the piece through two layers of sound. After entering the page, a gentle ambient track plays automatically, establishing a neutral mood. When the user selects an emotion from happiness, sadness, anger and fear, the background music transitions immediately to a corresponding track that reflects the emotional state. Additionally, when the user hovers over the digital pet, a unique sound effect is triggered, with each emotion producing a distinctly different response. 

- **Pictures**
    - *Picture 1*
![An image of audio example 1](READMEImages/audioexample1.jpg)
    - *Picture 2*
![An image of audio example 2](READMEImages/audioexample2.jpg)

### Mechanic 2 — *Time-based*
My time-based mechanic controls how the visual system changes over time. It includes a lifecycle system, breathing motion, heartbeat pulses, and emotional decay. 

The lifecycle gradually changes the scale and transparency of the main visual form, creating a sense of birth, maturity, and ageing. The breathing and heartbeat systems use time-based oscillation and timed intervals to make the form feel alive. The emotion decay system allows emotional states such as anger, joy, and sorrow to fade back to neutral after different durations, so the interaction feels temporary and evolving rather than static.

### Mechanic 3 — *Perlin Noise + Randomness*
The Perlin noise mechanic will explore reactions to user movements and input. This is particularly intended to make the reactions natural. The mechanism will create different frequency of ripple effect based on the user's input or movement. Additionally, the noise would have a standby mode where the lines move in a rhythmic pulsing manner to denote breathing or appearance of being alive. 

The noise is also applied directly to visual properties such as line weight, allowing the ripple effect to be expressed in an exaggerated, gestural way that emphasizes movement and energy. 

### Mechanic 4 — *User Input*
The user input mechanism enables users to interact directly with the digital organism through keyboard and mouse control. Different keyboard numbers will represent different emotions, such as happiness, sadness, and anger. When the user presses one of the keys, the organism will change its color and behavior. 

Mouse interaction can also create connections between users and organisms. When the user hovers the mouse over the organism, a ripple-like visual effect will appear around its body. 

This mechanism supports the project's concept of emotional expression and interaction by allowing users to influence the organism's emotions and responses in real time.

- **Pictures**
![An image of userinput example](READMEImages/userinput.jpg)

---
## Part 4: **AI acknowledgement**

## Part 5: **External references**
### p5.js Reference
[p5js reference link](https://p5js.org/reference/)

The p5.js Reference was used to understand and implement built-in functions including:

- millis()
- sin()
- map()
- lerp()
- constrain()

These functions were used to create timed animation, lifecycle transitions, breathing motion, heartbeat pulses, and emotional decay behaviour throughout the project.

## Part 6: **Interaction instructions**
Wait for the ambient soundtrack to begin.
Press:
1 = Joy
2 = Sorrow
3 = Anger
4 = Fear
Hover the mouse over the organism to trigger ripple effects and interactive sound feedback.
Observe how the organism responds through changes in movement, colour, breathing rhythm, heartbeat, and emotional state.
Stay within the experience to witness automatic time-based events, lifecycle changes, and emotional decay back to a neutral state.

## Part 7: **Putting It Together**
All four mechanics work together in one interactive environment. Mouse movement and clicking allow users to interact with the abstract form directly. Audio creates sound feedback and changes visual reactions. Perlin noise and randomness make the movement feel organic and unpredictable. The time-based mechanic triggers automatic events, visual effects, and sound changes over time, helping the experience feel alive and always changing. Together, the mechanics create a connected emotional audiovisual experience through motion, interaction, sound, and atmosphere. 