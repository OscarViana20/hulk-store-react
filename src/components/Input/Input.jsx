import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';

import { defineIsDisabled, defineIsInvalid, StatusInput } from './helper';

export const Input = (props) => {
    const {
        name,
        type,
        onChange,
        placeholder,
        value = null,
        status = StatusInput.ENABLED,
    } = props;

    return (
            <InputText
                name={name}
                type={type}
                value={value}
                autoComplete="off"
                invalid={defineIsInvalid(status)}
                disabled={defineIsDisabled(status)}
                onChange={onChange}
                placeholder={placeholder}
            />
    );
}

Input.propTypes = {
    value: PropTypes.any,
    status: PropTypes.oneOf(Object.values(StatusInput)),
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};