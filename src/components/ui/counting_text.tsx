'use client';

import * as React from 'react';
import {
  type SpringOptions,
  type UseInViewOptions,
  useInView,
  useMotionValue,
  useSpring,
} from 'motion/react';

export interface CountingNumberProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Final number to count up to */
  number: number;
  /** Starting number (default: 0) */
  fromNumber?: number;
  /** Whether to pad numbers with leading zeros */
  padStart?: boolean;
  /** Trigger counting only when in view */
  inView?: boolean;
  /** Margin for intersection observer */
  inViewMargin?: UseInViewOptions['margin'];
  /** Whether the count should trigger only once */
  inViewOnce?: boolean;
  /** Decimal separator (default: ".") */
  decimalSeparator?: string;
  /** Spring animation configuration */
  transition?: SpringOptions;
  /** Number of decimal places to show */
  decimalPlaces?: number;
}

/**
 * Animated Counting Number Component
 * Works with Framer Motion + Tailwind CSS
 */
export const CountingNumber: React.FC<CountingNumberProps> = ({
  number,
  fromNumber = 0,
  padStart = false,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  decimalSeparator = '.',
  transition = { stiffness: 90, damping: 50 },
  decimalPlaces = 0,
  className = '',
  ...props
}) => {
  const localRef = React.useRef<HTMLSpanElement>(null);

  // Determine decimal places
  const numberStr = number.toString();
  const decimals =
    typeof decimalPlaces === 'number'
      ? decimalPlaces
      : numberStr.includes('.')
      ? (numberStr.split('.')[1]?.length ?? 0)
      : 0;

  // Motion values
  const motionVal = useMotionValue(fromNumber);
  const springVal = useSpring(motionVal, transition);

  // In-view detection
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  // Trigger animation when in view
  React.useEffect(() => {
    if (isInView) motionVal.set(number);
  }, [isInView, number, motionVal]);

  // Listen to motion value updates
  React.useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      if (localRef.current) {
        let formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toString();

        if (decimals > 0) {
          formatted = formatted.replace('.', decimalSeparator);
        }

        if (padStart) {
          const finalIntLength = Math.floor(Math.abs(number)).toString().length;
          const [intPart, fracPart] = formatted.split(decimalSeparator);
          const paddedInt = intPart?.padStart(finalIntLength, '0') ?? '';
          formatted = fracPart
            ? `${paddedInt}${decimalSeparator}${fracPart}`
            : paddedInt;
        }

        localRef.current.textContent = formatted;
      }
    });

    return () => unsubscribe();
  }, [springVal, decimals, padStart, number, decimalSeparator]);

  // Initial placeholder text
  const finalIntLength = Math.floor(Math.abs(number)).toString().length;
  const initialText = padStart
    ? '0'.padStart(finalIntLength, '0') +
      (decimals > 0 ? decimalSeparator + '0'.repeat(decimals) : '')
    : '0' + (decimals > 0 ? decimalSeparator + '0'.repeat(decimals) : '');

  return (
    <span
      ref={localRef}
      data-slot="counting-number"
      className={`font-normal text-foreground ${className}`}
      {...props}
    >
      {initialText}
    </span>
  );
};
export default CountingNumber;