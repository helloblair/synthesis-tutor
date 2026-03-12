import { useManipulative } from '../context/ManipulativeContext';

export function useManipulativeChecker() {
  const { state } = useManipulative();
  const blocks = state.workspaceBlocks;

  const checkCondition = (condition: string): boolean => {
    switch (condition) {
      case 'has_half_block':
        return blocks.some((b) => b.fraction.numerator === 1 && b.fraction.denominator === 2);

      case 'has_two_quarters':
        return blocks.filter((b) => b.fraction.numerator === 1 && b.fraction.denominator === 4).length >= 2;

      case 'shows_third_sixths':
        return (
          blocks.some((b) => b.fraction.numerator === 1 && b.fraction.denominator === 3) &&
          blocks.filter((b) => b.fraction.numerator === 1 && b.fraction.denominator === 6).length >= 2
        );

      case 'equivalent_to_third': {
        const sixths = blocks.filter((b) => b.fraction.numerator === 1 && b.fraction.denominator === 6).length;
        const fourths = blocks.filter((b) => b.fraction.numerator === 1 && b.fraction.denominator === 12).length;
        return sixths >= 2 || fourths >= 4;
      }

      default:
        return false;
    }
  };

  return { checkCondition };
}