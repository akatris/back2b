'use strict';


const getType = (id) => {

    if (/^\d$/.test(id)) {
        return 'categories';
    }

    if (/^\d{2}$/.test(id)) {
        return 'accounts';
    }

    if (/^\d{3}$/.test(id)) {
        return 'subaccounts';
    }

    if (/^\d{4}$/.test(id)) {
        return 'rubrics';
    }

    return 'unknown';
};


const getParentId = (id) => {

    const type = getType(id);
    const types = ['categories', 'accounts', 'subaccounts', 'rubrics'];
    const index = types.indexOf(type);

    if (index > 0) {
        const stringId = String(id);
        return stringId.slice(0, index);
    }

    return 'none';
};


module.exports = { getType, getParentId };
