import PropsTypes from 'prop-types';

import { StyledButton } from './styles';

import Spinner from '../Spinner';

export default function Button({
  type, disabled, isLoading, children, danger, onClick,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger ? 1 : 0}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropsTypes.string,
  disabled: PropsTypes.bool,
  isLoading: PropsTypes.bool,
  danger: PropsTypes.bool,
  children: PropsTypes.node.isRequired,
  onClick: PropsTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onClick: undefined,
};
