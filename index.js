const plugin = require('tailwindcss/plugin');
const _ = require('lodash');

const time = time => _.isNumber(time) ? `${time}ms` : time;

const defaultTheme = {
  animations: {},
  animationDuration: {
    'default': '1s',
    '0s': '0s',
    '1s': '1s',
    '2s': '2s',
    '3s': '3s',
    '4s': '4s',
    '5s': '5s',
  },
  animationTimingFunction: {
    'default': 'ease',
    'linear': 'linear',
    'ease': 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
  },
  animationDelay: {
    'default': '0s',
    '0s': '0s',
    '1s': '1s',
    '2s': '2s',
    '3s': '3s',
    '4s': '4s',
    '5s': '5s',
  },
  animationIterationCount: {
    'default': 'infinite',
    'once': '1',
    'infinite': 'infinite',
  },
  animationDirection: {
    'default': 'normal',
    'normal': 'normal',
    'reverse': 'reverse',
    'alternate': 'alternate',
    'alternate-reverse': 'alternate-reverse',
  },
  animationFillMode: {
    'default': 'none',
    'none': 'none',
    'forwards': 'forwards',
    'backwards': 'backwards',
    'both': 'both',
  },
  animationPlayState: {
    'running': 'running',
    'paused': 'paused',
  },
};

module.exports = plugin(function({ theme, variants, e, addBase, addUtilities }) {
  const animationsTheme = theme('animations');
  const durationTheme = theme('animationDuration');
  const timingFunctionTheme = theme('animationTimingFunction');
  const delayTheme = theme('animationDelay');
  const iterationCountTheme = theme('animationIterationCount');
  const directionTheme = theme('animationDirection');
  const fillModeTheme = theme('animationFillMode');
  const playStateTheme = theme('animationPlayState');

  const defaultDuration = time(_.defaults({}, durationTheme, defaultTheme.animationDuration).default);
  const defaultTimingFunction = _.defaults({}, timingFunctionTheme, defaultTheme.animationTimingFunction).default;
  const defaultDelay = time(_.defaults({}, delayTheme, defaultTheme.animationDelay).default);
  const defaultIterationCount = _.defaults({}, iterationCountTheme, defaultTheme.animationIterationCount).default;
  const defaultDirection = _.defaults({}, directionTheme, defaultTheme.animationDirection).default;
  const defaultFillMode = _.defaults({}, fillModeTheme, defaultTheme.animationFillMode).default;

  const baseDuration = _.includes(['0', '0s', '0ms'], defaultDuration) ? null : defaultDuration;
  const baseTimingFunction = defaultTimingFunction === 'ease' ? null : defaultTimingFunction;
  const baseDelay = _.includes(['0', '0s', '0ms'], defaultDelay) ? null : defaultDelay;
  const baseIterationCount = defaultIterationCount === '1' ? null : defaultIterationCount;
  const baseDirection = defaultDirection === 'normal' ? null : defaultDirection;
  const baseFillMode = defaultFillMode === 'none' ? null : defaultFillMode;

  const baseStyles = {
    ...(function() {
      if (baseDuration === null && baseTimingFunction === null && baseDelay === null && baseIterationCount === null && baseDirection === null && baseFillMode === null) {
        return {};
      }
      return {
        '*, *::before, *::after': {
          '--animation-duration': baseDuration,
          '--animation-timing-function': baseTimingFunction,
          '--animation-delay': baseDelay,
          '--animation-iteration-count': baseIterationCount,
          '--animation-direction': baseDirection,
          '--animation-fill-mode': baseFillMode,
        },
      };
    })(),
    ..._.fromPairs(_.map(animationsTheme, (value, modifier) => [`@keyframes ${e(modifier)}`, value])),
  };

  const durationStyles = value => {
    if (baseDuration === null) {
      return {
        animationDuration: time(value),
      };
    }
    return {
      '--animation-duration': time(value),
      animationDuration: [time(value), 'var(--animation-duration)'],
    };
  };

  const timingFunctionStyles = value => {
    if (baseTimingFunction === null) {
      return {
        animationTimingFunction: value,
      };
    }
    return {
      '--animation-timing-function': value,
      animationTimingFunction: [value, 'var(--animation-timing-function)'],
    };
  };

  const delayStyles = value => {
    if (baseDelay === null) {
      return {
        animationDelay: time(value),
      };
    }
    return {
      '--animation-delay': time(value),
      animationDelay: [time(value), 'var(--animation-delay)'],
    };
  };

  const iterationCountStyles = value => {
    if (baseIterationCount === null) {
      return {
        animationIterationCount: value,
      };
    }
    return {
      '--animation-iteration-count': value,
      animationIterationCount: [value, 'var(--animation-iteration-count)'],
    };
  };

  const directionStyles = value => {
    if (baseDirection === null) {
      return {
        animationDirection: value,
      };
    }
    return {
      '--animation-direction': value,
      animationDirection: [value, 'var(--animation-direction)'],
    };
  };

  const fillModeStyles = value => {
    if (baseFillMode === null) {
      return {
        animationFillMode: value,
      };
    }
    return {
      '--animation-fill-mode': value,
      animationFillMode: [value, 'var(--animation-fill-mode)'],
    };
  };

  const animationsUtilities = {
    '.animation-none': {
      animationName: 'none',
    },
    ..._.fromPairs(
      _.map(animationsTheme, (value, modifier) => {
        return [
          `.${e(`animation-${modifier}`)}`,
          {
            animationName: modifier,
            animationDuration: baseDuration === null ? null : [baseDuration, 'var(--animation-duration)'],
            animationTimingFunction: baseTimingFunction === null ? null : [baseTimingFunction, 'var(--animation-timing-function)'],
            animationDelay: baseDelay === null ? null : [baseDelay, 'var(--animation-delay)'],
            animationIterationCount: baseIterationCount === null ? null : [baseIterationCount, 'var(--animation-iteration-count)'],
            animationDirection: baseDirection === null ? null : [baseDirection, 'var(--animation-direction)'],
            animationFillMode: baseFillMode === null ? null : [baseFillMode, 'var(--animation-fill-mode)'],
          },
        ];
      })
    ),
  };

  const durationUtilities = _.fromPairs(
    _.map(durationTheme, (value, modifier) => {
      if (modifier === 'default') {
        return [];
      }
      return [
        `.${e(`animation-${modifier}`)}`,
        {
          ...durationStyles(value),
        },
      ];
    })
  );

  const timingFunctionUtilities = _.fromPairs(
    _.map(timingFunctionTheme, (value, modifier) => {
      if (modifier === 'default') {
        return [];
      }
      return [
        `.${e(`animation-${modifier}`)}`,
        {
          ...timingFunctionStyles(value),
        },
      ];
    })
  );

  const delayUtilities = _.fromPairs(
    _.map(delayTheme, (value, modifier) => {
      if (modifier === 'default') {
        return [];
      }
      return [
        `.${e(`animation-delay-${modifier}`)}`,
        {
          ...delayStyles(value),
        },
      ];
    })
  );

  const iterationCountUtilities = _.fromPairs(
    _.map(iterationCountTheme, (value, modifier) => {
      if (modifier === 'default') {
        return [];
      }
      return [
        `.${e(`animation-${modifier}`)}`,
        {
          ...iterationCountStyles(value),
        },
      ];
    })
  );

  const directionUtilities = _.fromPairs(
    _.map(directionTheme, (value, modifier) => {
      if (modifier === 'default') {
        return [];
      }
      return [
        `.${e(`animation-${modifier}`)}`,
        {
          ...directionStyles(value),
        },
      ];
    })
  );

  const fillModeUtilities = _.fromPairs(
    _.map(fillModeTheme, (value, modifier) => {
      if (modifier === 'default') {
        return [];
      }
      return [
        `.${e(`animation-fill-${modifier}`)}`,
        {
          ...fillModeStyles(value),
        },
      ];
    })
  );

  const playStateUtilities = _.fromPairs(
    _.map(playStateTheme, (value, modifier) => {
      return [
        `.${e(`animation-${modifier}`)}`,
        {
          animationPlayState: value,
        },
      ];
    })
  );

  addBase(baseStyles);
  addUtilities(animationsUtilities, variants('animations'));
  addUtilities(durationUtilities, variants('animationDuration'));
  addUtilities(timingFunctionUtilities, variants('animationTimingFunction'));
  addUtilities(delayUtilities, variants('animationDelay'));
  addUtilities(iterationCountUtilities, variants('animationIterationCount'));
  addUtilities(directionUtilities, variants('animationDirection'));
  addUtilities(fillModeUtilities, variants('animationFillMode'));
  addUtilities(playStateUtilities, variants('animationPlayState'));
}, {
  theme: defaultTheme,
  variants: {
    animations: ['responsive'],
    animationDuration: ['responsive'],
    animationTimingFunction: ['responsive'],
    animationDelay: ['responsive'],
    animationIterationCount: ['responsive'],
    animationDirection: ['responsive'],
    animationFillMode: ['responsive'],
    animationPlayState: ['responsive'],
  },
});
