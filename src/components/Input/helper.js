export const StatusInput = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    INVALID: 'invalid',
};

export const defineIsDisabled = (status) => {
    return StatusInput.DISABLED === status ? StatusInput.DISABLED : null;
};

export const defineIsInvalid = (status) => {
    return StatusInput.INVALID === status ? true : false;
}