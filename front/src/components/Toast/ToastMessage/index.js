/* eslint-disable react/jsx-no-bind */
import { useEffect } from 'react';
import PropsTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="Error" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Success" />}

      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropsTypes.shape({
    id: PropsTypes.number.isRequired,
    text: PropsTypes.string.isRequired,
    type: PropsTypes.oneOf(['default', 'danger', 'success']),
    duration: PropsTypes.number,
  }).isRequired,
  onRemoveMessage: PropsTypes.func.isRequired,
};
