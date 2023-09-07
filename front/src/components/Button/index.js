import PropsTypes from 'prop-types';

import { StyledButton } from './styles';

import Spinner from '../Spinner';

export default function Button({
  type, disabled, isLoading, children,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropsTypes.string,
  disabled: PropsTypes.bool,
  isLoading: PropsTypes.bool,
  children: PropsTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
};
