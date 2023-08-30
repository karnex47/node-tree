import { includes } from 'lodash';

export default function(el, klass: String) {
    return includes(el.classList, klass);
}