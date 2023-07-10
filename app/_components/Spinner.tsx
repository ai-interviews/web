import classNames from 'classnames';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
};

export function Spinner({ size = 'md', color }: Props) {
  let spinnerSizeClass = '';

  switch (size) {
    case 'xs':
      spinnerSizeClass = 'loading-xs';
      break;
    case 'sm':
      spinnerSizeClass = 'loading-xs';
      break;
    case 'md':
      spinnerSizeClass = 'loading-md';
      break;
    case 'lg':
      spinnerSizeClass = 'loading-lg';
      break;
  }

  return <span className={classNames('loading-spinne loading', spinnerSizeClass, color)}></span>;
}
