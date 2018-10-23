'use strict';

const Lab = require('lab');
const Pcop = require('../models/pcop');
const { expect } = require('code');

const { before, describe, it } = (exports.lab = Lab.script());

describe('PcopModel', () => {

    describe('#getType', () => {

        let rubric = {};

        before(() => {

            rubric = {
                id: 1,
                name: 'Name',
                description: 'Description',
                eligible_transactions: ['a', 'b', 'c']
            };
        });

        it('should return type of pcop', () => {

            expect(Pcop.getType(rubric)).equal('categories');
        });

        it('should return undefined if type is unknown', () => {

            rubric.id = 55555;
            expect(Pcop.getType(rubric)).undefined();
        });
    });
});
