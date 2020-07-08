import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

const DisplayDate = (props) => {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  // locale customization
  dayjs.updateLocale('en', {
    relativeTime: {
      future: "%s 후",
      past: "%s 전",
      s: '몇 초',
      m: "1 분",
      mm: "%d 분",
      h: "한 시간",
      hh: "%d 시간",
      d: "하루",
      dd: "%d 일",
      M: "한 달",
      MM: "%d 개월",
      y: "1 년",
      yy: "%d 년"
    }
  });
  dayjs.locale('ko');

  const relativeDate = (dateString) => {
    const date = dayjs(Number.parseInt(dateString));
    const daysFromNow = Math.abs(date.diff(dayjs(), 'day'));
    return daysFromNow > 7 ? date.format('YYYY년 M월 D일') : date.fromNow();		
  }

  return (
    <p>
      {relativeDate(props.dateString)}
    </p>
  );
}

export default DisplayDate;
