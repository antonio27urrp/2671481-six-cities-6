import { render } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);

    const svgElement = container.querySelector('svg');
    const circleElements = container.querySelectorAll('circle');

    expect(svgElement).toBeInTheDocument();
    expect(circleElements).toHaveLength(3);
  });
});
