'use strict';


const Pcop = require('../lib/pcop-type');
const Lab = require('lab');
const { expect } = require('code');

const { experiment, test } = exports.lab = Lab.script();


experiment('Pcop model', () => {


    test('Pcop class exists', () => {

        expect(Pcop).exists();
        expect(Pcop.getType(1)).equals('categories');
        expect(Pcop.getType(11)).equals('accounts');
        expect(Pcop.getType(111)).equals('subaccounts');
        expect(Pcop.getType(1111)).equals('rubrics');
        expect(Pcop.getType(11111)).equals('unknown');
    });


    test('Pcop parent id', () => {

        expect(Pcop.getParentId(1)).equals('none');
        expect(Pcop.getParentId(22)).equals('2');
        expect(Pcop.getParentId(222)).equals('22');
        expect(Pcop.getParentId(2222)).equals('222');
        expect(Pcop.getParentId(22222)).equals('none');
    });
});
