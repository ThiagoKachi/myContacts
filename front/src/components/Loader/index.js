/* eslint-disable */
import ReactDom from 'react-dom';

import { Overlay } from './styles';

export function Loader() {
  return ReactDom.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.getElementById('loader-root')
  );
}
