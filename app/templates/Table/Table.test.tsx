import { shallow } from 'enzyme';
import * as React from 'react';
import { Table, Column, Value } from './Table';
import { ValueType } from './ValueType';

describe('Widget Table', () => {
    let mockedColumns: Column[] = [];
    let mockedLine: Array<Value[]> = new Array<Value[]>();

    beforeAll(() => {
        mockedColumns.push({name: 'Count', width: '20%'});
        mockedColumns.push({name: 'Expense', width: '50%'});
        mockedColumns.push({name: 'Date', width: '20%'});
        mockedColumns.push({name: 'Status', width: '10%'});

        mockedLine.push([{type:ValueType.Tag, value: '100'}, 
            {type: ValueType.Text, value: 'Text'}, 
            {type:ValueType.Date, value: '10/10/2018'}, 
            {type:ValueType.Status, value: 'true'}]);
    });

    it('Table has the good amount of columns', () => {
        const wrapper = shallow(<Table columns={mockedColumns} values={mockedLine} />);
        
        expect(wrapper.find('.table-columns').length).toBe(1);
        expect(wrapper.find('.table-columns').find('li').length).toBe(4);
    });

    it('Table has the good amount of line', () => {
        const wrapper = shallow(<Table columns={mockedColumns} values={mockedLine} />);
        
        expect(wrapper.find('.table-line').length).toBe(1);
        expect(wrapper.find('.table-line').find('li').length).toBe(4);
    });

    it('Check Tag type has the good css class', () => {
        const wrapper = shallow(<Table columns={mockedColumns} values={mockedLine} />);
        
        expect(wrapper.find('.table-line').find('li').find('span').hasClass('Hylia-a-tag Hylia-a-tag--apprentice')).toBe(true);
    });

    it('Check Date type has the good css class', () => {
        const wrapper = shallow(<Table columns={mockedColumns} values={mockedLine} />);
        
        expect(wrapper.find('.table-line').find('li').at(2).hasClass('dates')).toBe(true);
    });

    it('Check Text type has the good css class', () => {
        const wrapper = shallow(<Table columns={mockedColumns} values={mockedLine} />);
        
        expect(wrapper.find('.table-line').find('li').at(1).hasClass('text')).toBe(true);
    });

    it('Check active Status type has the good css class', () => {
        mockedLine[0][3].value = 'Validated';
        const wrapper = shallow(<Table columns={mockedColumns} values={mockedLine} />);
        
        expect(wrapper.find('.status').hasClass('Validated')).toBe(true);
        expect(wrapper.find('.status').hasClass('Canceled')).toBe(false);
        expect(wrapper.find('.status').hasClass('InProgress')).toBe(false);
    });

    it('Check pending Status type has the good css class', () => {
        mockedLine[0][3].value = 'InProgress';
        const wrapper = shallow(<Table columns={mockedColumns} values={mockedLine} />);
        
        expect(wrapper.find('.status').hasClass('Validated')).toBe(false);
        expect(wrapper.find('.status').hasClass('Canceled')).toBe(false);
        expect(wrapper.find('.status').hasClass('InProgress')).toBe(true);
    });

    it('Check inactive Status type has the good css class', () => {
        mockedLine[0][3].value = 'Canceled';
        const wrapper = shallow(<Table columns={mockedColumns} values={mockedLine} />);
        
        expect(wrapper.find('.status').hasClass('Validated')).toBe(false);
        expect(wrapper.find('.status').hasClass('Canceled')).toBe(true);
        expect(wrapper.find('.status').hasClass('InProgress')).toBe(false);
    });
});