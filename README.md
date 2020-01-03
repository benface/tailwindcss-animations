# Animations Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-animations
```

## Usage

```js
// tailwind.config.js
module.exports = {
  theme: {
    animations: { // defaults to {}; the following are examples
      'spin': {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
      'jump': {
        '0%': {
          transform: 'translateY(0%)',
        },
        '50%': {
          transform: 'translateY(-100%)',
        },
        '100%': {
          transform: 'translateY(0%)',
        },
      },
    },
    animationDuration: { // defaults to these values
      'default': '1s',
      '0s': '0s',
      '1s': '1s',
      '2s': '2s',
      '3s': '3s',
      '4s': '4s',
      '5s': '5s',
    },
    animationTimingFunction: { // defaults to these values
      'default': 'ease',
      'linear': 'linear',
      'ease': 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
    animationDelay: { // defaults to these values
      'default': '0s',
      '0s': '0s',
      '1s': '1s',
      '2s': '2s',
      '3s': '3s',
      '4s': '4s',
      '5s': '5s',
    },
    animationIterationCount: { // defaults to these values
      'default': 'infinite',
      'once': '1',
      'infinite': 'infinite',
    },
    animationDirection: { // defaults to these values
      'default': 'normal',
      'normal': 'normal',
      'reverse': 'reverse',
      'alternate': 'alternate',
      'alternate-reverse': 'alternate-reverse',
    },
    animationFillMode: { // defaults to these values
      'default': 'none',
      'none': 'none',
      'forwards': 'forwards',
      'backwards': 'backwards',
      'both': 'both',
    },
    animationPlayState: { // defaults to these values
      'running': 'running',
      'paused': 'paused',
    },
  },
  variants: { // all the following default to ['responsive']
    animations: ['responsive'],
    animationDuration: ['responsive'],
    animationTimingFunction: ['responsive'],
    animationDelay: ['responsive'],
    animationIterationCount: ['responsive'],
    animationDirection: ['responsive'],
    animationFillMode: ['responsive'],
    animationPlayState: ['responsive'],
  },
  plugins: [
    require('tailwindcss-animations'),
  ],
};
```

The above configuration would generate the following CSS:

```css
/* @tailwind base */

/* base styles for the default animation duration, timing function, delay, iteration count, direction, and fill mode (when they differ from the CSS defaults) */
*, *::before, *::after {
  --animation-duration: 1s;
  --animation-iteration-count: infinite;
  /* when the default timing function is a value other than "ease": */
  --animation-timing-function: [default-timing-function];
  /* when the default delay is a value other than zero: */
  --animation-delay: [default-delay];
  /* when the default direction is a value other than "normal": */
  --animation-direction: [default-direction];
  /* when the default fill mode is a value other than "none": */
  --animation-fill-mode: [default-fill-mode];
}

/* configurable with the "animations" theme object */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes jump {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
}

/* @tailwind utilities */

.animation-none {
  animation-name: none;
}
.animation-spin {
  animation-name: spin;
  animation-duration: 1s;
  animation-duration: var(--animation-duration);
  animation-iteration-count: infinite;
  animation-iteration-count: var(--animation-iteration-count);
}
.animation-jump {
  animation-name: jump;
  animation-duration: 1s;
  animation-duration: var(--animation-duration);
  animation-iteration-count: infinite;
  animation-iteration-count: var(--animation-iteration-count);
}
.animation-[name] {
  animation-name: [name];
  /* when the default duration is a value other than zero: */
  animation-duration: [default-duration];
  animation-duration: var(--animation-duration);
  /* when the default timing function is a value other than "ease": */
  animation-timing-function: [default-timing-function];
  animation-timing-function: var(--animation-timing-function);
  /* when the default delay is a value other than zero: */
  animation-delay: [default-delay];
  animation-delay: var(--animation-delay);
  /* when the default iteration count is a value other than "1": */
  animation-iteration-count: [default-iteration-count];
  animation-iteration-count: var(--animation-iteration-count);
  /* when the default direction is a value other than "normal": */
  animation-direction: [default-direction];
  animation-direction: var(--animation-direction);
  /* when the default fill mode is a value other than "none": */
  animation-fill-mode: [default-fill-mode];
  animation-fill-mode: var(--animation-fill-mode);
}

/* configurable with the "animationDuration" theme object */
.animation-0s {
  --animation-duration: 0s;
  animation-duration: 0s;
  animation-duration: var(--animation-duration);
}
.animation-1s {
  --animation-duration: 1s;
  animation-duration: 1s;
  animation-duration: var(--animation-duration);
}
.animation-[duration-key] {
  animation-duration: [duration-value];
  /* when the default duration is a value other than zero: */
  --animation-duration: [duration-value];
  animation-duration: var(--animation-duration);
}

/* configurable with the "animationTimingFunction" theme object */
.animation-linear {
  animation-timing-function: linear;
}
.animation-ease {
  animation-timing-function: ease;
}
.animation-[timing-function-key] {
  animation-timing-function: [timing-function-value];
  /* when the default timing function is a value other than "ease": */
  --animation-timing-function: [timing-function-value];
  animation-timing-function: var(--animation-timing-function);
}

/* configurable with the "animationDelay" theme object */
.animation-delay-0s {
  animation-delay: 0s;
}
.animation-delay-1s {
  animation-delay: 1s;
}
.animation-delay-[key] {
  animation-delay: [value];
  /* when the default delay is a value other than zero: */
  --animation-delay: [value];
  animation-delay: var(--animation-delay);
}

/* configurable with the "animationIterationCount" theme object */
.animation-once {
  --animation-iteration-count: 1;
  animation-iteration-count: 1;
  animation-iteration-count: var(--animation-iteration-count);
}
.animation-infinite {
  --animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  animation-iteration-count: var(--animation-iteration-count);
}
.animation-[iteration-count-key] {
  animation-iteration-count: [iteration-count-value];
  /* when the default iteration count is a value other than "1": */
  --animation-iteration-count: [iteration-count-value];
  animation-iteration-count: var(--animation-iteration-count);
}

/* configurable with the "animationDirection" theme object */
.animation-normal {
  animation-direction: normal;
}
.animation-reverse {
  animation-direction: reverse;
}
.animation-[direction-key] {
  animation-direction: [direction-value];
  /* when the default direction is a value other than "normal": */
  --animation-direction: [direction-value];
  animation-direction: var(--animation-direction);
}

/* configurable with the "animationFillMode" theme object */
.animation-fill-none {
  animation-fill-mode: none;
}
.animation-fill-forwards {
  animation-fill-mode: forwards;
}
.animation-fill-[key] {
  animation-fill-mode: [value];
  /* when the default fill mode is a value other than "none": */
  --animation-fill-mode: [value];
  animation-fill-mode: var(--animation-fill-mode);
}

/* configurable with the "animationPlayState" theme object */
.animation-running {
  animation-play-state: running;
}
.animation-paused {
  animation-play-state: paused;
}
```

Note: The `animationDuration`, `animationTimingFunction`, `animationDelay`, `animationIterationCount`, `animationDirection`, and `animationFillMode` theme objects accept a `default` key that doesn’t generate any class; it is used to define a custom property on all elements and pseudo-elements (`*, *::before, *::after`) if the value differs from the CSS-defined default. These custom properties are then used to set actual properties on elements that have a `animation-[name]` class, so that you don’t have to specify the same classes every time.
