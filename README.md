# SKED
is a minimalistic tool to schedule functions' execution.

## How to use it
1. Create an object where the *key*/*value* pair means *delay of execution* / *callback function*. Delay times are in milliseconds.
2. Pass that object as an argument to sked. This will return you a new function you can keep...
3. ...then initialize it to start the timeline.

For example:
```
var scheduledCallbacks = {
    "200": callbackFunctionOne,
    "700": callbackFunctionTwo
}

var timeline = sked( scheduledCallbacks )

timeline()
```
**Tip:** *you can pass a whole sked timeline as a value in the schedule object. This allows you to manage complex timelines in easy chewable bites.*

## Installing
You can install "sked.mjs" as an ES6 module or link the script "sked.js".

## What sked does
is to compute the optimal interval so all callbacks can be called at the right time. Then it creates a lightweight setInterval() wired to run each callback at the right time and to clear itself when finished. Sked returns to you a function with which you can start the animation whenever you like it.

## Why was sked created?
To manage javascript animations. [GreenSock](https://greensock.com) is the powerhouse on JS animation, but I've come to realize [KUTE.js](https://thednp.github.io/kute.js/) has every tool I need, and with a MIT license I am less worried about adding it to projects.

But actually KUTE.js is missing one tool: the timeline, which allows me to polish when successive animations start. In particular, I wanted to start an animation some miliseconds before the previous has ended, which I cannot reproduce with KUTE.js' callback.

Sked **is not** as powerful as GreeSock's timeline, not by a long shot. But by feeding each animation timeline as a callback to a master timeline, I can easily manage complex animations, without which I'd still be tied to proprietary code.
