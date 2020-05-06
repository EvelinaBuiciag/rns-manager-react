import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import { validateAddress } from '../../../../validations';

import UserErrorComponent from '../../../../components/UserErrorComponent';
import UserSuccessComponent from '../../../../components/UserSuccessComponent';
import UserWaitingComponent from '../../../../components/UserWaitingComponent';

import { ChecksumErrorContainer } from '../../../../containers';

const NewSubdomainComponent = ({
  strings,
  domain,
  handleClick,
  errorMessage,
  handleErrorClose,
  handleSuccessClose,
  confirmedTx,
  newRequesting,
  newWaiting,
  initialSubdomain,
  initialOwner,
  chainId,
  advancedView,
}) => {
  const [localError, setLocalError] = useState('');
  const [checksumError, setChecksumError] = useState(false);

  const [subdomain, setSubdomain] = useState(initialSubdomain);
  const [owner, setOwner] = useState(initialOwner);
  const [setupRsk, setSetupRsk] = useState(true);

  const handleOnClick = (e) => {
    e.preventDefault();

    if (subdomain === '' || subdomain.match('[^a-z0-9]')) {
      return setLocalError(strings.invalid_name);
    }

    if (owner.endsWith('.rsk')) {
      return handleClick(subdomain, owner.toLowerCase(), setupRsk);
    }

    switch (validateAddress(owner, chainId)) {
      case 'Invalid address':
        return setLocalError('Invalid address');
      case 'Invalid checksum':
        return setChecksumError(true);
      default:
        return handleClick(subdomain, owner.toLowerCase(), setupRsk);
    }
  };

  const handleChecksum = (value) => {
    setOwner(value);
    setChecksumError(false);
    handleErrorClose();
    handleClick(subdomain, value);
  };

  const handleErrorClick = () => {
    setLocalError('');
    handleErrorClose();
  };

  if (confirmedTx !== '' && owner !== '') {
    setOwner('');
    setSubdomain('');
  }

  const disabled = newRequesting || newWaiting;

  return (
    <Form onSubmit={handleOnClick}>
      <Row>
        <Col>
          <h3 className="blue caps-first">{strings.admin_your_domain_action_3}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{strings.purpose_subdomains}</p>
        </Col>
      </Row>
      <Row className="minor-section">
        <Col md={2} className="capitalize">
          {strings.name}
        </Col>
        <Col md={5}>
          <input
            value={subdomain}
            onChange={evt => setSubdomain(evt.target.value)}
            className="subdomain"
            disabled={disabled}
            placeholder={strings.subdomain_name}
          />
        </Col>
        <Col md={5}>
          <p className="blue break-above">
            {`.${domain}`}
          </p>
        </Col>
      </Row>
      <Row className="minor-section">
        <Col md={2} className="capitalize">
          {strings.owner}
        </Col>
        <Col md={8}>
          <input
            value={owner}
            onChange={evt => setOwner(evt.target.value)}
            className="owner"
            disabled={disabled}
            placeholder={strings.address_placeholder}
          />
        </Col>
        <Col>
          <button
            disabled={disabled}
            className="btn btn-primary"
            type="submit"
          >
            {strings.create}
          </button>
        </Col>
      </Row>
      {advancedView && (
        <Row>
          <Col className="col-md-5 offset-md-5" style={{ textAlign: 'right' }}>
            <Form.Check
              type="switch"
              id="setup-addr-switch"
              label={strings.set_subdomain_rsk}
              checked={setupRsk}
              onChange={() => setSetupRsk(!setupRsk)}
            />
          </Col>
        </Row>
      )}

      <ChecksumErrorContainer
        show={checksumError}
        inputValue={owner}
        handleClick={value => handleChecksum(value)}
      />

      <UserErrorComponent
        visible={errorMessage !== '' || localError !== ''}
        message={errorMessage || localError}
        handleCloseClick={() => handleErrorClick()}
      />

      <UserSuccessComponent
        visible={confirmedTx !== ''}
        message={strings.subdomain_has_been_registered}
        address={confirmedTx}
        handleCloseClick={() => handleSuccessClose()}
      />

      <UserWaitingComponent
        visible={newWaiting === true}
        message={strings.wait_transation_confirmed}
      />
    </Form>
  );
};

NewSubdomainComponent.defaultProps = {
  initialSubdomain: '',
  initialOwner: '',
};

NewSubdomainComponent.propTypes = {
  strings: propTypes.shape({
    admin_your_domain_action_3: propTypes.string.isRequired,
    type_sudomain: propTypes.string.isRequired,
    type_owners_address: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
    create: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
    subdomain_has_been_registered: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
    purpose_subdomains: propTypes.string.isRequired,
    Name: propTypes.string.isRequired,
    Owner: propTypes.string.isRequired,
    subdomain_name: propTypes.string.isRequired,
    address_placeholder: propTypes.string.isRequired,
    set_subdomain_rsk: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
  handleErrorClose: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  confirmedTx: propTypes.string.isRequired,
  handleSuccessClose: propTypes.func.isRequired,
  newRequesting: propTypes.bool.isRequired,
  newWaiting: propTypes.bool.isRequired,
  initialSubdomain: propTypes.string,
  initialOwner: propTypes.string,
  chainId: propTypes.string.isRequired,
  advancedView: propTypes.bool.isRequired,
};

export default multilanguage(NewSubdomainComponent);
