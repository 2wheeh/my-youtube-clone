import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko_KR', koLocale);

/*
 * formatDate : returns format(date, lang) from 'timeago.js'
 * default lang = 'en_US'
 * for Korean set lang as 'ko_KR'
 */
export function formatDate(date, lang = 'en_US') {
  return format(date, lang);
}

/*
 * parseTimeExpression :
 * It parses the time expression 'PThHmMsS' => 'h:mm:ss' (String)
 * When param 'sec' is true, it returns time in sec (Number)
 */
export function parseTimeExpression(expression, sec = false) {
  const regex = /PT(\d+H)?(\d+M)?(\d+S)?/; // Regular expression to extract hours, minutes, and seconds
  const matches = expression.match(regex);

  if (!matches) {
    throw new Error('Invalid time expression');
  }

  const h = parseInt(matches[1]) || 0;
  const m = parseInt(matches[2]) || 0;
  const s = parseInt(matches[3]) || 0;

  if (sec) {
    return h * 3600 + m * 60 + s;
  }

  let time = '';

  if (h) time += `${h}:`;
  m > 9 ? (time += `${m}:`) : (time += `0${m}:`);
  s > 9 ? (time += `${s}`) : (time += `0${s}`);

  return time;
}

/*
 * formatPlayedTime :
 * It formats sec to 'h:mm:ss'
 * 3679 (sec) => 1:01:09
 * duration decides retVal's format (h:mm:ss or mm:ss)
 */
export function formatPlayedTime(seconds, duration) {
  const length = duration.length;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  let time = '';

  if (length > 6) {
    time += `${h}:`;
    m > 9 ? (time += `${m}:`) : (time += `0${m}:`);
    s > 9 ? (time += `${s}`) : (time += `0${s}`);
  } else {
    m > 9 ? (time += `${m}:`) : (time += `0${m}:`);
    s > 9 ? (time += `${s}`) : (time += `0${s}`);
  }

  return time;
}

/*
 * formatView :
 * it formats number to Korean style count (string)
 */
export function formatView(count) {
  const eok = count / 10 ** 8;
  const man = (count % 10 ** 8) / 10 ** 4;
  const cheon = (count % 10 ** 4) / 10 ** 3;

  if (eok >= 10) return `${Math.floor(eok)}억`;
  if (eok >= 1) return `${eok.toFixed(1)}억`;

  if (man >= 10) return `${Math.floor(man)}만`;
  if (man >= 1) return `${man.toFixed(1)}만`;

  if (cheon >= 1) return `${cheon.toFixed(1)}천`;

  return `${count}`;
}
