import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReactWeekTimeRangePicker from '../ReactWeekTimeRangePicker'
import { ReactWeekTimeRangePickerProps } from '../ReactWeekTimeRangePicker.type';


export default {
  title: 'Marinos33/ReactWeekTimeRangePicker',
  component: ReactWeekTimeRangePicker,
  argTypes: {
  },
} as Meta<typeof ReactWeekTimeRangePicker>;

const Template: Story<ReactWeekTimeRangePickerProps> = (args) => <ReactWeekTimeRangePicker {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  hasHalfHour: true,
  selectTimeRange: (selectTimeRange) => {}
};