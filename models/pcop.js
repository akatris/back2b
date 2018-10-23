'use strict';

const getType = (rubric) => {

    const stringID = String(rubric.id);
    switch (stringID.length) {
        case 1:
            return 'categories';
        default:
            return undefined;
    }
};

const save = async function (db, rubric) {

    const idExists = await db.categories.findOne({ _id: rubric.id });

    if (idExists) {
        return { saved: false };
    }

    // Check if name exists.
    const nameExists = await db.categories.findOne({ _id: rubric.name });
    if (nameExists) {
        return { saved: false };
    }
};

module.exports = { getType, save };
